import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { moduleSchema } from "@/lib/validators";
import { createModule, listModules } from "@/services/moduleService";

const isAdminAuthorized = () => cookies().get("dashboard_auth")?.value === "1";

export async function GET() {
  try {
    const data = await listModules();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthorized()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const payload = moduleSchema.parse(body);

    const moduleRecord = await createModule({
      ...payload,
      audioUrl: payload.audioUrl || undefined,
      videoUrl: payload.videoUrl || undefined,
    });

    return NextResponse.json({ ok: true, data: moduleRecord }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 400 },
    );
  }
}
