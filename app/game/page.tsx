import { redirect } from "next/navigation";

import { B2BGameShell } from "@/components/game/B2BGameShell";
import { GameShell } from "@/components/game/GameShell";
import { getVisitorSession } from "@/lib/visitorSession";

export default function GamePage() {
  const session = getVisitorSession();
  if (!session) {
    redirect("/profile?next=/game");
  }

  if (session.segment === "b2b") {
    return <B2BGameShell visitorName={session.name} />;
  }

  return <GameShell />;
}
