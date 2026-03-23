function SkeletonCard() {
  return (
    <div className="relative bg-dark-3/50 border border-gold/10">
      <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-gold/20" />
      <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-gold/20" />
      <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-gold/20" />
      <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-gold/20" />

      <div className="aspect-[3/4] bg-dark-3/80 animate-pulse" />
      <div className="p-5 border-t border-gold/10 space-y-3">
        <div className="h-2 w-16 bg-dark-4/60 animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-dark-4/60 animate-pulse rounded" />
        <div className="h-3 w-full bg-dark-4/40 animate-pulse rounded" />
        <div className="h-5 w-20 bg-dark-4/60 animate-pulse rounded" />
      </div>
    </div>
  );
}

export default function ShopLoading() {
  return (
    <div className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-3 w-20 bg-dark-4/40 animate-pulse rounded mx-auto mb-4" />
          <div className="h-10 w-64 bg-dark-4/50 animate-pulse rounded mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold/10" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/15" />
            <div className="w-16 h-px bg-gold/10" />
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="mb-12 space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-dark-3/50 animate-pulse rounded" />
            <div className="w-44 h-12 bg-dark-3/50 animate-pulse rounded" />
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-28 bg-dark-3/50 animate-pulse rounded" />
            ))}
          </div>
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
