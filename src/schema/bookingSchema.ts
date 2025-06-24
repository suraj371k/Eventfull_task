// schema/bookingSchema.ts
import { z } from "zod";

export const bookingFormSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  eventDate: z.string(),
  eventTime: z.string(),
  eventDetails: z.string().min(10),
});

export type Booking = {
  id: string;
  artistId: number;
  artistName: string;
  clientName: string;
  clientEmail: string;
  eventDate: string;
  eventTime: string;
  eventDetails: string;
  createdAt: Date;
};

export type BookingFormValues = z.infer<typeof bookingFormSchema>;