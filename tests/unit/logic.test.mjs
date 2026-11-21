import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { kz, waLink, isSunday, nextVisitDate, fillRatio } = createRequire(import.meta.url)("../../src/logic.js");

test("kz formata milhares com ponto", () => {
  assert.equal(kz(0), "0 Kz");
  assert.equal(kz(999), "999 Kz");
  assert.equal(kz(1000), "1.000 Kz");
  assert.equal(kz(420000), "420.000 Kz");
  assert.equal(kz(1234567), "1.234.567 Kz");
});
test("waLink codifica o texto", () => {
  assert.equal(waLink("244900000000", "Olá & você"), "https://wa.me/244900000000?text=Ol%C3%A1%20%26%20voc%C3%AA");
});
test("isSunday: 22 nov 2026 é domingo, 23 é segunda", () => {
  assert.equal(isSunday(2026, 11, 22), true);
  assert.equal(isSunday(2026, 11, 23), false);
});
test("nextVisitDate salta o domingo", () => {
  assert.equal(nextVisitDate(new Date(2026, 10, 21)), "2026-11-23"); // sábado -> segunda
  assert.equal(nextVisitDate(new Date(2026, 10, 19)), "2026-11-20");
  assert.equal(nextVisitDate(new Date(2026, 11, 31)), "2027-01-01");
});
test("fillRatio conta campos preenchidos", () => {
  assert.equal(fillRatio([]), 0);
  assert.equal(fillRatio(["", "  ", "a"]), 1 / 3);
  assert.equal(fillRatio(["a", "b"]), 1);
});
