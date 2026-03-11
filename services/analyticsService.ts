import { createClient } from "@supabase/supabase-js";

import type { AnalyticsEventInput, AnalyticsEventRecord } from "@/types/analytics";

const inMemoryEvents: AnalyticsEventRecord[] = [];

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export const trackAnalyticsEvent = async (
  input: AnalyticsEventInput,
): Promise<AnalyticsEventRecord> => {
  const record: AnalyticsEventRecord = {
    id: crypto.randomUUID(),
    event: input.event,
    profile: input.profile,
    source: input.source,
    value: input.value,
    step: input.step,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("analytics_events")
      .insert({
        event: record.event,
        profile: record.profile ?? null,
        source: record.source ?? null,
        value: record.value ?? null,
        step: record.step ?? null,
        created_at: record.createdAt,
      })
      .select("id,event,profile,source,value,step,created_at")
      .single();

    if (!error && data) {
      return {
        id: String(data.id),
        event: data.event,
        profile: data.profile ?? undefined,
        source: data.source ?? undefined,
        value: data.value ?? undefined,
        step: data.step ?? undefined,
        createdAt: data.created_at,
      };
    }
  }

  inMemoryEvents.push(record);
  return record;
};

export const listAnalyticsEvents = async (): Promise<AnalyticsEventRecord[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("analytics_events")
      .select("id,event,profile,source,value,step,created_at")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (!error && data) {
      return data.map((item) => ({
        id: String(item.id),
        event: item.event,
        profile: item.profile ?? undefined,
        source: item.source ?? undefined,
        value: item.value ?? undefined,
        step: item.step ?? undefined,
        createdAt: item.created_at,
      }));
    }
  }

  return [...inMemoryEvents];
};
