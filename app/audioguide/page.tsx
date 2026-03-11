import { AudioguideShell } from "@/components/audioguide/AudioguideShell";
import { audioguideSteps } from "@/lib/audioguideContent";

export default function AudioguidePage() {
  return <AudioguideShell steps={audioguideSteps} />;
}
