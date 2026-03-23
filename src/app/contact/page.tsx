"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Clock, MapPin, ChevronDown, CheckCircle, Send } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const subjects = [
  "General Inquiry",
  "Order Question",
  "Custom Order Request",
  "Shipping & Returns",
  "Wholesale Inquiry",
];

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping from Bulgaria to the USA takes 10–18 business days. Express shipping is available for 5–8 business days. All orders include tracking and insurance.",
  },
  {
    question: "Do you accept custom orders?",
    answer:
      "Yes! We work with our artisans to create custom pieces based on your vision. Contact us with your idea and we'll provide a quote and timeline. Custom orders typically take 4–6 weeks.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 14-day return window from the delivery date. Items must be unused and in original packaging. Return shipping is the buyer's responsibility. Refunds are processed within 5 business days.",
  },
  {
    question: "Are the products really one-of-a-kind?",
    answer:
      "Absolutely. Every piece is handcrafted individually — no molds, no mass production. Even if we create something similar, no two pieces are ever identical. Once a piece sells, it's gone forever.",
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const inputClass =
  "w-full px-4 py-3 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300";
const errorInputClass =
  "w-full px-4 py-3 bg-dark-3/50 border border-burgundy/50 focus:border-burgundy text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300";
const labelClass = "block font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="border-b border-gold/8"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-cinzel text-sm sm:text-base text-foreground/70 group-hover:text-foreground/90 transition-colors pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gold/40 shrink-0"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-inter text-sm text-foreground/35 leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.subject) errs.subject = "Please select a subject";
    if (!form.message.trim()) errs.message = "Message is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="relative gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-6xl mx-auto">
        <PageHeader
          title="Get in Touch"
          subtitle="Contact Us"
          description="Questions about a piece, shipping, or custom orders? We'd love to hear from you."
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 max-w-lg mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={64} className="mx-auto text-gold/60 mb-8" />
              </motion.div>
              <h2 className="font-cinzel text-3xl font-semibold text-foreground/90 mb-4">
                Message Sent
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
              <p className="font-inter text-sm text-foreground/40 mb-2">
                Thank you for reaching out. We typically respond within 24–48 hours.
              </p>
              <p className="font-inter text-xs text-foreground/20 mb-8">
                This is a demo — no message was actually sent.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
                className="inline-block px-8 py-3 border border-gold/20 hover:border-gold/40 text-gold-light/60 hover:text-gold-light font-inter text-sm tracking-[0.15em] uppercase transition-all duration-300"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-2"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={errors.name ? errorInputClass : inputClass}
                        />
                        {errors.name && (
                          <p className="font-inter text-xs text-burgundy-light mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Email</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={errors.email ? errorInputClass : inputClass}
                        />
                        {errors.email && (
                          <p className="font-inter text-xs text-burgundy-light mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        className={`${errors.subject ? errorInputClass : inputClass} cursor-pointer appearance-none`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                        }}
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="font-inter text-xs text-burgundy-light mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea
                        placeholder="Tell us what's on your mind..."
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={6}
                        className={`${errors.message ? errorInputClass : inputClass} resize-none`}
                      />
                      {errors.message && (
                        <p className="font-inter text-xs text-burgundy-light mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-12 py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                      <Send size={14} />
                      Send Message
                    </button>

                    <p className="font-inter text-[10px] text-foreground/20 tracking-wider">
                      This is a demo — no message will be sent
                    </p>
                  </form>
                </motion.div>

                {/* Info sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="lg:col-span-1"
                >
                  <div className="relative bg-dark-3/30 border border-gold/10 p-6 space-y-6">
                    {/* Frame corners */}
                    <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-2 border-l-2 border-gold/25" />
                    <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-2 border-r-2 border-gold/25" />
                    <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-2 border-l-2 border-gold/25" />
                    <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-2 border-r-2 border-gold/25" />

                    <h3 className="font-cinzel text-base text-foreground/80">Contact Info</h3>

                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <Mail size={16} className="text-gold/40 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-inter text-xs text-foreground/25 tracking-wider uppercase mb-1">
                            Email
                          </p>
                          <p className="font-inter text-sm text-foreground/60">
                            hello@gothictreasures.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock size={16} className="text-gold/40 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-inter text-xs text-foreground/25 tracking-wider uppercase mb-1">
                            Response Time
                          </p>
                          <p className="font-inter text-sm text-foreground/60">
                            Within 24–48 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-gold/40 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-inter text-xs text-foreground/25 tracking-wider uppercase mb-1">
                            Workshop
                          </p>
                          <p className="font-inter text-sm text-foreground/60">
                            Sofia, Bulgaria
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gold/8">
                      <p className="font-inter text-xs text-foreground/25 leading-relaxed">
                        For order-related inquiries, please include your order number in
                        the message for faster assistance.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* FAQ Section */}
              <div className="mt-24 lg:mt-32 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
                    Common Questions
                  </p>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-semibold text-foreground/90 mb-6">
                    FAQ
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
                  </div>
                </div>

                <div>
                  {faqs.map((faq, i) => (
                    <FAQItem key={faq.question} {...faq} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
