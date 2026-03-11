"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { moduleSchema, type ModuleSchema } from "@/lib/validators";
import type { ModuleInput } from "@/types/module";

import { ModulePositionPicker } from "./ModulePositionPicker";

interface ModuleFormProps {
  initialValues?: Partial<ModuleInput>;
  submitLabel: string;
  onSubmit: (data: ModuleInput) => Promise<void> | void;
}

const defaultValues: ModuleInput = {
  number: 1,
  name: "",
  description: "",
  audioUrl: "",
  videoUrl: "",
  images: [],
  position: { x: 50, y: 50 },
  mirokaiPrompt: "",
  unlocked: false,
  theme: "nimira",
};

export function ModuleForm({ initialValues, submitLabel, onSubmit }: ModuleFormProps) {
  const mergedDefaults = useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
      images: initialValues?.images ?? [],
      position: initialValues?.position ?? defaultValues.position,
    }),
    [initialValues],
  );

  const [imagesText, setImagesText] = useState(mergedDefaults.images.join("\n"));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ModuleSchema>({
    resolver: zodResolver(moduleSchema),
    defaultValues: mergedDefaults,
  });

  const position = watch("position") ?? defaultValues.position;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const normalized: ModuleInput = {
          ...values,
          audioUrl: values.audioUrl || undefined,
          videoUrl: values.videoUrl || undefined,
          images: imagesText
            .split("\n")
            .map((url) => url.trim())
            .filter(Boolean),
        };
        await onSubmit(normalized);
      })}
      className="grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Numéro du module
          <input
            type="number"
            {...register("number", { valueAsNumber: true })}
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
          />
          {errors.number ? <span className="text-xs text-red-300">{errors.number.message}</span> : null}
        </label>
        <label className="text-sm">
          Nom du module
          <input
            {...register("name")}
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
          />
          {errors.name ? <span className="text-xs text-red-300">{errors.name.message}</span> : null}
        </label>
      </div>

      <label className="text-sm">
        Description / Cartel
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
        />
        {errors.description ? <span className="text-xs text-red-300">{errors.description.message}</span> : null}
      </label>

      <label className="text-sm">
        Prompt Mirokaï (court)
        <textarea
          {...register("mirokaiPrompt")}
          rows={2}
          className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
        />
        {errors.mirokaiPrompt ? <span className="text-xs text-red-300">{errors.mirokaiPrompt.message}</span> : null}
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Audio URL (optionnel)
          <input
            {...register("audioUrl")}
            placeholder="/media/audio/fr/xx.mp3"
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Vidéo URL (optionnel)
          <input
            {...register("videoUrl")}
            placeholder="/media/video/xx.mp4"
            className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
          />
        </label>
      </div>

      <label className="text-sm">
        Images (une URL par ligne)
        <textarea
          value={imagesText}
          onChange={(event) => setImagesText(event.target.value)}
          rows={4}
          placeholder={"/media/images/module-01.jpg\n/media/images/module-01-alt.jpg"}
          className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
        />
      </label>

      <ModulePositionPicker
        value={position}
        onChange={(nextPosition) => {
          setValue("position.x", nextPosition.x, { shouldDirty: true, shouldValidate: true });
          setValue("position.y", nextPosition.y, { shouldDirty: true, shouldValidate: true });
        }}
      />

      <label className="text-sm">
        Thème
        <select
          {...register("theme")}
          className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2"
        >
          <option value="nimira">nimira</option>
          <option value="tech">tech</option>
          <option value="emotion">emotion</option>
          <option value="narration">narration</option>
        </select>
      </label>

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("unlocked")} />
        Module déverrouillé
      </label>

      <button type="submit" disabled={isSubmitting} className="cta-primary">
        {isSubmitting ? "Enregistrement..." : submitLabel}
      </button>
    </form>
  );
}
