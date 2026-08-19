import { OrbitalShell } from "@/components/orbital-shell";
import { WorkspaceAccessGate } from "@/components/workspace-access-gate";
import { WorkspaceClient } from "@/components/workspace-client";
export default function Page() { return <OrbitalShell title="Product pipeline"><WorkspaceAccessGate><WorkspaceClient mode="pipeline"/></WorkspaceAccessGate></OrbitalShell>; }
