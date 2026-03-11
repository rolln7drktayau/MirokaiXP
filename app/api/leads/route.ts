import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/validators";
import { createLead, listLeads } from "@/services/leadService";

export async function GET() {
  try {
    const data = await listLeads();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erreur inattendue.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = leadSchema.parse(body);

    const result = await createLead(payload);

    return NextResponse.json({
      ok: true,
      storage: result.storage,
    });
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
