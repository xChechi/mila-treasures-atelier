import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

export default function StatsCard({ title, value, icon: Icon, subtitle }: StatsCardProps) {
  return (
    <div className="relative bg-dark-3/30 border border-gold/8 p-5">
      <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t border-l border-gold/20" />
      <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t border-r border-gold/20" />
      <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b border-l border-gold/20" />
      <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b border-r border-gold/20" />

      <div className="flex items-start justify-between">
        <div>
          <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">
            {title}
          </p>
          <p className="font-cinzel text-2xl text-foreground/90">{value}</p>
          {subtitle && (
            <p className="font-inter text-xs text-foreground/25 mt-1">{subtitle}</p>
          )}
        </div>
        <Icon size={20} className="text-gold/25" strokeWidth={1.5} />
      </div>
    </div>
  );
}
