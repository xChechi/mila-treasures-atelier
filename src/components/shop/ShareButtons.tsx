"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  productName: string;
  productUrl: string;
  productImage: string;
  productDescription: string;
}

function PinterestIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width="16"
      height="16"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export default function ShareButtons({
  productName,
  productUrl,
  productImage,
  productDescription,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://gothictreasures.com${productUrl}`;

  const handlePinterest = () => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&media=${encodeURIComponent(productImage)}&description=${encodeURIComponent(`${productName} — ${productDescription}`)}`;
    window.open(url, "_blank", "width=750,height=600");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription,
          url: fullUrl,
        });
      } catch {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/20 mr-1">
        Share
      </span>

      {/* Pinterest Pin It */}
      <button
        onClick={handlePinterest}
        aria-label="Pin on Pinterest"
        className="p-2 text-foreground/25 hover:text-[#E60023] transition-colors duration-300"
        title="Pin It"
      >
        <PinterestIcon />
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="p-2 text-foreground/25 hover:text-gold-light transition-colors duration-300"
        title="Copy link"
      >
        {copied ? <Check size={16} className="text-gold/60" /> : <Link2 size={16} />}
      </button>

      {/* Native Share (mobile) */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          aria-label="Share"
          className="p-2 text-foreground/25 hover:text-gold-light transition-colors duration-300"
          title="Share"
        >
          <Share2 size={16} />
        </button>
      )}
    </div>
  );
}
