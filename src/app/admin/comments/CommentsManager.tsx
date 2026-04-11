"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle, XCircle, Trash2, Send, Loader2, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  target_type: string;
  target_slug: string;
  author_name: string;
  author_email: string;
  message: string;
  admin_reply: string | null;
  approved: boolean;
  created_at: string;
}

export default function CommentsManager() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/comments");
    if (res.ok) setComments(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const handleApprove = async (id: string, approved: boolean) => {
    setSaving(true);
    await fetch("/api/admin/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    fetchComments();
    setSaving(false);
  };

  const handleReply = async (id: string) => {
    if (!replyText.trim()) return;
    setSaving(true);
    await fetch("/api/admin/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, admin_reply: replyText, approved: true }),
    });
    setReplyingTo(null);
    setReplyText("");
    fetchComments();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;
    await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchComments();
  };

  const filtered = comments.filter((c) => {
    if (filter === "pending") return !c.approved;
    if (filter === "approved") return c.approved;
    return true;
  });

  const pendingCount = comments.filter((c) => !c.approved).length;

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-foreground/30">
        <Loader2 size={16} className="animate-spin" /> Loading comments...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-cinzel text-xl text-foreground/90">Comments</h2>
          <p className="font-inter text-sm text-foreground/30">
            {comments.length} total · {pendingCount} pending review
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 font-inter text-xs uppercase tracking-wider border transition-colors ${
              filter === f
                ? "border-gold/30 bg-gold/10 text-gold/70"
                : "border-gold/8 text-foreground/30 hover:text-foreground/50"
            }`}
          >
            {f} {f === "pending" && pendingCount > 0 && `(${pendingCount})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare size={32} className="mx-auto text-foreground/10 mb-3" />
          <p className="font-inter text-sm text-foreground/20">No comments to show</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className={`p-4 border bg-dark-3/20 ${
                c.approved ? "border-gold/8" : "border-amber-500/20 bg-amber-500/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-inter text-sm text-foreground/70 font-medium">{c.author_name}</span>
                    <span className="font-inter text-[10px] text-foreground/20">{c.author_email}</span>
                  </div>
                  <p className="font-inter text-xs text-foreground/20 mb-2">
                    on {c.target_type}: {c.target_slug} · {new Date(c.created_at).toLocaleDateString()}
                  </p>
                  <p className="font-inter text-sm text-foreground/50 leading-relaxed">{c.message}</p>

                  {c.admin_reply && (
                    <div className="mt-3 pl-3 border-l-2 border-gold/20">
                      <p className="font-inter text-xs text-gold/40 mb-1">Your reply:</p>
                      <p className="font-inter text-sm text-foreground/40">{c.admin_reply}</p>
                    </div>
                  )}

                  {replyingTo === c.id && (
                    <div className="mt-3 flex gap-2">
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        autoFocus
                        className="flex-1 px-3 py-2 bg-[#111] border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handleReply(c.id)}
                      />
                      <button
                        onClick={() => handleReply(c.id)}
                        disabled={saving}
                        className="px-3 py-2 bg-burgundy hover:bg-burgundy-light text-white text-sm transition-colors"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 shrink-0">
                  {!c.approved && (
                    <button
                      onClick={() => handleApprove(c.id, true)}
                      className="p-2 text-foreground/25 hover:text-green-400 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                  {c.approved && (
                    <button
                      onClick={() => handleApprove(c.id, false)}
                      className="p-2 text-foreground/25 hover:text-amber-400 transition-colors"
                      title="Unapprove"
                    >
                      <XCircle size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setReplyingTo(replyingTo === c.id ? null : c.id);
                      setReplyText(c.admin_reply || "");
                    }}
                    className="p-2 text-foreground/25 hover:text-gold/70 transition-colors"
                    title="Reply"
                  >
                    <MessageSquare size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 text-foreground/25 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
