# Handoff · v17 · 19/11/2026

Continua o HANDOFF-v16.md. Novo nesta versão:
- Skill design-motion-principles (kylezantos) instalada e aplicada: esqueletos, fotos com fade, entradas com blur suave, gaveta com entrada/saída, progresso nos formulários, reduzir movimento respeitado.
- Repositório: AGENTS.md (fluxo issue → PR → deploy), CLAUDE.md, 14 issues em `issues/`, `scripts/create-issues.sh`, modelos de issue e PR.
- Qualidade: Biome, Knip, commitlint, Codecov, Playwright, Stryker, CI em `.github/workflows/ci.yml`. Observabilidade em `docs/observability.md`.
- Lógica extraída para `src/logic.js` (5 testes, cobertura 98%).

Verificado aqui: testes unitários 5/5; 15 verificações e2e (equivalentes aos testes Playwright) 15/15 a 1440 e 390 px.
Não verificado aqui (sem rede para npm): Biome, Knip, Stryker, Playwright JS, Codecov, CI. Versões em package.json não confirmadas.
Não feito: issues e PRs reais (GitHub não ligado), Arch-contract (ferramenta não identificada), New Relic e OpenTelemetry (precisam de conta/coletor).
