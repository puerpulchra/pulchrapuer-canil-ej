/* Observabilidade opcional. Só liga o que estiver configurado em window.EJ_OBS (nada é enviado por defeito).
   Exemplo, antes deste script:
   <script>window.EJ_OBS = { sentryLoader: "https://js.sentry-cdn.com/CHAVE.min.js", ddApplicationId: "...", ddClientToken: "...", ddSite: "datadoghq.com", vitalsEndpoint: "/api/vitals" }</script> */
(function () {
  var c = window.EJ_OBS || {};
  function add(src, onload) { var s = document.createElement("script"); s.src = src; s.async = true; s.crossOrigin = "anonymous"; if (onload) s.onload = onload; document.head.appendChild(s); }
  if (c.sentryLoader) add(c.sentryLoader);
  if (c.ddApplicationId && c.ddClientToken) {
    add("https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js", function () {
      window.DD_RUM && window.DD_RUM.init({ applicationId: c.ddApplicationId, clientToken: c.ddClientToken, site: c.ddSite || "datadoghq.com", service: "canil-ej", sessionSampleRate: 100, trackUserInteractions: true });
    });
  }
  /* Web Vitals sem dependências (LCP, CLS, INP aproximado). */
  if (c.vitalsEndpoint && "PerformanceObserver" in window) {
    var v = { cls: 0 }; function send() { try { navigator.sendBeacon(c.vitalsEndpoint, JSON.stringify(v)); } catch (e) { /* sem rede */ } }
    try { new PerformanceObserver(function (l) { var e = l.getEntries(); v.lcp = e[e.length - 1].startTime; }).observe({ type: "largest-contentful-paint", buffered: true }); } catch (e) { /* não suportado */ }
    try { new PerformanceObserver(function (l) { l.getEntries().forEach(function (e) { if (!e.hadRecentInput) v.cls += e.value; }); }).observe({ type: "layout-shift", buffered: true }); } catch (e) { /* não suportado */ }
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") send(); });
  }
})();
