# DocumentCurrency — Enterprise Licensing (GitHub Pages)

This repository hosts the DocumentCurrency Enterprise Licensing site.

## Deploy (GitHub Pages)
1. Put these files in the repo root (exact names).
2. Repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
3. (Optional) Custom domain: add `CNAME` file with `documentcurrency.com`.

## Static API Notes (GitHub Pages)
GitHub Pages can only serve static files. This repo includes:
- `/api/license/tiers.json`
- `/api/license/sample-license.json`

The homepage "Verify" box works in static mode by:
- validating basic structure
- showing tier + permissions from the pasted JSON
- (optional) opening the JSON endpoints

## Real Verification API (Serverless)
To actually verify signatures and enforce licenses, deploy:
- `api/license/verify.example.js` as a serverless function (Vercel/Netlify/Cloudflare Worker).
Then set the verify endpoint in `assets/app.js`.

Suggested production endpoints:
- POST https://license.documentcurrency.com/api/license/verify
- POST https://license.documentcurrency.com/api/license/issue (admin-only)

## License Model (Enterprise)
- You retain ownership of the protocol/IP.
- Customers receive a cryptographically verifiable license token.
- Tokens grant permission flags (issue, registry_write, run_node, etc).
- Enterprise tiers include SLA, support, and compliance options.
