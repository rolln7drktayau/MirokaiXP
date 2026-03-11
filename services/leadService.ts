import { createClient } from "@supabase/supabase-js";

import type { LeadPayload } from "@/types/profile";

const inMemoryLeads: Array<LeadPayload & { createdAt: string }> = [];

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export const createLead = async (lead: LeadPayload) => {
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      ...lead,
      created_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(`Impossible d'enregistrer le lead: ${error.message}`);
    }

    return { storage: "supabase" as const };
  }

  inMemoryLeads.push({
    ...lead,
    createdAt: new Date().toISOString(),
  });

  return { storage: "memory" as const };
};

export const listLeads = async () => {
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      throw new Error(`Impossible de récupérer les leads: ${error.message}`);
    }

    return data;
  }

  return inMemoryLeads;
};
