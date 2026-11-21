# Observabilidade

`src/observability.js` fica dormente até existir `window.EJ_OBS`. Build com ela: `node scripts/build.mjs --observability`.

| Ferramenta | Estado | O que falta (conta necessária) |
|---|---|---|
| Sentry | carregador por CDN ligado ao `window.EJ_OBS.sentryLoader` | criar projeto Sentry e colar o URL do carregador |
| Datadog RUM | ligado por `ddApplicationId` + `ddClientToken` | criar aplicação RUM |
| Web Vitals (LCP, CLS) | nativo, envia por `sendBeacon` para `vitalsEndpoint` | criar o endpoint (função na Vercel ou Supabase Edge Function) |
| New Relic | **não ligado** | gerar o snippet Browser no painel e colá-lo no `index.src.html` |
| OpenTelemetry | **não ligado** | num site estático precisa de bundler e de um coletor; avaliar na fase 3 com o backend |

Nota: no artefacto do Claude a política de segurança bloqueia scripts externos; a observabilidade só funciona no site publicado (Vercel).
