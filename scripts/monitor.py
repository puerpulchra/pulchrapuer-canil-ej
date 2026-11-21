#!/usr/bin/env python3
"""Agente de monitorização do Canil EJ. Uso: python3 scripts/monitor.py [ficheiro-ou-URL]
Verifica SEO, acessibilidade básica, erros de consola, scroll horizontal e movimento.
Escreve docs/medicao/monitor-AAAA-MM-DD.md e devolve código 1 se houver falhas."""
import sys, json, datetime, pathlib
from playwright.sync_api import sync_playwright
root = pathlib.Path(__file__).resolve().parent.parent
target = sys.argv[1] if len(sys.argv) > 1 else "file://" + str(root / "dist" / "index.html")
rows = []
def chk(name, ok, note=""): rows.append((name, bool(ok), note))
with sync_playwright() as p:
    b = p.chromium.launch()
    for label, vp, mob in (("desktop", {"width": 1440, "height": 900}, False), ("telemóvel", {"width": 390, "height": 844}, True)):
        c = b.new_context(viewport=vp, is_mobile=mob, has_touch=mob); pg = c.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.goto(target); pg.wait_for_timeout(1500)
        errs = [e for e in errs if "ERR_TUNNEL" not in e and "fonts.g" not in e]
        chk(f"[{label}] sem erros de consola", not errs, "; ".join(errs[:3]))
        chk(f"[{label}] sem scroll horizontal", pg.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"))
        if not mob:
            chk("título presente (≤ 60 caracteres)", 0 < len(pg.title()) <= 60, pg.title())
            d = pg.evaluate("document.querySelector('meta[name=description]')?.content || ''")
            chk("meta description (70–170)", 70 <= len(d) <= 170, f"{len(d)} caracteres")
            chk("um único h1", pg.locator("h1").count() == 1)
            chk("lang pt", pg.evaluate("document.documentElement.lang").startswith("pt"))
            chk("imagens com alt", pg.evaluate("[...document.images].every(i => i.hasAttribute('alt'))"))
            chk("og:title e twitter:card", pg.evaluate("!!document.querySelector('meta[property=\"og:title\"]') && !!document.querySelector('meta[name=\"twitter:card\"]')"))
            ld = pg.evaluate("[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(s=>s.textContent)")
            ok = False
            try: ok = any(json.loads(x).get("@type") == "LocalBusiness" for x in ld)
            except Exception: pass
            chk("JSON-LD LocalBusiness válido", ok)
            chk("sem ligações '#' vazias", pg.evaluate("[...document.querySelectorAll('a[href=\"#\"]')].length === 0"), "")
            chk("esqueletos terminam (aria-busy)", pg.evaluate("!document.querySelector('[aria-busy=true]')"))
            chk("sem animações em loop de atenção", pg.evaluate("![...document.querySelectorAll('*')].some(e => { const s=getComputedStyle(e); return s.animationIterationCount==='infinite' && !e.classList.contains('skel') && !e.classList.contains('ph') })"))
        c.close()
    c = b.new_context(reduced_motion="reduce"); pg = c.new_page(); pg.goto(target); pg.wait_for_timeout(800)
    chk("reduzir movimento: conteúdo visível", pg.evaluate("[...document.querySelectorAll('.rv')].every(e => getComputedStyle(e).opacity === '1')"))
    b.close()
for f in ("robots.txt", "sitemap.xml", "llms.txt"):
    chk(f"public/{f} existe", (root / "public" / f).exists())
chk("domínio por substituir em robots/sitemap", "DOMINIO" not in (root/"public"/"robots.txt").read_text(), "aviso: substituir DOMINIO antes de publicar")
out = root / "docs" / "medicao" / f"monitor-{datetime.date.today()}.md"
fails = [r for r in rows if not r[1]]
out.write_text(f"# Monitor · {datetime.date.today()}\n\nAlvo: {target}\n\n{len(rows)-len(fails)}/{len(rows)} verificações passam.\n\n" + "\n".join(f"- {'OK' if ok else 'FALHA'} · {n}" + (f" ({note})" if note else "") for n, ok, note in rows) + "\n")
print(out.read_text()); sys.exit(1 if fails else 0)
