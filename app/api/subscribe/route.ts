import { NextResponse } from "next/server";

import { emailCaptureSchema } from "@/lib/validators";
import { subscribeAndSchedule } from "@/services/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = emailCaptureSchema.parse(body);

    const result = await subscribeAndSchedule(payload);

    return NextResponse.json({
      ok: true,
      scheduled: result.scheduled,
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
