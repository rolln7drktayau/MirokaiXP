import Link from "next/link";

import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminHomePage() {
  if (!isAdminAuthenticated()) {
    return <DashboardLogin />;
  }

  return (
    <main className="section-wrap py-8">
      <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">Espace Admin Enchanted Tools</p>
        <h1 className="mt-2 text-3xl">Gestion de l&apos;expérience</h1>
        <p className="mt-2 text-sm text-white/75">
          Gérez les modules, les contenus et la position des points d&apos;intérêt sur le plan.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/admin/modules" className="cta-primary">
            Gérer les modules
          </Link>
          <Link href="/admin/floor-plan" className="cta-secondary">
            Éditeur floor plan
          </Link>
          <Link href="/dashboard" className="cta-secondary">
            Voir dashboard analytics
          </Link>
        </div>
      </div>
    </main>
  );
}
