import Link from "next/link";

import { ModulesManager } from "@/components/admin/ModulesManager";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminModulesPage() {
  if (!isAdminAuthenticated()) {
    return <DashboardLogin />;
  }

  return (
    <main className="section-wrap py-8 space-y-4">
      <div className="glass-panel rounded-3xl p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">Admin / Modules</p>
        <h1 className="mt-2 text-3xl">Gestion des modules</h1>
        <div className="mt-4">
          <Link href="/admin/floor-plan" className="cta-secondary">
            Aller à l&apos;éditeur floor plan
          </Link>
        </div>
      </div>
      <ModulesManager />
    </main>
  );
}
