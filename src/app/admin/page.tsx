import AdminShell from "./AdminShell";
import { Package, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

const cards = [
  { href: "/admin/products", label: "Products", desc: "Add, edit, and manage your product catalog", icon: Package },
  { href: "/admin/articles", label: "Journal Articles", desc: "Write and publish blog posts", icon: FileText },
  { href: "/admin/comments", label: "Comments", desc: "Review, approve, and reply to comments", icon: MessageSquare },
];

export default function AdminDashboard() {
  return (
    <AdminShell>
      <div className="max-w-4xl">
        <h2 className="font-cinzel text-2xl text-foreground/90 mb-2">Dashboard</h2>
        <p className="font-inter text-sm text-foreground/30 mb-10">
          Welcome back, Milena. What would you like to work on?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group border border-gold/10 hover:border-gold/25 bg-dark-3/30 p-6 transition-colors"
            >
              <card.icon size={24} className="text-gold/40 group-hover:text-gold/70 mb-4 transition-colors" />
              <h3 className="font-cinzel text-base text-foreground/80 mb-1">{card.label}</h3>
              <p className="font-inter text-xs text-foreground/25">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
