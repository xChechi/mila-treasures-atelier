"use client";

import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  author_name: string;
  message: string;
  admin_reply: string | null;
  created_at: string;
}

interface CommentSectionProps {
  targetType: "product" | "article";
  targetSlug: string;
}

const inputClass =
  "w-full px-4 py-3 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300";

export default function CommentSection({ targetType, targetSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?type=${targetType}&slug=${targetSlug}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch {
      // silently fail — comments are not critical
    } finally {
      setLoading(false);
    }
  }, [targetType, targetSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_type: targetType,
          target_slug: targetSlug,
          author_name: name,
          author_email: email,
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-10 border-t border-gold/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare size={18} className="text-gold/40" />
        <h3 className="font-cinzel text-xl text-foreground/85">
          Comments
        </h3>
        {comments.length > 0 && (
          <span className="font-inter text-xs text-foreground/25">
            ({comments.length})
          </span>
        )}
      </div>

      {/* Existing comments */}
      {loading ? (
        <div className="flex items-center gap-2 text-foreground/20 mb-10">
          <Loader2 size={14} className="animate-spin" />
          <span className="font-inter text-xs">Loading comments...</span>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6 mb-12">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l-2 border-gold/10 pl-5"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-cinzel text-sm text-foreground/70">
                  {comment.author_name}
                </span>
                <span className="font-inter text-[10px] text-foreground/15">
                  {new Date(comment.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="font-inter text-sm text-foreground/45 leading-relaxed">
                {comment.message}
              </p>

              {/* Admin reply */}
              {comment.admin_reply && (
                <div className="mt-3 ml-4 pl-4 border-l border-burgundy/20">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-burgundy/20 flex items-center justify-center">
                      <span className="font-cinzel text-[8px] text-gold/60">M</span>
                    </div>
                    <span className="font-cinzel text-xs text-gold/50">
                      Mila Treasures Atelier
                    </span>
                  </div>
                  <p className="font-inter text-sm text-foreground/40 leading-relaxed">
                    {comment.admin_reply}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="font-inter text-sm text-foreground/20 mb-10">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}

      {/* Comment form */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 border border-gold/10 bg-dark-3/20"
          >
            <CheckCircle size={32} className="mx-auto text-gold/50 mb-3" />
            <p className="font-cinzel text-base text-foreground/70 mb-1">
              Thank you
            </p>
            <p className="font-inter text-xs text-foreground/25">
              Your comment has been submitted and will appear after review.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 font-inter text-xs text-gold/40 hover:text-gold/70 underline underline-offset-4 transition-colors"
            >
              Write another comment
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/20 mb-2">
              Leave a comment
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className={inputClass}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (not displayed)"
                required
                className={inputClass}
              />
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts..."
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />

            {error && (
              <p className="font-inter text-xs text-burgundy-light">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <p className="font-inter text-[10px] text-foreground/15">
                Comments are reviewed before publishing.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light disabled:opacity-50 text-white font-inter text-sm tracking-[0.1em] uppercase flex items-center gap-2 transition-colors"
              >
                <Send size={12} />
                {submitting ? "Sending..." : "Post Comment"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
