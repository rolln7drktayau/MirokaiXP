import { addDays } from "date-fns";

import { buildEmailSequence, sendEmail } from "@/lib/email";
import type { PrivateBookingRequest } from "@/types/booking";
import type { EmailSequenceStage } from "@/types/email";
import type { EmailCaptureInput } from "@/types/profile";

import {
  createSubscriber,
  enqueueEmailSteps,
  listDueScheduledEmails,
  updateScheduledEmailStatus,
} from "./subscriptionService";

const offsetToStage: Record<number, EmailSequenceStage> = {
  [-7]: "j7",
  [-2]: "j2",
  [-1]: "j1",
};

export const subscribeAndSchedule = async (payload: EmailCaptureInput) => {
  const eventDate = addDays(new Date(), 7);
  const subscriber = await createSubscriber(payload);
  const sequence = buildEmailSequence({
    profile: payload.profile,
    eventDate,
  });

  const queued = await enqueueEmailSteps(
    sequence.map((step) => ({
      subscriberId: subscriber.id,
      email: payload.email,
      profile: payload.profile,
      source: payload.source ?? "subscribe_form",
      stage: offsetToStage[step.dayOffset] ?? "j7",
      subject: step.subject,
      html: step.html,
      scheduledFor: addDays(eventDate, step.dayOffset).toISOString(),
    })),
  );

  // J-7 est planifié à "maintenant" dans le scénario standard: envoi immédiat.
  const immediate = queued.filter((item) => item.stage === "j7");
  for (const item of immediate) {
    const delivery = await sendEmail({
      to: item.email,
      subject: item.subject,
      html: item.html,
    });
    await updateScheduledEmailStatus(item.id, "sent", delivery.provider);
  }

  return {
    subscriberId: subscriber.id,
    scheduled: queued.map((step) => ({
      stage: step.stage,
      scheduledFor: step.scheduledFor,
      status: step.stage === "j7" ? "sent" : "pending",
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

export const processDueEmailSequence = async (limit = 30) => {
  const dueItems = await listDueScheduledEmails(limit);

  let sent = 0;
  let failed = 0;

  for (const item of dueItems) {
    try {
      const delivery = await sendEmail({
        to: item.email,
        subject: item.subject,
        html: item.html,
      });
      await updateScheduledEmailStatus(item.id, "sent", delivery.provider);
      sent += 1;
    } catch {
      await updateScheduledEmailStatus(item.id, "failed");
      failed += 1;
    }
  }

  return {
    processed: dueItems.length,
    sent,
    failed,
  };
};
