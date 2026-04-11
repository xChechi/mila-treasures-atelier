"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, FileText, MessageSquare, LogOut, Home } from "lucide-react";

const nav = [
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setError("Wrong password");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    router.push("/admin");
  };

  // Loading state
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gold/30 border-t-gold/80 rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="font-cinzel text-2xl text-foreground/90 mb-2">Mila Admin</h1>
            <p className="font-inter text-sm text-foreground/30">Enter password to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none"
          />
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-burgundy hover:bg-burgundy-light disabled:opacity-50 text-white font-inter text-sm tracking-[0.1em] uppercase transition-colors"
          >
            {loading ? "..." : "Log In"}
          </button>
        </form>
      </div>
    );
  }

  // Authenticated layout
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0d0d0d] border-r border-gold/8 flex flex-col">
        <div className="p-5 border-b border-gold/8">
          <h1 className="font-cinzel text-base text-foreground/80">Mila Admin</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-inter transition-colors ${
                  active
                    ? "bg-gold/10 text-gold-light"
                    : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gold/8 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-inter text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            <Home size={16} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-inter text-foreground/30 hover:text-red-400 transition-colors w-full text-left"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
