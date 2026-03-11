import { notFound } from "next/navigation";

import { ModuleDetailView } from "@/components/experience/ModuleDetailView";
import { getModuleById } from "@/services/moduleService";

interface ModuleDetailPageProps {
  params: { moduleId: string };
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const moduleData = await getModuleById(params.moduleId);

  if (!moduleData) {
    notFound();
  }

  return <ModuleDetailView moduleData={moduleData} />;
}
