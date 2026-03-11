import { NextResponse } from "next/server";

import { privateBookingSchema } from "@/lib/validators";
import { sendPrivateBookingNotification } from "@/services/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = privateBookingSchema.parse(body);

    await sendPrivateBookingNotification(payload);

    return NextResponse.json({
      ok: true,
      message: "Demande de créneau privé envoyée.",
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
