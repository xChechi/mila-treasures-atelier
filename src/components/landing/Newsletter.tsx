"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function WaxSealButton({ onClick, submitted }: { onClick: () => void; submitted: boolean }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="group relative"
      disabled={submitted}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" className="drop-shadow-xl transition-transform duration-300 group-hover:scale-110">
        <circle cx="32" cy="32" r="30" fill="#6b1020" />
        <circle cx="32" cy="32" r="28" fill="#8B0000" className="group-hover:fill-[#9B1010] transition-colors duration-300" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="0.5" />
        {/* Arrow/Send icon */}
        {!submitted ? (
          <path d="M24,32 L40,32 M35,27 L40,32 L35,37" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M24,32 L29,37 L40,26" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {/* Decorative dots */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const cx = 32 + 26 * Math.cos(angle);
          const cy = 32 + 26 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="0.6" fill="rgba(201,168,76,0.2)" />;
        })}
      </svg>
    </button>
  );
}

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-burgundy/4 rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-xl mx-auto px-6">
        {/* Gothic invitation frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Ornate outer border */}
          <div className="absolute -inset-4 border border-gold/10" />
          <div className="absolute -inset-4">
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold/30" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-gold/30" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-gold/30" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold/30" />
          </div>

          {/* Inner card — parchment/invitation style */}
          <div className="relative bg-gradient-to-b from-[#151210] via-[#12100d] to-[#0f0d0a] border border-gold/8 p-8 sm:p-12 text-center">
            {/* Aged texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }} />

            {/* Top ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <svg width="60" height="30" viewBox="0 0 60 30" className="text-gold/25">
                <path d="M0,15 Q15,0 30,15 Q45,30 60,15" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M0,15 Q15,30 30,15 Q45,0 60,15" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="30" cy="15" r="2" fill="currentColor" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="font-playfair text-sm italic text-[#c4b896]/40 mb-3"
            >
              You are cordially invited to
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="font-cinzel text-2xl sm:text-3xl font-semibold tracking-[0.05em] text-foreground/85 mb-3"
            >
              Join the Dark Side
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="font-inter text-sm text-foreground/30 mb-10 max-w-sm mx-auto leading-relaxed"
            >
              Receive word of new arrivals, exclusive pieces, and the tales
              behind our handcrafted gothic treasures.
            </motion.p>

            {/* Email form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              onSubmit={handleSubmit}
              className="flex items-center gap-4 max-w-md mx-auto"
            >
              {!submitted ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-5 py-3 bg-transparent border-b border-gold/15 focus:border-gold/40 text-foreground/70 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300 text-center"
                  />
                  <WaxSealButton onClick={() => {}} submitted={false} />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-4 text-center"
                >
                  <p className="font-cinzel text-lg text-gold-light/80 mb-1">
                    The seal is set
                  </p>
                  <p className="font-inter text-sm text-foreground/30">
                    Welcome to the shadows. You&apos;ll hear from us soon.
                  </p>
                </motion.div>
              )}
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="font-inter text-[10px] text-foreground/15 mt-6"
            >
              No spam. Only darkness and beauty.
            </motion.p>

            {/* Bottom ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="flex justify-center mt-8"
            >
              <svg width="60" height="30" viewBox="0 0 60 30" className="text-gold/20 rotate-180">
                <path d="M0,15 Q15,0 30,15 Q45,30 60,15" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M0,15 Q15,30 30,15 Q45,0 60,15" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="30" cy="15" r="2" fill="currentColor" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
