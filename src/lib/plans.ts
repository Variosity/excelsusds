export const EXCELSUS_PLANS = {
  founder: { id: "founder", name: "Founder", amountCents: 1900, currency: "usd", interval: "month" as const, description: "Core product research, evidence, margins, and decision history." },
  seller: { id: "seller", name: "Seller", amountCents: 3900, currency: "usd", interval: "month" as const, description: "Expanded workflow for active sellers and listing operations." },
} as const;
export type PlanId = keyof typeof EXCELSUS_PLANS;
export function isPlanId(value: unknown): value is PlanId { return value === "founder" || value === "seller"; }
