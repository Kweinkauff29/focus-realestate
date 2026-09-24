# Focus Group by Local Real Estate

Rebuilt multi-page website for Focus Group by Local Real Estate. The project preserves the public routes from `focus-realestate.com` and replaces the legacy vendor-specific search widgets with a provider-neutral IDX adapter.

## IDX activation

Copy `.env.example` to `.env.local` for local use and add the credentials supplied by the new IDX provider. The search proxy accepts a conventional JSON listings response and normalizes common RESO-style fields. If the provider uses different field names or query parameters, update `app/api/idx/search/route.ts` in one place; every search, community and listing page uses that shared adapter.

## Lead forms

Set `LEAD_WEBHOOK_URL` to the CRM, automation or form endpoint that should receive contact, dream-home and valuation requests. Without it, submissions redirect safely back to the contact page without sending data to a third party.

## Local development

Use the included project scripts to start the preview and create a production build.

