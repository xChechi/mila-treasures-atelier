"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-dark-2 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-1/50 via-transparent to-dark-1/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy/5 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-inter text-xs tracking-[0.5em] uppercase text-gold/50 mb-4"
        >
          Stay Connected
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cinzel text-3xl sm:text-4xl font-semibold tracking-[0.05em] text-foreground/90 mb-4"
        >
          Join the Dark Side
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-inter text-sm text-foreground/40 mb-10 max-w-md mx-auto"
        >
          Be the first to discover new arrivals, exclusive pieces, and the
          stories behind our handcrafted gothic treasures.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          {!submitted ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3.5 bg-dark-1/60 border border-foreground/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/25 outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full py-4 text-center"
            >
              <p className="font-cinzel text-lg text-gold-light mb-1">
                Welcome to the shadows
              </p>
              <p className="font-inter text-sm text-foreground/40">
                You&apos;ll hear from us soon.
              </p>
            </motion.div>
          )}
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-inter text-[11px] text-foreground/20 mt-4"
        >
          No spam. Only darkness and beauty.
        </motion.p>
      </div>
    </section>
  );
}
