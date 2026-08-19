import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function safeNext(value: string | null) { return value?.startsWith("/") && !value.startsWith("//") ? value : "/app"; }
export async function GET(request: Request) { const url = new URL(request.url); const tokenHash = url.searchParams.get("token_hash"); const type = url.searchParams.get("type") as EmailOtpType | null; const destination = new URL(safeNext(url.searchParams.get("next")), url.origin); if (tokenHash && type) { const { error } = await (await createClient()).auth.verifyOtp({ token_hash: tokenHash, type }); if (!error) return NextResponse.redirect(destination); } destination.pathname = "/"; destination.searchParams.set("auth_error", "confirmation_failed"); return NextResponse.redirect(destination); }
