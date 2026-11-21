# Handoff · v18 · 20/11/2026

Continua o HANDOFF-v17.md. Artefacto publicado: versão 18 (https://claude.ai/artifact/DpJCDycBAfVkwRKhCPGnej).

## Novo nesta versão
- Skills do Emil Kowalski (emilkowalski/skills) instaladas em ~/.claude/skills com prefixo `emil-`: 12 de web. Não instaladas (mobile/Swift): mobile-native, write-swift, animate-expo, ask-sonner, prototype, pick-ui-library, learn-taste. (apple-design foi instalada a seguir, ver v19.)
- Revisão de movimento aplicada (src/index.src.html):
  - hover com transform só em `@media (hover: hover) and (pointer: fine)` (portais, cães, cartões, botões, favoritos);
  - inclinação dos portais só com rato (`pointerType === "mouse"`);
  - entrada das secções sem `blur()`; `--t-base` 260 ms, `--t-slow` 420 ms.
- Testes unitários 5/5; verificação rápida em 390 px sem erros de página.

## Estado do projeto
- Pasta: Canil-EJ-Projeto (src, dist, tests, issues/01–14, fases/, docs/, AGENTS.md, CLAUDE.md).
- Medição taste-skill: 152 FAIL → 84 FAIL (after.txt). Restam ritmo de página, margens da grelha, escala de títulos, estilos de botão, ligações "#", sem fotos.

## Bloqueado / pendente
- Issues e PRs no GitHub: falta `dono/nome` de um repositório visível à app do Claude (lista vazia, token do `gh` inválido). Depois: `scripts/create-issues.sh` e primeiro PR com `Closes #n`.
- Não corrido por falta de rede: Biome, Knip, Stryker, Playwright JS, CI, Codecov.
- Arch-contract: ferramenta não identificada. Sentry/Datadog/New Relic/OTel: precisam de contas/chaves.
- SEO: robots.txt, sitemap.xml, llms.txt, JSON-LD LocalBusiness, canonical, og:image dependem de domínio, telefone, e-mail, morada e horário. Conteúdo de serviços/loja é renderizado por JS.
- Do cliente: fotos com créditos, WhatsApp, e-mail, horário, preços, nomes dos cães, Instagram, domínio, regras de visita, FAQ.

## v19 (mesma sessão)
Skill emil-apple-design instalada e aplicada: feedback no toque (`:active` scale .97), cabeçalho translúcido com alternativas (`prefers-reduced-transparency`, `prefers-contrast`, sem suporte a blur), títulos com `text-wrap: balance`, linhas até 65ch, degradê dos portais suavizado, gaveta do carrinho arrastável (1:1, projeção de velocidade, resistência no limite; testada em toque). Cópia de segurança da v18: scratchpad/index.src-v18.html.
Limite: a gaveta ainda usa transição CSS, não mola, e não pode ser agarrada a meio do fecho.

## v20 (SEO, monitor, motion)
- SEO no código: meta robots, twitter card, og:locale, JSON-LD LocalBusiness (só dados confirmados: nome, Ilha de Luanda, Angola, AOA). `public/robots.txt`, `sitemap.xml`, `llms.txt` com `DOMINIO` por substituir.
- Agente de monitorização: `scripts/monitor.py` (19 verificações, relatório em docs/medicao/monitor-AAAA-MM-DD.md) e `.github/workflows/monitor.yml` (semanal, não corrido no GitHub). 18/19 passam; a que falha é o domínio por substituir.
- Ligações `#` removidas (WhatsApp com número provisório 244900000000; estados desativados sem href).
- Skill "claudeo-seo" não existe na conta; regras de SEO aplicadas à mão.
- docs/motion-backend.md: regras de movimento para o Supabase futuro.
- Pendente de SEO: domínio, telefone, e-mail, morada, horário, canonical, og:image; conteúdo de serviços/loja ainda renderizado por JS.

## v21 (referência Turn.io, só estrutura)
Aplicado: botões 40 px, cartões 24 px, campos 16 px, sem sombras, garantias/Instagram/produtos/painéis em tons suaves aqua e névoa (rotação de 4). Mantidos: cores marinho + água-marinha, logótipo EJ, Bricolage + Inter, sem laranja. Não copiados: coral, lavanda, DM Sans. Backup da v20: scratchpad/index.src-v20.html. Atenção: DESIGN.md ainda descreve cantos retos; atualizar se a v21 for aprovada.

## v22–v23
- v22: suavização (entrada em escada da capa, scroll suave, fade do tema, transições curtas, elevação dos cartões só com rato). Backup v21: scratchpad/index.src-v21.html.
- v23: NOVA PALETA verde-floresta + pastéis (acento #2fd283 escuro / #0f7a45 claro, capa #0a3922, faixas creme #faf7e8). Substitui marinho + água-marinha. Logótipo EJ mantido, recolorido pelo acento. Contrastes verificados. Backup da v22: scratchpad/index.src-v22.html. DESIGN.md atualizado.
- DESVIO: manual da marca, manual do logótipo, pacote de modelos do Instagram e a ligação na bio ainda usam o marinho + água-marinha; precisam de ser refeitos se a v23 for aprovada.

## v24 · igual ao style reference
Site refeito para seguir o ficheiro de referência Turn.io: DM Sans, tela lavanda, capa verde-floresta, barra branca, CTA coral (texto escuro por contraste), cartões pastel em rotação de 6, sem sombras, pills. Substitui a v23 (verde-floresta + creme). Backup: scratchpad/index.src-v23.html. Fica de fora: maquete de telemóvel WhatsApp e retrato na capa (não há fotos reais), banner fixo no canto. Material de marca (manuais, Instagram, link na bio) ainda nas cores antigas. Nota: fontes não carregam no sandbox; capturas usam fonte de reserva.

## v25 · tudo igual ao DESIGN.md (Turn.io)
Acrescentado à v24: maquete de telemóvel WhatsApp na capa (conversa de exemplo, decorativa), aviso fixo no canto (Marcar visita, fecha e lembra na sessão), faixas brancas/lavanda alternadas em largura total, cartões 32 px com títulos de 32 px, página a 1280 px, sem sombras. Logótipo EJ mantido. Desvios assumidos: texto escuro no botão coral (contraste); retrato da capa e toolkit com foto não existem (sem fotos reais); o aviso fixo não tem contagem decrescente (não há prazo real) e fica oculto abaixo de 900 px. Backup v24: scratchpad/index.src-v24.html.

## v26 · diagnóstico e retificação
Novo `scripts/audit.py` (layout, contraste WCAG, alvos de 44 px, ligações, ids, nomes acessíveis, cabeçalhos, 390 e 1440 px). Encontrado e corrigido: (1) tema escuro incoerente com a referência (388 falhas de contraste) → site passa a ser só claro, botão de tema oculto, tema forçado; (2) nome do remetente na maquete com 2,4:1 → #0b7a43; (3) ligações do menu com 43 px de altura e a ligação @canilej.ao com 20 px → 44 px. Resultado: 0 falhas em 390 e 1440 px; monitor 18/19 (domínio por substituir); testes unitários 5/5; carrinho, gaveta e checkout verificados. Para repor o tema escuro: remover `.theme-btn{display:none}` e o `setTheme("light")` forçado e redefinir os tokens escuros. Backup v25: scratchpad/index.src-v25.html.

## v27
Botões suaves: cor em transição de 240 ms (curva ease-out forte), pressão 90 ms e retorno 260 ms, sem filtro no hover, foco com anel animado, reduzir movimento só com transição de cor. Auditoria 0 falhas. Backup v26: scratchpad/index.src-v26.html.

## v28 · unslop
Skill unslop (cursor/plugins, pstack) instalada em ~/.claude/skills/unslop. Aplicada ao texto do site: lema da capa e frases figuradas trocados por factos, 0 travessões, listas de adjetivos cortadas, "bastidores" e "Sem pressão" removidos, subtítulos das raças literais (Mastim sul-africano, Cão de trenó, Cão alemão de guarda). Regra acrescentada ao AGENTS.md; teste e2e do h1 atualizado. Não reescrito: rótulos de dados (temperamento, preços), nomes de produtos. Backup v27: scratchpad/index.src-v27.html.
