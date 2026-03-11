import { cookies } from "next/headers";

const AUTH_COOKIE = "dashboard_auth";

export const isAdminAuthenticated = () => {
  const cookieStore = cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "1";
};
