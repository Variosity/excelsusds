This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# ExcelsusDS — portable Next.js implementation

This directory is an **isolated, portable Option A migration copy** of ExcelsusDS. It is separate from the live Manus-hosted release and uses **Next.js App Router, Supabase Auth/Postgres, Vercel route handlers, Stripe, and Frankfurter**. It does not rely on Manus OAuth, storage proxies, Forge APIs, or a managed Manus runtime.

## Included functionality

| Area | Portable implementation |
|---|---|
| Identity | Supabase passwordless email sign-in and SSR session refresh |
| Privacy | Owner-scoped Supabase tables protected by RLS policies |
| Workspace | Command capture, Pipeline stages, DropSignal decisions/evidence, MarginShield persistence + Frankfurter rate route, Vault, Signal Watch, Listing Forge, Outcome Lab |
| Billing | Founder ($19/month) and Seller ($39/month) Stripe Checkout with an eligible one-day trial, portal, webhook, and subscription status route |
| Public pages | `/`, `/plans`, and password-free `/policies` with `alejandriosity@gmail.com` support |

## Setup

1. Create a Supabase project. In **SQL Editor**, run `supabase/migrations/0001_excelsusds.sql`. After the first owner has signed up, change that profile's `role` to `admin` in Supabase so owner-only access remains available.
2. In Supabase **Authentication → URL Configuration**, add your local and Vercel URLs to Site URL / Redirect URLs, including `http://localhost:3000/auth/callback` and `https://YOUR_DOMAIN/auth/callback`.
3. Use the existing `../../excelsusds/external-migration/env.external.example` file as the credential-name template, create an untracked local environment file, and do **not** commit it.
4. Install and run locally: `pnpm install && pnpm dev`.
5. Add the same environment variables in Vercel, deploy, then configure Stripe's webhook endpoint as `https://YOUR_DOMAIN/api/stripe/webhook` for `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, and `customer.subscription.deleted`.
6. Test Checkout on the deployed Vercel domain, then verify a second Supabase user cannot read or modify the first user's candidates.

## Validation commands

```bash
pnpm test
NODE_ENV=production pnpm build
```

For expanded operational guidance, source-port sequencing, the original RLS migration, and deployment validation, see the sibling package at `../../excelsusds/external-migration/`.

## Key implementation notes

- **There is no public free tier.** Checkout uses a one-day trial only when `profiles.trial_started_at` is unset.
- The authenticated browser calls Supabase directly for workspace data. The RLS policies, not client-side filters, enforce privacy.
- Stripe’s server-only webhook uses the Supabase service-role client strictly to persist verified Stripe state.
- The currency route uses Vercel-compatible response caching with Frankfurter; it does not use an in-memory `Map`.
- The UI intentionally preserves the graphite-blue Orbital Console language, Excelsus Cyan accents, clipped scan panels, orbital beacon, and local brand assets.
