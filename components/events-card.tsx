"use client";

import React, { useState, useCallback, useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  date: string;
  slug: string;
  location: string;
  type: string;
}

interface EventsCarouselProps {
  blogs: Blog[];
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      handleSlide("next");
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleSlide = useCallback(
    (direction: "next" | "prev") => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return prevIndex + 1 >= blogs.length ? 0 : prevIndex + 1;
        } else {
          return prevIndex - 1 < 0 ? blogs.length - 1 : prevIndex - 1;
        }
      });
    },
    [blogs.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSlide("prev");
      if (e.key === "ArrowRight") handleSlide("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSlide]);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden py-4 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <MagicCard className="opacity-95 w-full rounded-lg sm:rounded-[20px] transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6">
                <div className="flex-1 text-center sm:text-left">
                  {blogs.length > 0 ? (
                    <>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                        {blogs[currentIndex].title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        {blogs[currentIndex].date}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        {blogs[currentIndex].location}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        {blogs[currentIndex].type}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        {blogs[currentIndex].description}
                      </p>
                      <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200">
                        <Link
                          href={`/events/${blogs[currentIndex].id}`}
                          className="flex items-center gap-2"
                        >
                          View Event
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                        No Events Available
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        Check back later for upcoming events!
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full sm:w-auto flex-shrink-0">
                  {blogs.length > 0 && blogs[currentIndex].image && (
                    <Image
                      src={`${blogs[currentIndex].image}`}
                      alt={blogs[currentIndex].title}
                      width={500}
                      height={500}
                      className="rounded-lg object-cover w-full h-48 sm:h-[500px] sm:w-[500px]"
                    />
                  )}
                </div>
              </div>
            </MagicCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2  rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-white w-4" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => handleSlide("prev")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transform translate-x-1 sm:-translate-x-1/2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110 z-10"
        aria-label="Previous event"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => handleSlide("next")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transform -translate-x-1 sm:translate-x-1/2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110 z-10"
        aria-label="Next event"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default EventsCarousel;
