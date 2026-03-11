import { NextResponse } from "next/server";

import { analyticsEventSchema } from "@/lib/validators";
import { trackAnalyticsEvent } from "@/services/analyticsService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = analyticsEventSchema.parse(body);

    const event = await trackAnalyticsEvent(payload);

    return NextResponse.json({ ok: true, eventId: event.id });
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
