-- Apply after 0001_excelsusds.sql. Stores the latest verified Stripe status for operational visibility.
alter table public.profiles add column if not exists billing_status text;
create index if not exists profiles_billing_status_idx on public.profiles (billing_status);
