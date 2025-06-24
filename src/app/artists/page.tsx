"use client";
import { motion } from "framer-motion";
import { artists } from "@/utils/artistData";
import {
  MapPin,
  Globe,
  DollarSign,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

export default function Artists() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, artists.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-10">
      {/* Header */}
      <motion.div
        className="container mx-auto px-6 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Featured Artists
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl">
          Discover talented artists from around the world.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative container mx-auto px-6">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `${-currentIndex * (100 / cardsPerView)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl dark:shadow-slate-700/50 dark:hover:shadow-slate-600/50 transition-all duration-300 group bg-white dark:bg-black">
                  <div className="relative overflow-hidden">
                    <motion.img
                      className="w-full h-64 object-cover"
                      src={artist.image}
                      alt={artist.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {artist.name}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                      {artist.bio}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <Badge variant="secondary" className="text-xs">
                          {artist.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{artist.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <Globe className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{artist.language}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600">
                          {artist.feeRange}
                        </span>
                      </div>
                    </div>
                    <Link href={`/artists/${artist.id}`}>
                      <Button className="w-full" variant="default">
                        View Portfolio
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
