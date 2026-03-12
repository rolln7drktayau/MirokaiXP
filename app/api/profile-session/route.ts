import { NextResponse } from "next/server";
import { z } from "zod";

import {
  encodeVisitorSession,
  getVisitorSession,
} from "@/lib/visitorSession";
import { VISITOR_SESSION_COOKIE } from "@/lib/visitorSession.constants";
import type { VisitorSession } from "@/types/profile";

const inputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nom trop court")
    .max(40, "Nom trop long"),
  segment: z.enum(["b2c", "b2b"]),
});

export async function GET() {
  const session = getVisitorSession();
  return NextResponse.json({ ok: true, session });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inputSchema.parse(body);

    const session: VisitorSession = {
      name: parsed.name,
      segment: parsed.segment,
      createdAt: new Date().toISOString(),
    };

    const response = NextResponse.json({ ok: true, session });
    response.cookies.set({
      name: VISITOR_SESSION_COOKIE,
      value: encodeVisitorSession(session),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Payload invalide." }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: VISITOR_SESSION_COOKIE,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}
