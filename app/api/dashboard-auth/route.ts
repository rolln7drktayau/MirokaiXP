import { NextResponse } from "next/server";

const COOKIE_NAME = "dashboard_auth";
const DEFAULT_PASSWORD = "mirokai-dashboard-2026";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };
    const expectedPassword = process.env.DASHBOARD_PASSWORD ?? DEFAULT_PASSWORD;

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ ok: false, error: "Mot de passe invalide." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: COOKIE_NAME,
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}
