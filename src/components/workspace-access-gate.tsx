"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LockKeyhole, Loader2, ShieldAlert } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { createClient } from "@/lib/supabase/client";

type GateState = "loading" | "signed_out" | "allowed" | "locked" | "error";
export function WorkspaceAccessGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>("loading"); const [message, setMessage] = useState("");
  useEffect(() => { void (async () => { try { const { data } = await createClient().auth.getUser(); if (!data.user) return setState("signed_out"); const response = await fetch("/api/billing/status", { cache: "no-store" }); const payload = await response.json(); if (!response.ok) throw new Error(payload.error ?? "We could not verify account access."); if (["owner", "trialing", "subscriber"].includes(payload.access)) setState("allowed"); else { setMessage(payload.status === "expired" ? "Your trial or subscription is no longer active." : "Choose a paid plan to unlock your workspace."); setState("locked"); } } catch (error) { setMessage(error instanceof Error ? error.message : "We could not verify account access."); setState("error"); } })(); }, []);
  if (state === "allowed") return <>{children}</>;
  if (state === "loading") return <div className="scan-panel flex min-h-64 items-center justify-center text-sm text-slate-400"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Verifying secure workspace access…</div>;
  if (state === "signed_out") return <section className="mx-auto max-w-2xl py-12"><p className="eyebrow">Secure seller workspace</p><h2 className="font-display mt-3 text-4xl font-bold text-white">Sign in before entering the console.</h2><p className="mt-4 text-slate-300">Use your password, create a new account, or request a passwordless email link.</p><AuthPanel/></section>;
  return <section className="scan-panel mx-auto max-w-2xl p-7 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10"><LockKeyhole className="h-5 w-5 text-amber-200"/></div><p className="eyebrow mt-5">Workspace locked</p><h2 className="font-display mt-2 text-2xl font-bold text-white">{state === "error" ? "Access verification needs attention" : "Your seller workspace is paused"}</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300">{message}</p><Link href="/plans" className="command-button mt-6 inline-flex rounded-xl bg-cyan-300 px-5 py-3 text-xs font-bold text-[#04202a]">Open plans & billing</Link>{state === "error" && <p className="mt-5 inline-flex items-center gap-2 text-xs text-amber-100"><ShieldAlert className="h-4 w-4"/>If this persists, contact alejandriosity@gmail.com.</p>}</section>;
}
