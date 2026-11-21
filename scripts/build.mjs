// Junta src/logic.js (e src/observability.js, se pedido) em dist/index.html. Sem dependências.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const withObs = process.argv.includes("--observability");
let html = readFileSync(resolve(root, "src/index.src.html"), "utf8");
html = html.replace(/\/\*@inline (.+?)\*\//g, (_, f) => readFileSync(resolve(root, f), "utf8"));
if (withObs) {
  const obs = readFileSync(resolve(root, "src/observability.js"), "utf8");
  const tag = `<script>\n${obs}\n</script>\n`;
  html = html.includes("</body>") ? html.replace("</body>", () => `${tag}</body>`) : html + tag;
}
mkdirSync(resolve(root, "dist"), { recursive: true });
writeFileSync(resolve(root, "dist/index.html"), html);
console.log("dist/index.html", html.length, "bytes", withObs ? "(com observabilidade)" : "");
