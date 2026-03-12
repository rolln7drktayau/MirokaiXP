import { cookies } from "next/headers";

import { VISITOR_SESSION_COOKIE } from "@/lib/visitorSession.constants";
import type { VisitorSession } from "@/types/profile";

const isVisitorSession = (value: unknown): value is VisitorSession => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<VisitorSession>;
  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    (candidate.segment === "b2c" || candidate.segment === "b2b") &&
    typeof candidate.createdAt === "string"
  );
};

export const encodeVisitorSession = (session: VisitorSession) => {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
};

export const decodeVisitorSession = (value: string | null | undefined): VisitorSession | null => {
  if (!value) {
    return null;
  }

  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as unknown;
    return isVisitorSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const getVisitorSession = (): VisitorSession | null => {
  const cookieStore = cookies();
  const raw = cookieStore.get(VISITOR_SESSION_COOKIE)?.value;
  return decodeVisitorSession(raw);
};

export const hasVisitorSession = () => {
  return Boolean(getVisitorSession());
};
