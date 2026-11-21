/* Lógica pura do site Canil EJ. Funciona no navegador (window.EJ) e no Node (module.exports). */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.EJ = api;
})(typeof self !== "undefined" ? self : this, function () {
  /** 1234567 -> "1.234.567 Kz" */
  function kz(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Kz"; }
  /** Ligação wa.me com texto codificado. */
  function waLink(number, text) { return "https://wa.me/" + number + "?text=" + encodeURIComponent(text); }
  /** true se a data (ano, mês 1-12, dia) cair a um domingo: o canil não recebe visitas. */
  function isSunday(y, m, d) { return new Date(y, m - 1, d).getDay() === 0; }
  /** Próximo dia de visita (segunda a sábado) depois de `from`, como AAAA-MM-DD. */
  function nextVisitDate(from) {
    var d = new Date(from.getTime());
    do { d.setDate(d.getDate() + 1); } while (d.getDay() === 0);
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  /** Fracção (0 a 1) de campos preenchidos, para a barra de progresso dos formulários. */
  function fillRatio(values) {
    if (!values.length) return 0;
    var n = 0; for (var i = 0; i < values.length; i++) if (String(values[i]).trim()) n++;
    return n / values.length;
  }
  return { kz: kz, waLink: waLink, isSunday: isSunday, nextVisitDate: nextVisitDate, fillRatio: fillRatio };
});
