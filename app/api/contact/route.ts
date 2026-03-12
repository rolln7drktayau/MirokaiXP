import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  phone: z.string().min(6, "Numéro invalide.").max(32, "Numéro invalide."),
  sector: z.string().min(2, "Le secteur est requis."),
  profile: z.enum(["solo", "team", "b2b"]).optional(),
});

const inMemoryContacts: Array<
  z.infer<typeof contactSchema> & { createdAt: string }
> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = contactSchema.parse(body);

    inMemoryContacts.push({
      ...payload,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, storage: "memory" });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erreur inattendue.",
      },
      { status: 400 },
    );
  }
}
