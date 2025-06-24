"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, User, MapPin, Globe, DollarSign, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { artists } from "@/utils/artistData";
import { useForm } from "react-hook-form";
import { bookingFormSchema, BookingFormValues } from "@/schema/bookingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookingStore } from "@/store/bookingStore";
import toast from "react-hot-toast";

export default function ArtistDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const artist = artists.find(a => a.id === Number(params.id));
  const { addBooking } = useBookingStore();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { clientEmail: "", clientName: "", eventDate: "", eventTime: "", eventDetails: "" }
  });

  const onSubmit = (data: BookingFormValues) => {
    if (!artist) return;
    addBooking({ ...data, artistId: artist.id, artistName: artist.name });
    toast.success("Booking successful!");
    router.push('/booking');
    form.reset();
  };

  if (!artist) return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Artist not found</h2>
        <Button onClick={() => router.push("/artists")}>Back to Artists</Button>
      </div>
    </div>
  );

  const renderInfoItem = (Icon: any, value: string, color?: string) => (
    <div className="flex items-center gap-2">
      <Icon className={`w-5 h-5 ${color || "text-slate-500"}`} />
      <span className="text-slate-700 dark:text-slate-300">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-10">
      <div className="container mx-auto px-6 mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" /> Back to Artists
        </Button>
      </div>

      <motion.div className="container mx-auto px-6 mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div className="w-full md:w-1/3 lg:w-1/4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-xl shadow-lg aspect-square">
              <motion.img className="w-full h-full object-cover" src={artist.image} alt={artist.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
            </div>
          </motion.div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{artist.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-blue-500" />
              <Badge variant="secondary" className="text-sm">{artist.category}</Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">{artist.bio}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {renderInfoItem(MapPin, artist.location, "text-green-500")}
              {renderInfoItem(Globe, artist.language, "text-purple-500")}
              {renderInfoItem(DollarSign, artist.feeRange, "text-emerald-500")}
              {renderInfoItem(Mail, artist.email || "contact@artist.com", "text-rose-500")}
            </div>
            <Button size="lg" className="px-8">Book Artist</Button>
          </div>
        </div>
      </motion.div>

      <motion.section className="container mx-auto px-6 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Book {artist.name}</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["clientName", "clientEmail"].map(field => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {field === "clientName" ? "Your Name" : "Email Address"}
                  </label>
                  <input {...form.register(field as keyof BookingFormValues)} className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white" placeholder={`Enter your ${field === "clientName" ? "name" : "email"}`} />
                  {form.formState.errors[field as keyof BookingFormValues] && (
                    <p className="text-sm text-red-500">{form.formState.errors[field as keyof BookingFormValues]?.message}</p>
                  )}
                </div>
              ))}

              {["eventDate", "eventTime"].map(field => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {field === "eventDate" ? "Event Date" : "Event Time"}
                  </label>
                  <div className="relative">
                    {field === "eventDate" ? <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" /> : <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />}
                    <input type={field === "eventDate" ? "date" : "time"} {...form.register(field as keyof BookingFormValues)} className="w-full pl-10 px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white" />
                  </div>
                  {form.formState.errors[field as keyof BookingFormValues] && (
                    <p className="text-sm text-red-500">{form.formState.errors[field as keyof BookingFormValues]?.message}</p>
                  )}
                </div>
              ))}

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Event Details</label>
                <textarea rows={4} {...form.register("eventDetails")} className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white" placeholder="Tell us about your event..." />
                {form.formState.errors.eventDetails && <p className="text-sm text-red-500">{form.formState.errors.eventDetails.message}</p>}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button size="lg" type="submit" className="px-8" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Book Artist"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section className="container mx-auto px-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(item => (
            <motion.div key={item} className="relative overflow-hidden rounded-xl aspect-square bg-slate-100 dark:bg-zinc-800" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-white font-medium text-lg">Work Sample #{item}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}