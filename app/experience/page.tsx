import { redirect } from "next/navigation";

import { AudioguideShell } from "@/components/experience/AudioguideShell";
import { getVisitorSession } from "@/lib/visitorSession";

export default function ExperiencePage() {
  const session = getVisitorSession();
  if (!session) {
    redirect("/profile?next=/experience");
  }

  return <AudioguideShell visitorName={session.name} visitorSegment={session.segment} />;
}
