"use client";

import { Database, CreditCard, Mail, MapPin, Globe } from "lucide-react";

const storeInfo = [
  { icon: Globe, label: "Store Name", value: "Gothic Treasures" },
  { icon: Mail, label: "Contact Email", value: "hello@gothictreasures.com" },
  { icon: MapPin, label: "Workshop", value: "Sofia, Bulgaria" },
  { icon: MapPin, label: "Ships To", value: "United States" },
];

export default function AdminSettings() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-semibold text-foreground/90">Settings</h1>
        <p className="font-inter text-xs text-foreground/30 mt-1">Store configuration</p>
      </div>

      {/* Store Info */}
      <div className="mb-10">
        <h2 className="font-cinzel text-base text-foreground/70 mb-4">Store Information</h2>
        <div className="bg-dark-3/20 border border-gold/8 divide-y divide-gold/5">
          {storeInfo.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-5 py-4">
              <item.icon size={16} className="text-gold/30 shrink-0" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/25">
                  {item.label}
                </p>
                <p className="font-inter text-sm text-foreground/60 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h2 className="font-cinzel text-base text-foreground/70 mb-4">Integrations</h2>
        <div className="space-y-4">
          <div className="bg-dark-3/20 border border-gold/8 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Database size={20} className="text-gold/25" strokeWidth={1.5} />
              <div>
                <p className="font-inter text-sm text-foreground/60">Supabase</p>
                <p className="font-inter text-[10px] text-foreground/25">Database, Auth, Storage</p>
              </div>
            </div>
            <button
              disabled
              className="px-4 py-2 border border-gold/10 text-foreground/20 font-inter text-xs tracking-[0.1em] uppercase cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>

          <div className="bg-dark-3/20 border border-gold/8 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CreditCard size={20} className="text-gold/25" strokeWidth={1.5} />
              <div>
                <p className="font-inter text-sm text-foreground/60">Stripe</p>
                <p className="font-inter text-[10px] text-foreground/25">Payment Processing</p>
              </div>
            </div>
            <button
              disabled
              className="px-4 py-2 border border-gold/10 text-foreground/20 font-inter text-xs tracking-[0.1em] uppercase cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
