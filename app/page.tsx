import { LandingExperience } from "@/components/landing/LandingExperience";
import { getVisitorSession } from "@/lib/visitorSession";

export default function HomePage() {
  const visitorSession = getVisitorSession();
  return <LandingExperience visitorSession={visitorSession} />;
}
