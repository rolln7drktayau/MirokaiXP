import { redirect } from "next/navigation";

import { MemoryGameShell } from "@/components/game/MemoryGameShell";
import { getVisitorSession } from "@/lib/visitorSession";

export default function MemoryGamePage() {
  const session = getVisitorSession();
  if (!session) {
    redirect("/profile?next=/game/memory");
  }
  if (session.segment === "b2b") {
    redirect("/game");
  }

  return <MemoryGameShell />;
}
