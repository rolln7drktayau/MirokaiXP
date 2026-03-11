import { createClient } from "@supabase/supabase-js";

import type { EmailCaptureInput } from "@/types/profile";
import type { ScheduledEmailRecord, ScheduledEmailStatus, SubscriberRecord } from "@/types/email";

const inMemorySubscribers: SubscriberRecord[] = [];
const inMemoryQueue: ScheduledEmailRecord[] = [];

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

const normalizeSource = (source?: string) => source ?? "landing";

const mapQueueStatus = (status: string): ScheduledEmailStatus => {
  if (status === "sent" || status === "failed") {
    return status;
  }
  return "pending";
};

export const createSubscriber = async (
  payload: EmailCaptureInput,
): Promise<SubscriberRecord> => {
  const record: SubscriberRecord = {
    id: crypto.randomUUID(),
    email: payload.email,
    profile: payload.profile,
    source: normalizeSource(payload.source),
    consent: payload.consent,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("subscribers")
      .insert({
        email: record.email,
        profile: record.profile,
        source: record.source,
        consent: record.consent,
        created_at: record.createdAt,
      })
      .select("id,email,profile,source,consent,created_at")
      .single();

    if (!error && data) {
      return {
        id: String(data.id),
        email: data.email,
        profile: data.profile,
        source: data.source,
        consent: Boolean(data.consent),
        createdAt: data.created_at,
      };
    }
  }

  inMemorySubscribers.push(record);
  return record;
};

export const listSubscribers = async (): Promise<SubscriberRecord[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("subscribers")
      .select("id,email,profile,source,consent,created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (!error && data) {
      return data.map((item) => ({
        id: String(item.id),
        email: item.email,
        profile: item.profile,
        source: item.source,
        consent: Boolean(item.consent),
        createdAt: item.created_at,
      }));
    }
  }

  return [...inMemorySubscribers];
};

export const enqueueEmailSteps = async (
  steps: Omit<ScheduledEmailRecord, "id" | "createdAt" | "status">[],
): Promise<ScheduledEmailRecord[]> => {
  const now = new Date().toISOString();
  const records = steps.map((step) => ({
    ...step,
    id: crypto.randomUUID(),
    createdAt: now,
    status: "pending" as const,
  }));

  if (supabase) {
    const { data, error } = await supabase
      .from("email_queue")
      .insert(
        records.map((record) => ({
          id: record.id,
          subscriber_id: record.subscriberId,
          email: record.email,
          profile: record.profile,
          source: record.source,
          stage: record.stage,
          subject: record.subject,
          html: record.html,
          scheduled_for: record.scheduledFor,
          status: record.status,
          created_at: record.createdAt,
        })),
      )
      .select("*");

    if (!error && data) {
      return data.map((item) => ({
        id: String(item.id),
        subscriberId: String(item.subscriber_id),
        email: item.email,
        profile: item.profile,
        source: item.source,
        stage: item.stage,
        subject: item.subject,
        html: item.html,
        scheduledFor: item.scheduled_for,
        status: mapQueueStatus(item.status),
        createdAt: item.created_at,
        sentAt: item.sent_at ?? undefined,
        provider: item.provider ?? undefined,
      }));
    }
  }

  inMemoryQueue.push(...records);
  return records;
};

export const listScheduledEmails = async (): Promise<ScheduledEmailRecord[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("email_queue")
      .select("*")
      .order("scheduled_for", { ascending: true })
      .limit(1000);

    if (!error && data) {
      return data.map((item) => ({
        id: String(item.id),
        subscriberId: String(item.subscriber_id),
        email: item.email,
        profile: item.profile,
        source: item.source,
        stage: item.stage,
        subject: item.subject,
        html: item.html,
        scheduledFor: item.scheduled_for,
        status: mapQueueStatus(item.status),
        createdAt: item.created_at,
        sentAt: item.sent_at ?? undefined,
        provider: item.provider ?? undefined,
      }));
    }
  }

  return [...inMemoryQueue];
};

export const listDueScheduledEmails = async (
  limit = 30,
): Promise<ScheduledEmailRecord[]> => {
  const now = new Date();
  const queue = await listScheduledEmails();

  return queue
    .filter((item) => item.status === "pending" && new Date(item.scheduledFor) <= now)
    .slice(0, limit);
};

const updateQueueStatusInMemory = (
  id: string,
  status: ScheduledEmailStatus,
  provider?: "resend" | "mock",
) => {
  const index = inMemoryQueue.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }

  inMemoryQueue[index] = {
    ...inMemoryQueue[index],
    status,
    provider,
    sentAt: status === "sent" ? new Date().toISOString() : inMemoryQueue[index].sentAt,
  };
};

export const updateScheduledEmailStatus = async (
  id: string,
  status: ScheduledEmailStatus,
  provider?: "resend" | "mock",
) => {
  if (supabase) {
    const { error } = await supabase
      .from("email_queue")
      .update({
        status,
        provider: provider ?? null,
        sent_at: status === "sent" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (!error) {
      return;
    }
  }

  updateQueueStatusInMemory(id, status, provider);
};
