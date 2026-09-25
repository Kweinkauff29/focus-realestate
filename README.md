# Focus Group by Local Real Estate

Rebuilt multi-page website for Focus Group by Local Real Estate. The project preserves the public routes from `focus-realestate.com` and uses the CCOR Sneak IDX search widget for live property search.

## IDX search

The CCOR Full Search widget is loaded from the supplied Sneak IDX embed URL with the site key `ursula-weinkauff`. Search, community-listing and legacy IDX routes all use the shared `app/idx-search.tsx` component.

## Lead forms

Set `LEAD_WEBHOOK_URL` to the CRM, automation or form endpoint that should receive contact, dream-home and valuation requests. Without it, submissions redirect safely back to the contact page without sending data to a third party.

## Local development

Use the included project scripts to start the preview and create a production build.
