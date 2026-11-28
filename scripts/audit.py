#!/usr/bin/env python3
"""Auditoria do site: layout, contraste, alvos de toque, ligações, ids, nomes acessíveis. Uso: python3 scripts/audit.py [alvo]"""
import sys, json, pathlib, collections
from playwright.sync_api import sync_playwright
root = pathlib.Path(__file__).resolve().parent.parent
target = sys.argv[1] if len(sys.argv) > 1 else "file://" + str(root / "dist" / "index.html")
JS = r"""
() => {
  const out = {overflow: [], small: [], contrast: [], noname: [], badanchor: [], dupid: [], heads: [], imgs: []};
  const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden]') && !e.closest('[inert]'); };
  const W = innerWidth;
  document.querySelectorAll('body *').forEach(e => { if (!vis(e)) return; const r = e.getBoundingClientRect(); if (r.right > W + 2 && !e.closest('.nav, .tabs, .bigej, svg, .phone, .drawer, .scrim, .notice') && getComputedStyle(e).position !== 'fixed') out.overflow.push((e.id||e.className||e.tagName).toString().slice(0,40) + ' ' + Math.round(r.right)); });
  document.querySelectorAll('a[href], button, input, select, textarea, [role=button], [role=tab]').forEach(e => { if (!vis(e) || e.type === 'hidden') return; if (e.closest('.drawer') && e.closest('.drawer').hidden) return; const r = e.getBoundingClientRect(); const inline = e.tagName === 'A' && getComputedStyle(e).display === 'inline' && e.closest('p, li, span, small, footer'); if ((r.height < 43.5 || r.width < 43.5) && !inline) out.small.push((e.id||e.textContent.trim().slice(0,24)||e.className).toString().slice(0,30) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(parseFloat); return {r:p[0], g:p[1], b:p[2], a: p.length > 3 ? p[3] : 1}; };
  const lum = c => { const f = v => { v/=255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4); }; return .2126*f(c.r) + .7152*f(c.g) + .0722*f(c.b); };
  const bgOf = e => { let layers = []; for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== 'none' && !s.backgroundImage.includes('gradient')) return null; const c = parse(s.backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; } } let base = {r:255,g:255,b:255,a:1}; for (let i = layers.length-1; i >= 0; i--) { const c = layers[i]; base = {r: c.r*c.a + base.r*(1-c.a), g: c.g*c.a + base.g*(1-c.a), b: c.b*c.a + base.b*(1-c.a), a:1}; } return base; };
  const seen = new Set();
  document.querySelectorAll('body *').forEach(e => { if (!vis(e) || seen.has(e) || e.closest('[aria-hidden="true"]')) return; const t = [...e.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).length; if (!t) return; if (e.closest('.skel, .ph, svg')) return; const s = getComputedStyle(e); const fg = parse(s.color), bg = bgOf(e); if (!fg || !bg) return; const f = {r: fg.r*fg.a + bg.r*(1-fg.a), g: fg.g*fg.a + bg.g*(1-fg.a), b: fg.b*fg.a + bg.b*(1-fg.a)}; const L1 = lum(f), L2 = lum(bg); const ratio = (Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05); const px = parseFloat(s.fontSize), bold = parseInt(s.fontWeight) >= 700; const need = (px >= 24 || (px >= 18.66 && bold)) ? 3 : 4.5; if (ratio < need) out.contrast.push(((e.textContent||'').trim().slice(0,28)) + ' ' + ratio.toFixed(2) + ' (' + s.color + ' / ' + e.className.toString().slice(0,20) + ')'); });
  document.querySelectorAll('a[href], button, [role=button]').forEach(e => { if (!vis(e)) return; const n = (e.getAttribute('aria-label') || e.textContent || e.title || '').trim(); if (!n && !e.querySelector('img[alt]')) out.noname.push(e.outerHTML.slice(0,80)); });
  document.querySelectorAll('a[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (h.length > 1 && !document.getElementById(h.slice(1))) out.badanchor.push(h); });
  const ids = {}; document.querySelectorAll('[id]').forEach(e => ids[e.id] = (ids[e.id]||0) + 1); Object.entries(ids).forEach(([k,v]) => { if (v > 1) out.dupid.push(k); });
  let last = 0; document.querySelectorAll('h1,h2,h3,h4').forEach(h => { if (!vis(h)) return; const l = +h.tagName[1]; if (last && l > last + 1) out.heads.push(h.tagName + ' depois de H' + last + ': ' + h.textContent.trim().slice(0,30)); last = l; });
  document.querySelectorAll('img').forEach(i => { if (!i.hasAttribute('alt')) out.imgs.push(i.src.slice(0,40)); });
  document.querySelectorAll('input, select, textarea').forEach(i => { if (i.type === 'hidden' || !vis(i)) return; const has = i.labels && i.labels.length || i.getAttribute('aria-label') || i.getAttribute('aria-labelledby'); if (!has) out.noname.push('campo sem rótulo: ' + (i.id || i.name || i.type)); });
  return out;
}
"""
res = collections.OrderedDict()
with sync_playwright() as p:
    b = p.chromium.launch()
    for theme in ("light",):
        for label, vp in (("390", {"width": 390, "height": 844}), ("1440", {"width": 1440, "height": 900})):
            c = b.new_context(viewport=vp, color_scheme=theme); pg = c.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto(target); pg.wait_for_timeout(1200)
            pg.evaluate("document.documentElement.setAttribute('data-theme','%s')" % theme); pg.wait_for_timeout(500)
            h = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 600): pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(80)
            pg.wait_for_timeout(500)
            r = pg.evaluate(JS); r["hscroll"] = pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1"); r["pageerrors"] = errs
            res[f"{theme}-{label}"] = r; c.close()
    b.close()
print(json.dumps(res, ensure_ascii=False, indent=1))
