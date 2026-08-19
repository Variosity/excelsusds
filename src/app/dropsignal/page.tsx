import { OrbitalShell } from "@/components/orbital-shell";
import { WorkspaceAccessGate } from "@/components/workspace-access-gate";
import { WorkspaceClient } from "@/components/workspace-client";
export default function Page() { return <OrbitalShell title="DropSignal"><WorkspaceAccessGate><WorkspaceClient mode="dropsignal"/></WorkspaceAccessGate></OrbitalShell>; }
