"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-10 overflow-hidden bg-white dark:bg-zinc-950 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Discover & Book Top Talent for Your Event
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Explore a curated roster of singers, dancers, comedians, and performers from across India. Artistly makes booking seamless and secure.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/artists">
              <Button className="px-6 py-3 text-base">Browse Artists</Button>
            </Link>
            <Link href="/artists/add">
              <Button variant="outline" className="px-6 py-3 text-base">
                Become an Artist
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-lg"
        >
          <img
            src="/hero.avif"
            alt="Artists performing"
            width={800}
            height={600}
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Background shape */}
      <div className="absolute -bottom-20 -right-40 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] z-0" />
    </section>
  );
}
