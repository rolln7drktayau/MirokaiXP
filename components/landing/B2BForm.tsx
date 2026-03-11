"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { trackEvent } from "@/lib/analytics";
import { b2bFormSchema } from "@/lib/validators";
import type { B2BFormData } from "@/types/profile";

import { useUTM } from "@/hooks/useUTM";

interface B2BFormProps {
  onQualified: (data: B2BFormData) => void;
}

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

export function B2BForm({ onQualified }: B2BFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const { utm } = useUTM();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<B2BFormData>({
    resolver: zodResolver(b2bFormSchema),
    defaultValues: {
      company: "",
      companySize: "11-50",
      sector: "",
      attendees: 8,
      contactName: "",
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    trackEvent("form_submitted", { profile: "b2b", source: "b2b_form" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          profile: "b2b",
          utm,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission.");
      }

      onQualified(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleStart = () => {
    if (hasStarted) {
      return;
    }
    setHasStarted(true);
    trackEvent("form_started", { profile: "b2b", source: "b2b_form" });
  };

  return (
    <section className="section-wrap py-8" id="b2b-form">
      <div className="glass-panel rounded-3xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl">Pré-qualification entreprise</h2>
        <p className="mt-2 text-sm text-white/75">
          Un court formulaire pour personnaliser votre parcours et générer votre redirection Eventbrite pré-remplie.
        </p>

        <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Entreprise
            <input
              {...register("company")}
              onFocus={handleStart}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 outline-none ring-0 focus:border-[#53B3FF]"
              placeholder="Enchanted Tools"
            />
            {errors.company ? <span className="text-xs text-red-300">{errors.company.message}</span> : null}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Taille de l&apos;entreprise
            <select
              {...register("companySize")}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 outline-none ring-0 focus:border-[#53B3FF]"
            >
              {companySizes.map((size) => (
                <option key={size} value={size} className="bg-[#0a0a1a]">
                  {size}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Secteur d&apos;activité
            <input
              {...register("sector")}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 outline-none ring-0 focus:border-[#53B3FF]"
              placeholder="Retail, santé, transport..."
            />
            {errors.sector ? <span className="text-xs text-red-300">{errors.sector.message}</span> : null}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Nombre de personnes
            <input
              type="number"
              min={1}
              max={200}
              {...register("attendees", { valueAsNumber: true })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 outline-none ring-0 focus:border-[#53B3FF]"
            />
            {errors.attendees ? <span className="text-xs text-red-300">{errors.attendees.message}</span> : null}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Nom du contact
            <input
              {...register("contactName")}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 outline-none ring-0 focus:border-[#53B3FF]"
              placeholder="Nom et prénom"
            />
            {errors.contactName ? <span className="text-xs text-red-300">{errors.contactName.message}</span> : null}
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Email professionnel
            <input
              type="email"
              {...register("email")}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 outline-none ring-0 focus:border-[#53B3FF]"
              placeholder="prenom.nom@entreprise.com"
            />
            {errors.email ? <span className="text-xs text-red-300">{errors.email.message}</span> : null}
          </label>

          <div className="sm:col-span-2">
            <button type="submit" disabled={isSubmitting} className="cta-primary">
              {isSubmitting ? "Validation..." : "Accéder à Eventbrite avec code B2B2026"}
            </button>
            {errorMessage ? <p className="mt-2 text-sm text-red-300">{errorMessage}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
