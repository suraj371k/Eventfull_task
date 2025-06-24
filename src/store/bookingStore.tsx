import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Booking = {
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

type BookingState = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  deleteBooking: (id: string) => void;
  clearBookings: () => void; // Added clear functionality
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      
      // Add a new booking (auto-generates id and createdAt)
      addBooking: (booking) => set((state) => ({
        bookings: [
          ...state.bookings,
          {
            ...booking,
            id: Date.now().toString(),
            createdAt: new Date(),
          },
        ],
      })),
      
      // Delete a booking by ID
      deleteBooking: (id) => set((state) => ({
        bookings: state.bookings.filter((booking) => booking.id !== id),
      })),
      
      // Clear all bookings
      clearBookings: () => set({ bookings: [] }),
    }),
    {
      name: 'bookings-storage', 
    }
  )
);