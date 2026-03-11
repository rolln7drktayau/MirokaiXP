import { addDays } from "date-fns";

import { buildEmailSequence, sendEmail } from "@/lib/email";
import type { PrivateBookingRequest } from "@/types/booking";
import type { EmailCaptureInput } from "@/types/profile";

export const subscribeAndSchedule = async (payload: EmailCaptureInput) => {
  const eventDate = addDays(new Date(), 7);
  const sequence = buildEmailSequence({
    profile: payload.profile,
    eventDate,
  });

  const firstEmail = sequence.at(0);

  if (firstEmail) {
    await sendEmail({
      to: payload.email,
      subject: firstEmail.subject,
      html: firstEmail.html,
    });
  }

  return {
    scheduled: sequence.map((step) => ({
      dayOffset: step.dayOffset,
      subject: step.subject,
    })),
  };
};

export const sendPrivateBookingNotification = async (
  request: PrivateBookingRequest,
) => {
  const recipient = process.env.MIROKAI_SALES_EMAIL ?? "sales@enchanted.tools";

  await sendEmail({
    to: recipient,
    subject: `Nouvelle demande créneau privé • ${request.company}`,
    html: `
      <p><strong>Entreprise:</strong> ${request.company}</p>
      <p><strong>Contact:</strong> ${request.contactName}</p>
      <p><strong>Email:</strong> ${request.email}</p>
      <p><strong>Participants:</strong> ${request.attendees}</p>
      <p><strong>Date souhaitée:</strong> ${request.preferredDate}</p>
      <p><strong>Message:</strong> ${request.note ?? "Aucun"}</p>
    `,
  });
};
