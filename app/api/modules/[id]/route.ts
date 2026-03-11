import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { modulePatchSchema } from "@/lib/validators";
import { deleteModule, getModuleById, updateModule } from "@/services/moduleService";

const isAdminAuthorized = () => cookies().get("dashboard_auth")?.value === "1";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const record = await getModuleById(params.id);

  if (!record) {
    return NextResponse.json({ ok: false, error: "Module introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: record });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!isAdminAuthorized()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const payload = modulePatchSchema.parse(body);

    const updated = await updateModule(params.id, {
      ...payload,
      ...(payload.audioUrl === "" && { audioUrl: undefined }),
      ...(payload.videoUrl === "" && { videoUrl: undefined }),
    });

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Module introuvable." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!isAdminAuthorized()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteModule(params.id);

  if (!deleted) {
    return NextResponse.json({ ok: false, error: "Module introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
