"use client";

function parseDimensions(dims: string): { height: number; width: number } | null {
  // Parse formats like '24" H x 14" W x 2" D' or '14" H x 6" W x 5" D (each)'
  const hMatch = dims.match(/([\d.]+)"\s*H/i);
  const wMatch = dims.match(/([\d.]+)"\s*W/i);
  if (!hMatch || !wMatch) return null;
  return { height: parseFloat(hMatch[1]), width: parseFloat(wMatch[1]) };
}

interface SizeReferenceProps {
  dimensions: string;
}

export default function SizeReference({ dimensions }: SizeReferenceProps) {
  const parsed = parseDimensions(dimensions);
  if (!parsed) return null;

  // Scale: 1 inch = 2.5px, max wall height ~80px (32 inches)
  const scale = 2.5;
  const wallHeight = 80;
  const wallWidth = 120;
  const prodH = Math.min(parsed.height * scale, wallHeight - 8);
  const prodW = Math.min(parsed.width * scale, wallWidth - 8);

  return (
    <div className="mt-6 p-4 bg-dark-3/20 border border-gold/8">
      <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/25 mb-3">
        Size on Wall
      </p>
      <div className="flex items-end gap-4">
        {/* Wall visualization */}
        <div
          className="relative border border-foreground/8 bg-dark-3/30 flex items-center justify-center"
          style={{ width: wallWidth, height: wallHeight }}
        >
          {/* Product rectangle */}
          <div
            className="border border-gold/40 bg-gold/5"
            style={{ width: prodW, height: prodH }}
          />
          {/* Wall texture lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/10" />
        </div>

        {/* Labels */}
        <div className="space-y-1">
          <p className="font-inter text-xs text-foreground/40">
            {parsed.height}&quot; tall
          </p>
          <p className="font-inter text-xs text-foreground/40">
            {parsed.width}&quot; wide
          </p>
        </div>
      </div>
    </div>
  );
}
