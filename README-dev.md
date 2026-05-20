# Local development

## Setup

1. Copy environment template: `cp .env.example .env.local` (Windows: `copy .env.example .env.local`)
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) — theme gallery

## Contact form testing

- Default `CONTACT_DEV_MODE=log` logs submissions to the terminal (no email sent).
- Test at any theme, e.g. [http://localhost:3000/craft#contact](http://localhost:3000/craft#contact)
- Set `CONTACT_DEV_MODE=send` and add `RESEND_API_KEY` to send a real test email.
- Turnstile test keys in `.env.example` always pass in development.
- `RATE_LIMIT_ENABLED=false` skips Upstash locally; set to `true` with Upstash credentials to test limits.

## Pre-deploy smoke test

```bash
npm run build
npm run start
```

Optional: run Lighthouse against `http://localhost:3000` on your chosen theme.

## Vercel production environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_APP_ENV` | Yes | Set to `production` |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://marcoantolini.com` |
| `RESEND_API_KEY` | Yes | Resend API key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | Cloudflare Turnstile site key for your domain |
| `TURNSTILE_SECRET_KEY` | Yes | Turnstile secret key |
| `UPSTASH_REDIS_REST_URL` | Recommended | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | Upstash Redis REST token |
| `RATE_LIMIT_ENABLED` | Yes (prod) | Set to `true` |
| `CONTACT_DEV_MODE` | No | Omit or `send` in production |

Preview deployments: add your `*.vercel.app` hostname to Turnstile allowed domains.
