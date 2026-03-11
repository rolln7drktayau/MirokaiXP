import { NextResponse } from "next/server";

import { processDueEmailSequence } from "@/services/emailService";

const cronSecret = process.env.CRON_SECRET;

const isAuthorized = (request: Request) => {
  if (!cronSecret) {
    return true;
  }

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${cronSecret}`;
};

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await processDueEmailSequence();
  return NextResponse.json({ ok: true, ...result });
}

export async function POST(request: Request) {
  return GET(request);
}
