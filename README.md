# Focus Group by Local Real Estate

Rebuilt multi-page website for Focus Group by Local Real Estate. The project preserves the public routes from `focus-realestate.com` and uses the CCOR Sneak IDX search widget for live property search.

## IDX search

The CCOR Full Search widget is loaded from the supplied Sneak IDX embed URL with the site key `ursula-weinkauff`. Search, community-listing and legacy IDX routes all use the shared `app/idx-search.tsx` component.

## Lead forms

Because GitHub Pages is static hosting, the contact form opens the visitor's email application with the submitted details addressed to Ursula. No server or paid form service is required.

## Local development

Use the included project scripts to start the preview and create a production build.

## GitHub Pages deployment

The application uses vinext static export and publishes `dist/client` through `.github/workflows/deploy-pages.yml`. The workflow reads GitHub Pages' current base path during each build, prepares the generated asset folder, and verifies local links before upload. This lets the site work at the repository Pages URL before the custom domain is connected and at `/` after `ursulaweinkauff.com` is configured in GitHub Pages settings.

The custom-domain marker lives at `public/CNAME`, which places it in the generated site root. GitHub Actions publishing still requires the custom domain to be entered in the repository's Pages settings when DNS is ready.
