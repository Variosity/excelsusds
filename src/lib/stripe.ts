import Stripe from "stripe";
export function getStripe() { const secret = process.env.STRIPE_SECRET_KEY; if (!secret) throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY in the server environment."); return new Stripe(secret); }
