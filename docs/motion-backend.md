# Movimento no back end (Supabase, quando existir)

Hoje o site não tem back end: o carrinho e os favoritos ficam no navegador. Quando o Supabase entrar (issue 10), cada pedido segue estas regras, tiradas de design-motion-principles e emil-apple-design:

1. Todo o pedido tem 4 estados visíveis: a carregar (esqueleto no lugar do conteúdo, nunca ecrã vazio), sucesso (entrada de 260 ms), vazio (texto com a ação seguinte) e erro (mensagem junto ao campo, com "tentar de novo").
2. Formulários (visitas, reservas): botão com estado "a enviar" e barra de progresso; resposta otimista só em ações reversíveis (favoritos, carrinho); confirmações de visita esperam pelo servidor.
3. Nada bloqueia a interação: o utilizador pode fechar a gaveta ou voltar atrás enquanto o pedido corre.
4. Entradas de dados chegam com `fx-in` e atraso escalonado (`--i`), máximo 45 ms por item e 8 itens; a partir daí, sem escalonamento.
5. `prefers-reduced-motion`: tudo aparece sem deslocamento.
6. Observabilidade: cada pedido falhado vai para o Sentry com a rota, sem dados pessoais.
