# Handoff · Canil EJ · 19/11/2026

## Onde estamos
Site v16 publicado (https://claude.ai/artifact/DpJCDycBAfVkwRKhCPGnej), link na bio, manual de marca, manual do logótipo, zip de logos e modelos Instagram, DESIGN.md (direção "Caderneta"). Rottweiler substituiu Cane Corso.

## Instalado
- Skill do GitHub: taste-skill (Leonxlnx), em ~/.claude/skills/design-taste-frontend. Inclui verificador em Chrome real.
- Plugin Supabase: instalado. Conector Supabase: por ligar (o utilizador).
- Pendentes de aceitar pelo utilizador: Image Deep Research, Codesign, ManyMotions, frontend-design, audit-suite, Website Design; conectores Canva e Unsplash.

## Medição de erros (verificador da skill, 1440 e 390 px, modo rápido)
| | FAIL | WARN |
|---|---|---|
| v15 (antes) | 152 | 47 |
| v16 (depois) | 84 | 46 |
Os 3 "assets" são fontes Google que o sandbox sem rede não carrega (não são erros reais). Auditoria própria de acessibilidade: 0 erros de alvo, contraste, etiquetas e títulos.

## Corrigido na v16
Revelação ao rolar removida (-60); contraste do texto secundário no tema claro (7,8:1); botão fantasma com a cor do acento; foco visível em escolhas/separadores; WhatsApp do formulário com ligação; meta descrição, og e theme-color; facto na capa ("3 raças"); movimento de hover (botões e cartões).

## Por corrigir (84 FAIL)
1. Fotos reais em falta (no-visual 9, text-only 2): depende do utilizador.
2. Ritmo de página: secção Cães com 5,7 ecrãs; capa com 1431 px (portais abaixo da dobra); secções sem "um ecrã cada" (section-height 8, one-section 4, hero-screen/hero-fill). Exige reestruturar: portais fora da capa, raças em secções próprias.
3. Margens do cabeçalho e grelha (container-edges 9, off-grid 8, split-pair 6, right-edge 2).
4. Títulos: nomes das raças (137 px) maiores que os h2; decidir entre manter o efeito ou reduzir (heading-scale 6).
5. Botões em 2 estilos por ecrã (button-styles 6); ligações "#" restantes (links 4); placeholders de telefone (2).
6. Menu: marca com quebra de linha (nav 2), menu cortado no telemóvel (cut-text), WhatsApp sobre texto (nav-covers), botão colado ao rodapé no Instagram (flush).
7. Scroll-reveal restante (3) e foco de um botão (1).
Conflito a decidir: a skill proíbe legendas sob imagens, preços/telefones em formato real e "fotos provisórias"; o canil precisa de preços em Kz e contacto real.

## Dados e decisões do utilizador
WhatsApp, e-mail, horários, preços, nomes dos cães, Instagram, domínio, regras de visita, FAQ, fotos com crédito. Botão principal da capa: "Conhecer os cães" ou "Marcar visita". Fonte dos títulos (Bricolage ou Inter).

## Pastas
- 01-fase-atual-v16: site/, docs/ (DESIGN.md, medição), marca/
- 02-proxima-fase-conteudo-real: dados e fotos reais
- 03-fase-seguinte-backend-supabase: base de dados, reservas, pedidos

## Próximos passos
1. Ligar o conector Supabase. 2. Enviar dados e fotos. 3. Reestruturar ritmo (item 2) na fase 2. 4. Atualizar manual de marca para v4–v16.
