"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import type { Review } from "@/data/reviews";

function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating ? "text-gold/60 fill-gold/60" : "text-foreground/15"
          }
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative bg-dark-3/40 border border-gold/8 p-6 sm:p-8"
    >
      {/* Frame corners */}
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-gold/20" />
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-gold/20" />
      <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-gold/20" />
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-gold/20" />

      <div className="flex items-center justify-between mb-4">
        <StarRating rating={review.rating} />
        <span className="font-inter text-[10px] text-foreground/20">
          {new Date(review.date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <p className="font-inter text-sm text-foreground/50 leading-relaxed mb-5 italic">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center gap-2">
        <p className="font-cinzel text-sm text-foreground/70">{review.author}</p>
        {review.verified && (
          <BadgeCheck size={14} className="text-gold/50" />
        )}
      </div>
      <p className="font-inter text-[10px] text-foreground/25 mt-0.5">
        {review.location}
      </p>
    </motion.div>
  );
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export default function ProductReviews({
  reviews,
  averageRating,
}: ProductReviewsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (reviews.length === 0) return null;

  return (
    <section ref={ref} className="mt-24 pt-16 border-t border-gold/10">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4"
        >
          Collector&apos;s Verdicts
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-cinzel text-2xl sm:text-3xl font-semibold tracking-[0.05em] text-foreground/90 mb-4"
        >
          Reviews
        </motion.h2>

        {/* Average rating summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <StarRating rating={Math.round(averageRating)} size={16} />
          <span className="font-cinzel text-lg text-gold/70">
            {averageRating.toFixed(1)}
          </span>
          <span className="font-inter text-xs text-foreground/30">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>
    </section>
  );
}
