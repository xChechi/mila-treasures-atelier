export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-inter text-xs tracking-[0.5em] uppercase text-gold/50 mb-4">
          Product Detail
        </p>
        <h1 className="font-cinzel text-4xl font-semibold text-foreground/90 mb-4">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="font-inter text-foreground/40">
          Coming soon — full product detail page with gallery.
        </p>
      </div>
    </div>
  );
}
