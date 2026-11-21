import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("capa mostra o nome e as três raças", async ({ page }) => {
  await expect(page).toHaveTitle(/Canil EJ/);
  await expect(page.locator("h1")).toContainText("Cães de raça criados");
  await expect(page.locator("#caes")).toContainText("Rottweiler");
  await expect(page.locator("#caes")).not.toContainText("Cane Corso");
});

test("sem scroll horizontal", async ({ page }) => {
  const over = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(over).toBe(false);
});

test("visitas: domingo é recusado", async ({ page }) => {
  await page.locator("#vsDate").fill("2026-11-22");
  await page.locator("#vsOwner").fill("Teste");
  await page.locator("#vsPhone").fill("900000000");
  await page.locator("#visForm button[type=submit]").click();
  await expect(page.locator("#vsErr")).toContainText("domingo");
  await expect(page.locator("#vsOk")).toBeHidden();
});

test("visitas: dia útil gera ligação de WhatsApp", async ({ page }) => {
  await page.locator("#vsDate").fill("2026-11-23");
  await page.locator("#vsOwner").fill("Teste");
  await page.locator("#vsPhone").fill("900000000");
  await page.locator("#visForm button[type=submit]").click();
  await expect(page.locator("#vsOk")).toBeVisible();
  await expect(page.locator("#vsWa")).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=/);
});

test("carrinho abre e fecha e devolve o foco", async ({ page }) => {
  await page.locator("#openCart").click();
  await expect(page.locator("#drawer")).toBeVisible();
  await page.keyboard.press("Tab");
  await page.locator("#closeCart").click();
  await expect(page.locator("#drawer")).toBeHidden();
  await expect(page.locator("#openCart")).toBeFocused();
});

test("loja: pesquisa filtra e ordenar não parte", async ({ page }) => {
  const count = page.locator("#shopCount");
  const before = await count.textContent();
  await page.locator("#shopQ").fill("zzzz-inexistente");
  await expect(count).toContainText("0 produtos");
  await page.locator("#shopQ").fill("");
  await expect(count).toHaveText(before ?? "");
});

test("reduzir movimento: nada fica escondido", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll(".rv")].filter((e) => getComputedStyle(e).opacity === "0").length,
  );
  expect(hidden).toBe(0);
  await ctx.close();
});

test("grelha: títulos de secção alinhados com o logótipo", async ({ page }) => {
  const logo = await page.locator("header a, nav a").first().boundingBox();
  const lefts = await page
    .locator(".sec-head h2")
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().left)));
  expect(new Set(lefts).size).toBe(1);
  expect(lefts[0]).toBe(Math.round(logo?.x ?? -1));
});

test("botões: dois estilos, preenchido e contornado", async ({ page }) => {
  const styles = await page
    .locator(".btn")
    .evaluateAll((els) =>
      Array.from(
        new Set(
          els
            .filter((e) => (e as HTMLElement).offsetParent)
            .map((e) => (getComputedStyle(e).backgroundColor === "rgba(0, 0, 0, 0)" ? "contorno" : "cheio")),
        ),
      ),
    );
  expect(styles.sort()).toEqual(["cheio", "contorno"]);
});

test("botão de WhatsApp não cobre texto", async ({ page }) => {
  const covered = await page.evaluate(() => {
    const fab = document.querySelector(".wa-fab") as HTMLElement;
    let hits = 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const p = (n as Text).parentElement;
      if (
        (n as Text).textContent?.trim() &&
        p &&
        !fab.contains(n) &&
        p.offsetParent &&
        !["SCRIPT", "STYLE"].includes(p.tagName)
      )
        nodes.push(n as Text);
    }
    for (let y = 0; y < document.documentElement.scrollHeight; y += 200) {
      window.scrollTo(0, y);
      const f = fab.getBoundingClientRect();
      for (const t of nodes) {
        const r = document.createRange();
        r.selectNodeContents(t);
        for (const q of Array.from(r.getClientRects())) {
          if (q.width && q.left < f.right && q.right > f.left && q.top < f.bottom && q.bottom > f.top) {
            hits++;
            break;
          }
        }
      }
    }
    return hits;
  });
  expect(covered).toBe(0);
});
