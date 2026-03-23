export default function ProductLoading() {
  return (
    <div className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 w-14 bg-dark-4/40 animate-pulse rounded" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image skeleton */}
          <div className="relative bg-dark-3/50 border border-gold/10">
            <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-2 border-l-2 border-gold/20" />
            <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-2 border-r-2 border-gold/20" />
            <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-2 border-l-2 border-gold/20" />
            <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-2 border-r-2 border-gold/20" />
            <div className="aspect-[3/4] bg-dark-3/80 animate-pulse" />
          </div>

          {/* Info skeleton */}
          <div className="space-y-5">
            <div className="h-2.5 w-24 bg-dark-4/40 animate-pulse rounded" />
            <div className="h-8 w-3/4 bg-dark-4/50 animate-pulse rounded" />
            <div className="h-7 w-28 bg-dark-4/50 animate-pulse rounded" />
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gold/10" />
              <div className="w-1 h-1 rotate-45 bg-gold/15" />
              <div className="flex-1 h-px bg-gold/10" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-full bg-dark-4/30 animate-pulse rounded" />
              <div className="h-3 w-full bg-dark-4/30 animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-dark-4/30 animate-pulse rounded" />
            </div>
            <div className="space-y-3 mt-8">
              <div className="h-4 w-48 bg-dark-4/40 animate-pulse rounded" />
              <div className="h-4 w-52 bg-dark-4/40 animate-pulse rounded" />
              <div className="h-4 w-36 bg-dark-4/40 animate-pulse rounded" />
            </div>
            <div className="h-14 w-full bg-dark-4/50 animate-pulse rounded mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
