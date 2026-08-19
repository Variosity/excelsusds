import { OrbitalShell } from "@/components/orbital-shell";
import { WorkspaceClient } from "@/components/workspace-client";
export function ModulePage({ title, mode }: { title: string; mode: "margin" | "vault" | "watch" | "listing" | "outcome" }) { return <OrbitalShell title={title}><WorkspaceClient mode={mode}/></OrbitalShell>; }
