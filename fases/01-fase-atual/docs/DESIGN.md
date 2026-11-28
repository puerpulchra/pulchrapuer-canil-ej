# v30 · MotionSites (substitui a estrutura da v24)
Estrutura baseada na skill `motionsites-web-builder`, referência Smoothie Slider com o texto que enche do Orvante. Cores, DM Sans e logótipo EJ não mudam.
- Palco de ecrã inteiro: Boerboel em verde-floresta, Husky em lavanda #d9c6fb, Rottweiler em manteiga #f3e6a4. Cada raça tem palavra gigante atrás e uma ficha branca com os dados reais. A troca é um painel que desliza (translateX, 900 ms, `cubic-bezier(.22,.8,.3,1)`), com a palavra e a ficha a deslizar mais depressa. Sem passagem automática.
- Manifesto: palavras com opacidade de 0,3 a 1 conforme o scroll.
- Folhas: cada secção tem cantos de 48 px no topo e sobrepõe-se 48 px à anterior. Fundos alternam lavanda, branco e a cor da raça.
- Navegação em pílula flutuante a partir de 900 px. Índices `[ 01 ]` nas secções. Grão estático a 4,5 %.
- Palavras fantasma atrás dos títulos de cada raça, com o tamanho ajustado à largura.
- Não se usam vídeos nem fotos de terceiros: nenhum mostra cães. Fotos reais do canil entram nos espaços `.ph` quando existirem.
- Só se animam transform e opacity. `prefers-reduced-motion` desliga entrada, painel e manifesto.

# DESIGN.md · Canil EJ

Site de um canil na Ilha de Luanda: cães (Boerboel, Husky Siberiano, Rottweiler), serviços, visitas e loja. Tom: sólido, calmo, de confiança. Direção: **Caderneta** (marinho do Atlântico com um único acento água-marinha, cantos retos, títulos grandes numa fonte de display, faixas claras "espuma" para dar ritmo, fotografia real como protagonista).

Mantém: logótipo EJ, paleta marinho + água-marinha, sem laranja. Muda (v5): fonte dos títulos, cantos retos, botões com sombra deslocada, faixas claras.

> **v24 · SUBSTITUI TUDO ACIMA: o site segue o style reference (Turn.io).** DM Sans única (ss03), títulos 500, capa até 116 px com -0,028em. Tela lavanda #eee2ff, capa verde-floresta #0a3922, barra branca fixa, cartões brancos e pastéis em rotação (#d2f2e3, #ccf0f8, #faf7e8, #fdf0ff, #ffede8, #e4f7ee), sem sombras. Botões 40 px, cartões 24 px, campos 16 px, tags 9999 px. CTA primário coral #ff643b com texto #04210f (a referência usa branco, que dá só 2,9:1; o escuro dá 5,6:1 e cumpre WCAG AA); ao lado, botão fantasma. Acento de texto verde #1dbf73 só sobre o verde-floresta. Coral só em botões primários. Tema claro por defeito; o escuro continua disponível.

> **v23 · nova paleta (substitui as cores abaixo e os cantos retos).** Verde-floresta + pastéis. Escuro: fundo #08301d, superfície #0f4529, elevado #165a36, texto #eef7f1, texto secundário #a9c7b6, filete #1f6a41, acento #2fd283, texto sobre acento #04210f, capa/barra #0a3922. Claro: fundo #f7f5ea, superfície #ffffff, elevado #e4f7ee, texto #0a2a1a, secundário #35503f, filete #c9d9cc, acento #0f7a45, texto de acento #0c6a3b. Faixas claras: creme #faf7e8 com texto #0a3922. Cartões em rotação #d2f2e3, #e4f7ee, #faf7e8, #dcefe3. Botões 40 px, cartões 24 px, campos 16 px, sem sombras. Contrastes verificados: 5,4:1 a 13,2:1. Sem laranja nem coral.

Fonte da verdade no código: variáveis CSS em `:root` de `canil-x.html`.

## Cor

