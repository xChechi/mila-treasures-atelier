import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen gothic-bg flex items-center justify-center px-6">
      <div className="relative text-center max-w-lg">
        {/* 404 number */}
        <p className="font-cinzel text-[8rem] sm:text-[10rem] font-bold leading-none text-gold/8 select-none">
          404
        </p>

        {/* Content overlaid on the number */}
        <div className="-mt-16 relative z-10">
          <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
            Lost in the Shadows
          </p>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-6">
            Page Not Found
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>

          <p className="font-inter text-sm text-foreground/35 mb-10 leading-relaxed">
            The page you seek has vanished into darkness.<br />
            Perhaps it was never meant to be found.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Return Home
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3 border border-gold/20 hover:border-gold/40 text-gold-light/80 hover:text-gold-light font-inter text-sm tracking-[0.15em] uppercase transition-all duration-300"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
