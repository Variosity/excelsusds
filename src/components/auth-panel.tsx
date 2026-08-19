"use client";

import { useState } from "react";
import { ArrowRight, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Mode = "password" | "signup" | "magic";
export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "working" | "success" | "error">("idle");
  const [detail, setDetail] = useState("");
  const redirectTo = typeof window === "undefined" ? "" : `${window.location.origin}/auth/callback?next=/app`;

  function show(modeToSet: Mode) { setMode(modeToSet); setState("idle"); setDetail(""); }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setState("working");
      const supabase = createClient();
      if (mode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
        if (error) throw error;
        setDetail("Check your email for the secure ExcelsusDS sign-in link.");
      } else if (mode === "signup") {
        if (password.length < 12) throw new Error("Use a password with at least 12 characters.");
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
        if (error) throw error;
        setDetail(data.session ? "Account created. Opening your console…" : "Check your email to confirm your account, then sign in with your password.");
        if (data.session) window.location.assign("/app");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.assign("/app");
        return;
      }
      setState("success");
    } catch (error) { setState("error"); setDetail(error instanceof Error ? error.message : "Unable to continue."); }
  }
  async function resetPassword() {
    if (!email) return setDetail("Enter your email address first, then choose Forgot password.");
    try {
      setState("working");
      const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password` });
      if (error) throw error;
      setState("success");
      setDetail("If an account exists for that email, a password reset link is on its way.");
    } catch (error) { setState("error"); setDetail(error instanceof Error ? error.message : "Unable to start password recovery."); }
  }
  const passwordMode = mode !== "magic";
  return <section className="scan-panel mt-7 max-w-lg p-5"><div className="flex gap-2 border-b border-white/10 pb-4"><button onClick={() => show("password")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === "password" ? "bg-cyan-300 text-[#04202a]" : "text-slate-300"}`}>Password</button><button onClick={() => show("signup")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === "signup" ? "bg-cyan-300 text-[#04202a]" : "text-slate-300"}`}>Create account</button><button onClick={() => show("magic")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === "magic" ? "bg-cyan-300 text-[#04202a]" : "text-slate-300"}`}>Email link</button></div><form onSubmit={submit} className="mt-5"><p className="eyebrow">Secure access</p><h2 className="font-display mt-2 text-xl font-bold text-white">{mode === "signup" ? "Create your account" : mode === "magic" ? "Use a secure email link" : "Sign in to your command console"}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{mode === "signup" ? "Use a unique password. Email confirmation remains enabled for new accounts." : mode === "magic" ? "Prefer passwordless access? We will send a one-time sign-in link." : "Use your account email and password, or switch to a passwordless email link."}</p><label className="mt-4 block text-xs font-semibold text-slate-300">Email<input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" className="orbital-input mt-2"/></label>{passwordMode && <label className="mt-3 block text-xs font-semibold text-slate-300">Password<input required minLength={12} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 12 characters" className="orbital-input mt-2"/></label>}<div className="mt-4 flex flex-wrap items-center gap-3"><button disabled={state === "working"} className="command-button inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-xs font-bold text-[#04202a] disabled:opacity-70">{state === "working" ? <Loader2 className="h-4 w-4 animate-spin"/> : mode === "magic" ? <><Mail className="h-4 w-4"/>Send link</> : mode === "signup" ? <><ShieldCheck className="h-4 w-4"/>Create account</> : <><KeyRound className="h-4 w-4"/>Sign in <ArrowRight className="h-4 w-4"/></>}</button>{mode === "password" && <button type="button" onClick={resetPassword} className="text-xs font-semibold text-cyan-200 hover:text-cyan-100">Forgot password?</button>}</div></form>{detail && <p className={`mt-4 text-xs leading-5 ${state === "error" ? "text-rose-300" : "text-lime-200"}`}>{detail}</p>}</section>;
}
