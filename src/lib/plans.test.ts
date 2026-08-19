import { describe, expect, it } from "vitest";
import { EXCELSUS_PLANS, isPlanId } from "./plans";

describe("ExcelsusDS portable billing contract", () => {
  it("preserves the two paid plans at their launch prices", () => {
    expect(EXCELSUS_PLANS.founder.amountCents).toBe(1900);
    expect(EXCELSUS_PLANS.seller.amountCents).toBe(3900);
    expect(EXCELSUS_PLANS.founder.interval).toBe("month");
    expect(EXCELSUS_PLANS.seller.interval).toBe("month");
  });

  it("accepts only the two checkout plan identifiers", () => {
    expect(isPlanId("founder")).toBe(true);
    expect(isPlanId("seller")).toBe(true);
    expect(isPlanId("free")).toBe(false);
    expect(isPlanId(undefined)).toBe(false);
  });
});
