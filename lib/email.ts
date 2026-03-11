import { addDays, format } from "date-fns";
import { Resend } from "resend";

import type { VisitorProfile } from "@/types/profile";

interface EmailStepTemplate {
  dayOffset: number;
  subject: string;
  html: string;
}

interface SequenceParams {
  profile: VisitorProfile;
  name?: string;
  eventDate?: Date;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const EMAIL_FROM =
  process.env.MIROKAI_EMAIL_FROM ?? "Mirokaï Experience <experience@enchanted.tools>";

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 0
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const profileCopy: Record<VisitorProfile, string> = {
  solo: "Votre parcours solo sur Nimira",
  team: "Votre expérience collective sur Nimira",
  b2b: "Votre immersion B2B et cas d'usage Mirokaï",
};

export const buildEmailSequence = ({
  profile,
  name,
  eventDate = addDays(new Date(), 7),
}: SequenceParams): EmailStepTemplate[] => {
  const introName = name ? `Bonjour ${name},` : "Bonjour,";
  const label = profileCopy[profile];
  const dateString = format(eventDate, "dd/MM/yyyy");

  return [
    {
      dayOffset: -7,
      subject: `J-7 • Préparez votre visite Mirokaï (${label})`,
      html: `
        <p>${introName}</p>
        <p>Votre aventure Mirokaï approche (${dateString}).</p>
        <p>Vous recevrez un brief de visite personnalisé selon votre profil <strong>${profile}</strong>.</p>
      `,
    },
    {
      dayOffset: -2,
      subject: `J-2 • Coulisses Nimira et conseils de visite`,
      html: `
        <p>${introName}</p>
        <p>Découvrez les coulisses de Nimira: narration, interactions IA, moments clés à ne pas manquer.</p>
        <p>Prévoyez votre arrivée 10 minutes en avance pour une immersion fluide.</p>
      `,
    },
    {
      dayOffset: -1,
      subject: `J-1 • Confirmation finale de présence`,
      html: `
        <p>${introName}</p>
        <p>Votre session Mirokaï commence demain.</p>
        <p><a href="${
          process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
        }/confirmation">Confirmer ma présence</a></p>
      `,
    },
  ];
};

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailParams): Promise<{ delivered: boolean; provider: "resend" | "mock" }> => {
  if (!resend) {
    return { delivered: true, provider: "mock" };
  }

  await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });

  return { delivered: true, provider: "resend" };
};
