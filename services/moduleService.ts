import { createClient } from "@supabase/supabase-js";

import { moduleSeed } from "@/lib/moduleSeed";
import type { Module, ModuleInput, ModulePosition } from "@/types/module";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

const inMemoryModules: Module[] = structuredClone(moduleSeed);

const mapSupabaseModule = (item: {
  id: string;
  number: number;
  name: string;
  description: string;
  audio_url?: string | null;
  video_url?: string | null;
  images?: string[] | null;
  position?: { x: number; y: number } | null;
  mirokai_prompt: string;
  unlocked: boolean;
  theme: Module["theme"];
}): Module => ({
  id: item.id,
  number: item.number,
  name: item.name,
  description: item.description,
  audioUrl: item.audio_url ?? undefined,
  videoUrl: item.video_url ?? undefined,
  images: item.images ?? [],
  position: item.position ?? { x: 50, y: 50 },
  mirokaiPrompt: item.mirokai_prompt,
  unlocked: item.unlocked,
  theme: item.theme,
});

export const listModules = async (): Promise<Module[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .order("number", { ascending: true });

    if (!error && data) {
      return data.map(mapSupabaseModule);
    }
  }

  return [...inMemoryModules].sort((a, b) => a.number - b.number);
};

export const getModuleById = async (id: string): Promise<Module | null> => {
  if (supabase) {
    const { data, error } = await supabase.from("modules").select("*").eq("id", id).single();
    if (!error && data) {
      return mapSupabaseModule(data);
    }
  }

  return inMemoryModules.find((module) => module.id === id) ?? null;
};

export const createModule = async (payload: ModuleInput): Promise<Module> => {
  const record: Module = {
    id: crypto.randomUUID(),
    ...payload,
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("modules")
      .insert({
        id: record.id,
        number: record.number,
        name: record.name,
        description: record.description,
        audio_url: record.audioUrl ?? null,
        video_url: record.videoUrl ?? null,
        images: record.images,
        position: record.position,
        mirokai_prompt: record.mirokaiPrompt,
        unlocked: record.unlocked,
        theme: record.theme,
      })
      .select("*")
      .single();

    if (!error && data) {
      return mapSupabaseModule(data);
    }
  }

  inMemoryModules.push(record);
  return record;
};

export const updateModule = async (
  id: string,
  payload: Partial<ModuleInput>,
): Promise<Module | null> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("modules")
      .update({
        ...(payload.number !== undefined && { number: payload.number }),
        ...(payload.name !== undefined && { name: payload.name }),
        ...(payload.description !== undefined && { description: payload.description }),
        ...(payload.audioUrl !== undefined && { audio_url: payload.audioUrl }),
        ...(payload.videoUrl !== undefined && { video_url: payload.videoUrl }),
        ...(payload.images !== undefined && { images: payload.images }),
        ...(payload.position !== undefined && { position: payload.position }),
        ...(payload.mirokaiPrompt !== undefined && { mirokai_prompt: payload.mirokaiPrompt }),
        ...(payload.unlocked !== undefined && { unlocked: payload.unlocked }),
        ...(payload.theme !== undefined && { theme: payload.theme }),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (!error && data) {
      return mapSupabaseModule(data);
    }
  }

  const index = inMemoryModules.findIndex((module) => module.id === id);
  if (index === -1) {
    return null;
  }

  inMemoryModules[index] = {
    ...inMemoryModules[index],
    ...payload,
  };
  return inMemoryModules[index];
};

export const updateModulePosition = async (id: string, position: ModulePosition) => {
  return updateModule(id, { position });
};

export const deleteModule = async (id: string): Promise<boolean> => {
  if (supabase) {
    const { error } = await supabase.from("modules").delete().eq("id", id);
    if (!error) {
      return true;
    }
  }

  const before = inMemoryModules.length;
  const next = inMemoryModules.filter((module) => module.id !== id);
  inMemoryModules.length = 0;
  inMemoryModules.push(...next);
  return next.length < before;
};
