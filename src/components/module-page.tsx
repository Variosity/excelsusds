import { OrbitalShell } from "@/components/orbital-shell";
import { WorkspaceAccessGate } from "@/components/workspace-access-gate";
import { WorkspaceClient } from "@/components/workspace-client";
export function ModulePage({ title, mode }: { title: string; mode: "margin" | "vault" | "watch" | "listing" | "outcome" }) { return <OrbitalShell title={title}><WorkspaceAccessGate><WorkspaceClient mode={mode}/></WorkspaceAccessGate></OrbitalShell>; }
