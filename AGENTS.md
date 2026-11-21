# AGENTS.md · Canil EJ

Regras para qualquer agente, de qualquer modelo. Lê este ficheiro antes de mexer no projeto.

## Projeto
Site do Canil EJ (Ilha de Luanda): cães (Boerboel, Husky Siberiano, Rottweiler), serviços, visitas, loja. Preços em Kz. Identidade (v24): verde-floresta #0a3922, tela lavanda #eee2ff, cartões pastel, CTA coral #ff643b só nos botões primários, DM Sans única, logótipo EJ. Referência: o style reference da Turn.io. Direção visual em `fases/01-fase-atual/docs/DESIGN.md`. Fonte do site: `src/index.src.html` + `src/logic.js`; `dist/` é gerado (`npm run build`), nunca se edita à mão.

## Fluxo de trabalho obrigatório
1. **Toda a tarefa é uma Issue** no GitHub antes de começar: Correção (`bug`), Melhoria (`enhancement`) ou Nova função (`feature`). Usar os modelos em `.github/ISSUE_TEMPLATE`. Sem issue, não há trabalho.
2. **Um ramo por issue:** `fix/<n>-resumo`, `feat/<n>-resumo` ou `chore/<n>-resumo`.
3. **Todo o deploy passa por Pull Request.** Nunca fazer push direto para `main`. O PR mostra a pré-visualização da Vercel; a produção só sai do merge.
4. **O PR tem de mencionar a issue na descrição** com `Closes #<n>` (ou `Refs #<n>`). O modelo de PR já traz o campo.
5. Commits em formato convencional (`feat:`, `fix:`, `chore:`, `docs:`, `test:`), validados por commitlint.
6. Antes de abrir o PR: `npm run check` e, para mudanças visuais, `npm run test:e2e` e captura a 390 px e 1440 px.
7. Quando o trabalho terminar, atualizar `fases/HANDOFF-*.md` se a fase mudou.

## Interface e movimento
Seguir a skill `design-motion-principles` (Jakub principal, Emil secundário). Toda a área da interface precisa de: esqueleto enquanto carrega (`.skel`), imagens com carregamento diferido (`loading="lazy"`) e fade (`.ph`), entrada suave (`.rv`, opacidade + translateY, sem blur), saída mais curta que a entrada, indicador de progresso onde houver passos. Só animar `transform`, `opacity` e `filter`. Curvas `--ease-out`, nunca `ease`. Sem animações em ciclo para chamar a atenção. `prefers-reduced-motion` obrigatório e testado.

## Qualidade (todos têm de passar no CI)
Biome (lint + formato), Knip (código morto), commitlint, testes unitários (`node --test`) com cobertura enviada ao Codecov, Playwright (e2e, desktop e telemóvel), Stryker (mutação em `src/logic.js`, mínimo 70). Observabilidade em `docs/observability.md`.

## Regras de conteúdo
- Nunca inventar preços, depoimentos, números, telefones ou fotos. Dados em falta ficam marcados como provisórios.
- Fotos de banco com autor e licença; cães à venda só com fotos tiradas no canil.
- Acessibilidade WCAG 2.1 AA: contraste 4,5:1, alvos de 44 px, rótulos visíveis, foco visível.
- Português de Angola, sem emojis nos ícones.
- Texto sem marcas de IA (skill `unslop`, instalada em ~/.claude/skills/unslop; fonte github.com/cursor/plugins, pstack/skills/unslop): sem travessões, sem lemas nem metáforas (diz o que o canil faz, com número ou nome), sem listas de três por hábito, sem dois pontos como ligação, sem advérbios de reforço, uma ideia por frase.
- Segredos nunca entram no repositório (`.env`, chaves Supabase service role, DSN privados).
