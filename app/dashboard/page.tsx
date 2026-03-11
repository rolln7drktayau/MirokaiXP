import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { NavBackHome } from "@/components/ui/NavBackHome";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDashboardMetrics } from "@/services/dashboardService";

export default async function DashboardPage() {
  const isAuthenticated = isAdminAuthenticated();

  if (!isAuthenticated) {
    return <DashboardLogin />;
  }

  const metrics = await getDashboardMetrics();

  return (
    <main className="section-wrap py-8">
      <NavBackHome className="mb-4" />

      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Dashboard Mirokaï Experience</p>
        <h1 className="mt-2 text-3xl">Suivi conversion et acquisition</h1>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="glass-panel rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">Taux de remplissage</p>
          <p className="mt-1 text-3xl text-[#F5C842]">{metrics.fillRate}%</p>
        </article>
        <article className="glass-panel rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">Répartition B2B</p>
          <p className="mt-1 text-3xl text-[#53B3FF]">{metrics.b2bShare}%</p>
        </article>
        <article className="glass-panel rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">Répartition B2C</p>
          <p className="mt-1 text-3xl text-[#53B3FF]">{metrics.b2cShare}%</p>
        </article>
        <article className="glass-panel rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">Emails capturés</p>
          <p className="mt-1 text-3xl text-[#F5C842]">{metrics.emailsCaptured}</p>
        </article>
      </div>

      <AnalyticsCharts funnel={metrics.funnel} utmBreakdown={metrics.utmBreakdown} />
    </main>
  );
}
