export type SlotAudience = "public" | "business";
export type SlotLanguage = "fr" | "en";

export interface BookingSlot {
  id: string;
  startsAt: string;
  endsAt: string;
  seatsTotal: number;
  seatsRemaining: number;
  audience: SlotAudience;
  language: SlotLanguage;
}

export interface PrivateBookingRequest {
  company: string;
  contactName: string;
  email: string;
  attendees: number;
  preferredDate: string;
  note?: string;
}

export interface SlotConversionSnapshot {
  slotId: string;
  profile: "solo" | "team" | "b2b";
  source: string;
  converted: boolean;
}
