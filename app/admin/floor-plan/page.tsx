import Link from "next/link";

import { FloorPlanManager } from "@/components/admin/FloorPlanManager";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminFloorPlanPage() {
  if (!isAdminAuthenticated()) {
    return <DashboardLogin />;
  }

  return (
    <main className="section-wrap py-8 space-y-4">
      <div className="glass-panel rounded-3xl p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">Admin / Floor Plan</p>
        <h1 className="mt-2 text-3xl">Éditeur drag & drop</h1>
        <p className="mt-2 text-sm text-white/75">
          Déplacez les modules sur le plan pour adapter le parcours muséal à l&apos;espace réel.
        </p>
        <div className="mt-4">
          <Link href="/admin/modules" className="cta-secondary">
            Retour gestion modules
          </Link>
        </div>
      </div>
      <FloorPlanManager />
    </main>
  );
}
