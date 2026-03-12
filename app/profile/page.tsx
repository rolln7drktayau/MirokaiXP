import { ProfileHub } from "@/components/profile/ProfileHub";
import { isAdminAuthenticated } from "@/lib/auth";

interface ProfilePageProps {
  searchParams?: {
    next?: string;
    blocked?: string;
  };
}

const sanitizeNextPath = (value: string | undefined) => {
  if (!value || !value.startsWith("/")) {
    return null;
  }
  return value;
};

export default function ProfilePage({ searchParams }: ProfilePageProps) {
  const nextPath = sanitizeNextPath(searchParams?.next);
  const blockedReason = searchParams?.blocked ?? null;

  return (
    <ProfileHub
      adminAuthenticated={isAdminAuthenticated()}
      nextPath={nextPath}
      blockedReason={blockedReason}
    />
  );
}