| Token | Escuro | Claro | Papel |
|---|---|---|---|
| `--bg` | #04141b | #f0f5f3 | fundo da página |
| `--surface` | #0a2430 | #ffffff | painéis, formulários, carrinho |
| `--surface-2` | #103242 | #e2ece9 | fundos elevados, quadros de foto |
| `--fg` | #e8f1ee | #07202a | texto principal |
| `--muted` | #8fa9b3 | #46606a | texto secundário, legendas |
| `--line` | #1f4757 | #bccfca | filetes e contornos |
| `--accent` | #7ee0cf | #0c7a69 | botões primários, estado ativo |
| `--accent-text` | #7ee0cf | #0a6657 | texto e ligações em acento |
| `--on-accent` | #03211c | #ffffff | texto sobre o acento |
| `--warn` | #ffb4a8 | #a3281a | erros |
| `--hero-bg` / `--bar` | #031018 | #031018 | capa, cabeçalho, contactos |
| `--band` / `--band-fg` / `--band-muted` | #e8f1ee / #07202a / #46606a | iguais | faixas "espuma" claras, nos dois temas |

Regras: o acento aparece numa informação por ecrã. Contrastes acima de 4,5:1 (confirmados na auditoria). As faixas espuma usam sempre texto marinho.

## Tipografia

Duas famílias: **Bricolage Grotesque** 800 (títulos, nomes de raça, números dos passos) e **Inter** 400 a 800 (corpo, etiquetas, botões). Alternativa se a fonte não carregar: Inter 800 (já na pilha `--font-display`).

| Uso | Tamanho | Peso | Espaçamento |
|---|---|---|---|
| Capa | 2,8 a 6,8 rem | 800 | -3,5% |
| Nome da raça | 3 a 8,6 rem | 800 | -4% |
| Título de secção | 2 a 3,1 rem | 800 | -3% |
| Título de bloco | 1,2 a 1,7 rem | 800 | -3% |
| Corpo | 1 rem | 400 | 0, entrelinha 1,6 |
| Etiqueta | 0,75 rem | 600 | +12%, maiúsculas |

Linhas até 54 a 70 caracteres. Mínimo 12 px.

## Espaçamento

Escala de 4 px (4 a 92). Conteúdo 1160 px, margem lateral mínima 16 px. Entre secções 92 px (64 no telemóvel). Alvos de toque de 44 × 44 px ou mais.

## Forma e profundidade

Cantos **retos** (`--radius: 0`) em botões, campos, painéis e escolhas; círculo só em ícones de ação. Botões primários com sombra deslocada `0 3px 0 rgba(0,0,0,.28)` (1 px ao premir). Elementos flutuantes (WhatsApp, favoritos) com sombra suave. Sem vidro, sem degradês de decoração.

## Componentes

- **Botão primário:** fundo acento, texto `--on-accent`, 700, altura 44 px mínimo, sombra deslocada. Foco: contorno de 3 px em acento.
- **Botão de linha:** contorno `--line`; hover em acento.
- **Escolha e separador:** ativo com fundo acento ou sublinhado; `aria-pressed`.
- **Campos:** etiqueta visível, borda `--line`, inválido com `--warn` e mensagem.
- **Listas:** linhas com filetes, sem cartões repetidos.
- **Faixas espuma:** blocos claros (`--band`) alternados com os escuros para marcar a mudança de assunto.
- **Navegação:** barra fixa escura, secção atual sublinhada, progresso de 3 px.
- **Movimento:** entradas de 0,7 s `cubic-bezier(.2,.7,.1,1)`; tudo desliga com "reduzir movimento".

## Imagem e ícones

Fotografia real, nunca ilustração. 4:5 nas raças, 3:4 nos portais, 1:1 nos cães à venda. Fotos de banco com autor e licença; cães à venda com fotos tiradas no canil. Ícones só os necessários, linha de 2 px; sem emojis.

## Logótipo

Monograma EJ numa forma contínua. Aqua sobre marinho como principal; ver manual do logótipo.
