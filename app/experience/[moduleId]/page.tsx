import { notFound, redirect } from "next/navigation";

import { ModuleDetailView } from "@/components/experience/ModuleDetailView";
import { getVisitorSession } from "@/lib/visitorSession";
import { getModuleById } from "@/services/moduleService";

interface ModuleDetailPageProps {
  params: { moduleId: string };
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const session = getVisitorSession();
  if (!session) {
    redirect(`/profile?next=/experience/${params.moduleId}`);
  }

  const moduleData = await getModuleById(params.moduleId);

  if (!moduleData) {
    notFound();
  }

  return <ModuleDetailView moduleData={moduleData} />;
}
