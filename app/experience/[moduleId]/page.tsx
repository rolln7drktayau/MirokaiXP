import Link from "next/link";
import { notFound } from "next/navigation";

import { getModuleById } from "@/services/moduleService";

interface ModuleDetailPageProps {
  params: { moduleId: string };
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const moduleData = await getModuleById(params.moduleId);

  if (!moduleData) {
    notFound();
  }

  return (
    <main className="section-wrap py-8">
      <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">Module #{moduleData.number}</p>
        <h1 className="mt-1 text-3xl">{moduleData.name}</h1>
        <p className="mt-3 text-white/80">{moduleData.description}</p>

        <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
          {moduleData.mirokaiPrompt}
        </p>

        {moduleData.videoUrl ? (
          <video
            className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40"
            controls
            preload="metadata"
            src={moduleData.videoUrl}
          />
        ) : null}

        {moduleData.audioUrl ? (
          <audio className="mt-4 w-full" controls preload="metadata" src={moduleData.audioUrl} />
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/experience" className="cta-secondary">
            Retour au plan
          </Link>
          <Link href="/game" className="cta-primary">
            Lancer le mini-jeu Nimira
          </Link>
        </div>
      </div>
    </main>
  );
}
