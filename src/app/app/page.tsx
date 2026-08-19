import { OrbitalShell } from "@/components/orbital-shell";
import { WorkspaceAccessGate } from "@/components/workspace-access-gate";
import { WorkspaceClient } from "@/components/workspace-client";
export default function CommandPage() { return <OrbitalShell title="Evidence before action"><WorkspaceAccessGate><WorkspaceClient mode="command"/></WorkspaceAccessGate></OrbitalShell>; }
