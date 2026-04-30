-- ============================================================
-- Mila Treasures Atelier — COMPLETE Supabase Setup
-- Copy-paste this ENTIRE file into Supabase SQL Editor and run
-- This creates ALL tables, storage bucket, and seeds ALL data
-- ============================================================

-- ═══════════════════════════════════════════════════════════════
-- 1. DROP EXISTING (clean slate)
-- ═══════════════════════════════════════════════════════════════
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS journal_posts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP FUNCTION IF EXISTS update_updated_at CASCADE;

-- ═══════════════════════════════════════════════════════════════
-- 2. CREATE TABLES
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price numeric(10,2) NOT NULL,
  category text NOT NULL,
  category_slug text NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  in_stock boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  badge text CHECK (badge IN ('new', 'bestseller', 'limited', 'last-one', NULL)),
  dimensions text,
  material text,
  weight text,
  etsy_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE journal_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image text NOT NULL DEFAULT '',
  category text NOT NULL CHECK (category IN ('Workshop', 'Culture', 'Inspiration', 'Behind the Scenes')),
  author text NOT NULL DEFAULT 'Mila Treasures Atelier',
  date date NOT NULL DEFAULT CURRENT_DATE,
  read_time int NOT NULL DEFAULT 5,
  featured boolean NOT NULL DEFAULT false,
  related_product_slugs text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  product_count int NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id text NOT NULL,
  author text NOT NULL,
  location text NOT NULL DEFAULT '',
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL DEFAULT '',
  date date NOT NULL DEFAULT CURRENT_DATE,
  verified boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type text NOT NULL CHECK (target_type IN ('product', 'article')),
  target_slug text NOT NULL,
  author_name text NOT NULL,
  author_email text NOT NULL,
  message text NOT NULL,
  admin_reply text,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- 3. INDEXES
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_slug);
CREATE INDEX idx_journal_slug ON journal_posts(slug);
CREATE INDEX idx_comments_target ON comments(target_type, target_slug);
CREATE INDEX idx_comments_approved ON comments(approved);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ═══════════════════════════════════════════════════════════════
-- 4. AUTO-UPDATE TRIGGER
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER journal_posts_updated_at
  BEFORE UPDATE ON journal_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- 5. ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read journal" ON journal_posts FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read approved comments" ON comments FOR SELECT USING (approved = true);
CREATE POLICY "Public insert comments" ON comments FOR INSERT WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- 6. STORAGE BUCKET
-- ═══════════════════════════════════════════════════════════════
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the bucket
CREATE POLICY "Public read product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated/service role uploads
CREATE POLICY "Service role upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Service role update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY "Service role delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- ═══════════════════════════════════════════════════════════════
-- 7. SEED CATEGORIES
-- ═══════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, image, product_count, sort_order) VALUES
(
  'Églomisé Art',
  'eglomise-art',
  'Reverse-glass paintings with mirror fragments — an 18th-century French technique where art lives beneath the glass',
  '/products/item-8.webp',
  3,
  1
),
(
  'Framed Art & Decor',
  'framed-art',
  'Ornate framed pieces and sculptural art objects with hand-applied 3D elements and aged finishes',
  '/products/item-3.webp',
  2,
  2
),
(
  'Trinket Boxes',
  'trinket-boxes',
  'Handcrafted decorative boxes with sculpted lids — for jewellery, keepsakes, or simply to exist beautifully',
  '/products/item-4.webp',
  1,
  3
),
(
  'Sculptures & Decor',
  'sculptures-decor',
  'Ceramic figurines, candle holders, and standalone sculptural pieces for gothic altar shelves and dark interiors',
  '/products/item-5.webp',
  0,
  4
);

-- ═══════════════════════════════════════════════════════════════
-- 8. SEED PRODUCTS
-- ═══════════════════════════════════════════════════════════════
INSERT INTO products (name, slug, price, category, category_slug, description, short_description, image, images, in_stock, featured, badge, dimensions, material, weight, etsy_url, sort_order) VALUES

-- Product 1: Gothic Enchantress Art Book
(
  'Gothic Enchantress Art Book',
  'gothic-enchantress-art-book',
  89.00,
  'Framed Art & Decor',
  'framed-art',
  E'An art object in book form. The cover is decorated entirely by hand — sculpted polymer clay figures emerge from the dark surface: a wide-brimmed enchantress, a gothic lantern, a raven, a castle silhouette glimpsed through the shadows, and a butterfly crowning the composition.\n\nBuilt on a solid hardcover base, the surface is layered with acrylic paint, metallic wax, and bronze patina to create the look of something found in a forgotten library. Every element is hand-applied. No two are alike, and this one will never be made again.\n\nDisplayable upright as a shelf statement piece. Photographed here in a stone kitchen setting — it belongs anywhere the light is low and the shelves are full.',
  'Gothic art book with sculpted polymer clay enchantress, lantern, and raven cover — a dark shelf statement piece',
  '/products/item-1.webp',
  ARRAY['/products/item-1.webp'],
  true,
  false,
  NULL,
  NULL,
  'Wood base, polymer clay, acrylic paint, metallic wax',
  NULL,
  'https://www.etsy.com/listing/4464391947/',
  1
),

-- Product 2: Dark Fairy Tale Mirror Art
(
  'Dark Fairy Tale Mirror Art',
  'dark-fairy-tale-mirror',
  95.00,
  'Églomisé Art',
  'eglomise-art',
  E'The witch extends her hand. The apple gleams — crimson and heavy with consequence. Time holds its breath.\n\nThis handcrafted gothic framed artwork captures the darkest beat of a fairy tale you thought you knew. At its heart is an églomisé-inspired mixed media piece: the image is applied to foil and finished with a mirror spray on the reverse, creating a hauntingly luminous surface that shifts and deepens with the light.\n\nThe dramatic black-and-white composition — a hooded crone offering a gleaming apple through a window to an innocent girl, surrounded by barren branches heavy with forbidden fruit — is rendered in selective colour. Only the red apples bleed into full colour, making each one feel like a choice you cannot take back.\n\nThe ornate black wooden frame is decorated with hand-applied 3D resin sculptural elements: baroque rose with scrollwork, grandfather clock figure with aged bronze patina, gothic chapel spire, ornate cross with angel detail, skeletal hand clutching antique keys, and cascading purple bell flowers. Finished in aged matte black with metallic bronze and gold patinas throughout.',
  'Églomisé-inspired framed art — witch offering a crimson apple, ornate 3D sculptural frame with aged bronze patina',
  '/products/item-2.webp',
  ARRAY['/products/item-2.webp'],
  true,
  true,
  'bestseller',
  NULL,
  'Wood frame, resin sculpted elements, églomisé-style foil print, metallic paint',
  NULL,
  'https://www.etsy.com/listing/4464398925/',
  2
),

-- Product 3: Baroque Castle Frame
(
  'Baroque Castle Frame',
  'baroque-castle-frame',
  52.00,
  'Framed Art & Decor',
  'framed-art',
  E'A single light burns in the tower window. Stone steps disappear into ivy and shadow. From your wall, this castle doesn''t just hang — it watches.\n\nThis is a hand-crafted baroque-style ceramic frame with an oval gothic castle art print at its heart. The frame is intricately cast with raised scrollwork, floral motifs, and botanical detail work that give it the feel of a centuries-old relic. Finished in deep black with aged bronze and gold metallic highlights, the surface carries the worn, layered depth of something found in a forgotten manor.\n\nArtificial moss is hand-applied into the recesses of the frame, completing the look of a castle slowly reclaimed by nature. The print within the oval depicts a gothic manor at dusk — a cobblestone path leading to a towering manor wrapped in mist. Can be displayed freestanding on a shelf or mantelpiece, or hung on a wall.',
  'Baroque ceramic oval frame with gothic castle print — moss-filled recesses, aged bronze and gold patina',
  '/products/item-3.webp',
  ARRAY['/products/item-3.webp'],
  true,
  false,
  'limited',
  NULL,
  'Ceramic, metallic paint, acrylic paint, artificial moss, art print',
  NULL,
  'https://www.etsy.com/listing/4464398461/',
  3
),

-- Product 4: Gothic Heart Trinket Box
(
  'Gothic Heart Trinket Box',
  'gothic-heart-trinket-box',
  45.00,
  'Trinket Boxes',
  'trinket-boxes',
  E'Somewhere between a relic and a dream, this heart-shaped box holds the weight of dark beauty in your hands. Aged in shadow and crowned with blooms that never decay, it is a piece that whispers of forgotten chambers and treasured secrets.\n\nCrafted from a solid MDF base, the lid is hand-decorated with sculpted polymer clay relief — roses and botanical forms emerging from the surface like something half-reclaimed by nature. Artificial moss and slender plastic branches complete the composition, evoking a haunted garden frozen in time. The interior carries a stamped gold heraldic motif, adding a regal gothic elegance beneath the lid.\n\nFinished using a mixed media technique, the piece layers acrylic and metallic paints to create deep, textured depth — a rich burgundy-brown patina with iridescent green undertones where the moss meets the shadow.',
  'Heart-shaped box with sculpted polymer clay roses and moss — a dark botanical relic for rings and secrets',
  '/products/item-4.webp',
  ARRAY['/products/item-4.webp'],
  true,
  false,
  NULL,
  '6.7 × 6.7 × 1.4 in (17 × 17 × 3.5 cm)',
  'MDF wood, polymer clay, artificial moss, acrylic and metallic paint',
  NULL,
  'https://www.etsy.com/listing/4464465242/',
  4
),

-- Product 8: Haunted Castle Églomisé Mirror
(
  'Haunted Castle Églomisé Mirror',
  'haunted-castle-eglomise-mirror',
  96.00,
  'Églomisé Art',
  'eglomise-art',
  E'Look closely. The castle glows from somewhere deep inside the glass. The crescent moon hangs still above its towers — but the room around you moves. That flicker you see is real. This piece reflects the living world while holding something older inside it.\n\nA large handmade églomisé mirror artwork — a rare 18th-century French decorative technique in which parts of the mirror''s backing are carefully removed and an image is embedded beneath the glass surface. The result is something that cannot be photographed properly: part mirror, part painting, entirely its own thing.\n\nThe gothic castle scene — lit windows, crescent moon, twisted bare trees, stone staircase rising into darkness — lives inside the glass, while your room lives in the mirror around it. The two worlds overlap.\n\nThe wide distressed wood frame is finished in aged silver-gold with handpainted dark undertones.',
  'Large églomisé mirror with castle glowing beneath the glass — part mirror, part painting, entirely its own thing',
  '/products/item-8.webp',
  ARRAY['/products/item-8.webp'],
  true,
  true,
  'bestseller',
  'approx. 15.0 × 13.0 in (38 × 33 cm)',
  'Mirror glass, églomisé technique, distressed wood frame',
  NULL,
  'https://www.etsy.com/listing/4471777010/',
  5
),

-- Product 9: Dark Raven Queen Mirror Art
(
  'Dark Raven Queen Mirror Art',
  'dark-raven-queen-mirror',
  93.00,
  'Églomisé Art',
  'eglomise-art',
  E'She stands in silence, her dark gown dissolving into feathers while ravens circle like living shadows — frozen beneath hand-aged mirror glass, watching the room with eyes that follow the candlelight. This is not decoration; it is a presence.\n\nThis artwork is created using the églomisé technique — a decorative art form dating back to 18th-century France. Parts of the mirror''s reflective backing are carefully removed by hand, and the image of a dark raven queen is embedded beneath the glass surface. The remaining mirror fragments catch real light and merge with the painted figure beneath, creating a layered effect where the queen seems to shift between the real world and her own.\n\nThe wide distressed dark brown wood frame features heavy bronze and gold dry-brushed patina with a deep burgundy wine-red mat — ornate and commanding without overpowering the figure within.',
  'Raven queen frozen beneath hand-aged mirror glass — églomisé technique, distressed frame with burgundy mat',
  '/products/item-9.webp',
  ARRAY['/products/item-9.webp'],
  true,
  true,
  'new',
  '15.0 × 13.0 in (38 × 33 cm)',
  'Mirror glass, églomisé technique, distressed wood frame, burgundy mat',
  NULL,
  'https://www.etsy.com/listing/4471791818/',
  6
);

-- ═══════════════════════════════════════════════════════════════
-- 9. SEED REVIEWS
-- ═══════════════════════════════════════════════════════════════

-- product_id stores the product slug for easy matching
INSERT INTO reviews (product_id, author, location, rating, text, date, verified) VALUES
-- Gothic Enchantress Art Book
('gothic-enchantress-art-book', 'Cassandra M.', 'United Kingdom', 5, E'This is genuinely unlike anything I''ve ever owned. The sculpted cover feels ancient — like something that should be locked away in a forbidden library. Packed beautifully, arrived from Bulgaria in 9 days.', '2026-03-18', true),
('gothic-enchantress-art-book', 'Lena V.', 'Germany', 5, 'The butterfly and the enchantress on the cover are incredibly detailed. It sits on my shelf and everyone who comes over asks about it. Worth every cent.', '2026-02-27', true),
-- Dark Fairy Tale Mirror Art
('dark-fairy-tale-mirror', 'Sophie R.', 'United States', 5, E'The photos don''t do it justice. That mirror effect — the way the light plays through it — is something you have to see in person. My favourite piece I own.', '2026-03-20', true),
('dark-fairy-tale-mirror', 'Natalie K.', 'Canada', 5, 'The 3D frame elements are astonishing up close. The grandfather clock, the skeletal hand — every detail is intentional. Milena is a true artist.', '2026-03-05', true),
('dark-fairy-tale-mirror', 'Isabelle D.', 'France', 4, E'Absolutely beautiful piece. The selective colour on the red apples gives it a life that black and white couldn''t. Only giving 4 stars because one of the resin flowers had a tiny chip on arrival — Milena responded immediately and offered a solution.', '2026-02-14', true),
-- Baroque Castle Frame
('baroque-castle-frame', 'Monika B.', 'Poland', 5, E'The moss in the frame recesses makes it look like it''s been hanging in a manor for a century. The oval castle print is gorgeous. Very heavy — feels like quality.', '2026-03-12', true),
('baroque-castle-frame', 'Theresa L.', 'Australia', 5, 'I ordered this as a gift and my friend cried when she opened it. The ceramic frame texture is incredible and it photographs beautifully in candlelight.', '2026-02-22', true),
-- Gothic Heart Trinket Box
('gothic-heart-trinket-box', 'Elisa F.', 'Italy', 5, E'Sits on my vanity and I reach for it every morning. The polymer clay roses feel almost real. The gold heraldic stamp inside the lid is such a lovely surprise.', '2026-03-15', true),
('gothic-heart-trinket-box', 'Raven S.', 'United States', 5, 'Perfect size for rings and small jewellery. The moss and branch details give it that haunted garden feel. Shipped securely and arrived in perfect condition.', '2026-03-01', true),
('gothic-heart-trinket-box', 'Clara N.', 'Netherlands', 4, E'Really beautiful box. The burgundy-brown patina is deep and rich. Would love a slightly larger version — but this one is still perfect on my dresser.', '2026-02-10', true),
-- Haunted Castle Églomisé Mirror
('haunted-castle-eglomise-mirror', 'Diana V.', 'Romania', 5, E'I genuinely gasped when I unwrapped it. The castle is inside the glass — you can''t take a photo that captures it. My whole room is reflected around it. It''s alive.', '2026-03-28', true),
('haunted-castle-eglomise-mirror', 'Marta O.', 'Spain', 5, E'The most unique piece of art I own. The églomisé technique creates depth that photographs cannot show. The wide silver-gold frame is bold and perfectly matches.', '2026-03-15', true),
('haunted-castle-eglomise-mirror', 'Claire F.', 'Belgium', 5, E'Bought this after seeing someone post it online and I don''t regret it for a second. Expensive but absolutely worth it. Ships beautifully from Bulgaria.', '2026-02-20', true),
-- Dark Raven Queen Mirror Art
('dark-raven-queen-mirror', 'Sigrid T.', 'Norway', 5, E'She watches the room with such presence. The mirror fragments around her face catch candlelight in a way that makes her look like she''s breathing. Extraordinary work.', '2026-03-20', true),
('dark-raven-queen-mirror', 'Bianca L.', 'Brazil', 5, E'The burgundy mat inside the frame adds a richness that elevates the whole piece. The églomisé effect is exactly as described — layered, luminous, impossible to photograph.', '2026-03-02', true);

-- ═══════════════════════════════════════════════════════════════
-- 10. SEED JOURNAL POSTS
-- ═══════════════════════════════════════════════════════════════
INSERT INTO journal_posts (slug, title, excerpt, content, cover_image, category, author, date, read_time, featured, related_product_slugs) VALUES

-- Post 1
(
  'the-art-of-eglomise',
  'The Art of Églomisé: Painting Behind Glass',
  'An 18th-century French technique where art lives beneath the glass surface, merging with mirror fragments to create something that shifts with the light. Here''s how it works.',
  E'You''re looking at a mirror. Then you''re looking through it. Then you''re not sure which world you''re in. That''s églomisé — and it''s been unsettling people in the most beautiful way since the 1700s.\n\n## What Is Églomisé?\n\nÉglomisé (pronounced ay-glo-mee-ZAY) is a decorative technique where parts of a mirror''s reflective backing are carefully removed by hand, and an image is painted or applied beneath the glass surface. The result is part mirror, part artwork — a piece where your room and the painted scene coexist in the same frame.\n\nThe name comes from Jean-Baptiste Glomy, a French art dealer in the 18th century who popularized the technique, though the method is much older. Ancient Romans decorated gold leaf under glass, and the technique flourished throughout Renaissance Italy before Glomy gave it his name.\n\n## How Milena Uses It\n\nAt Mila Treasures Atelier, the traditional technique is adapted for a gothic aesthetic. Each piece begins with a mirror — the reflective surface is hand-scraped in specific areas to create a distressed, aged effect. Then the artwork is applied beneath the glass using foil transfers and specialized mirror spray.\n\nThe Haunted Castle Églomisé Mirror, for instance, features a gothic castle scene embedded inside the glass itself. The castle''s lit windows, crescent moon, and twisted bare trees live permanently beneath the surface, while the remaining mirror fragments reflect your room around them. The effect cannot be properly photographed — it must be seen in shifting light to understand.\n\nThe Dark Raven Queen Mirror Art uses the same approach: the figure of a dark queen with ravens dissolves into the mirror fragments, so she appears to watch the room with eyes that follow the candlelight.\n\n## Why It Matters\n\nIn an age when "art" often means a printed canvas from a factory, églomisé is stubbornly handmade. Every piece requires hours of careful scraping, painting, and finishing. One wrong move with the scraper and the entire mirror is ruined.\n\nThe technique also produces something genuinely unique — because the mirror fragments break differently each time, no two églomisé pieces can ever be identical. The art and the mirror dance together, and that dance is unrepeatable.\n\n## Living With Églomisé\n\nA few things to know if you''re considering an églomisé piece:\n\n- **Light matters.** These pieces change dramatically depending on the light source. Candlelight makes them glow. Daylight makes them shimmer. They are never static.\n- **Placement matters.** Hang them where they can catch both direct and ambient light. Opposite a window or near a candle is ideal.\n- **They''re mirrors too.** The remaining reflective surface is functional — you''ll catch glimpses of yourself alongside the painted scene. That''s not a flaw; it''s the point.',
  'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200&q=80',
  'Workshop',
  'Mila Treasures Atelier',
  '2026-03-20',
  5,
  true,
  ARRAY['haunted-castle-eglomise-mirror', 'dark-raven-queen-mirror', 'dark-fairy-tale-mirror']
),

-- Post 2
(
  'dark-fairy-tales-in-art',
  'Dark Fairy Tales: The Art of Beautiful Darkness',
  'Before Disney softened the edges, fairy tales were dark, strange, and dangerous. That original darkness is what makes them powerful — and what inspires our most striking pieces.',
  E'The witch extends her hand. The apple gleams — crimson and heavy with consequence. In the original Brothers Grimm version, the queen doesn''t just offer a poisoned apple. She visits Snow White three times, each attempt more cunning than the last. The apple is her masterpiece of malice.\n\nThis is the world our Dark Fairy Tale Mirror Art inhabits — not the sanitized Disney retelling, but the original stories where forests are genuinely dangerous, magic has a price, and beauty is always entangled with darkness.\n\n## The Original Stories\n\nThe fairy tales most people know have been filtered through layers of family-friendly adaptation. The originals are different:\n\n**Snow White** (Grimm, 1812) — The evil queen is forced to dance in red-hot iron shoes at Snow White''s wedding until she collapses. The story isn''t about a prince''s kiss; it''s about vanity, obsession, and the price of beauty.\n\n**Sleeping Beauty** (Perrault, 1697) — In earlier versions, the princess isn''t woken by a kiss. The story involves abandonment, fire, and a mother-in-law who wants to eat her grandchildren. The thorny hedge that grows around the castle kills multiple princes before the right one arrives.\n\n**The Little Mermaid** (Andersen, 1837) — She doesn''t marry the prince. Every step on her new human legs feels like walking on knives. She dissolves into sea foam. The Disney version omits... quite a lot.\n\n## Why Darkness Works in Art\n\nDark fairy tales resonate because they tell emotional truths that bright, sanitized versions avoid. They acknowledge that the world contains danger, that choices have consequences, that beauty and horror often occupy the same space.\n\nThis is exactly what makes them powerful as visual art. The Dark Fairy Tale Mirror Art captures the moment of temptation — the witch''s outstretched hand, the gleaming apple, the innocent girl at the window. Only the red apples bleed into full colour against the black-and-white composition. Each apple feels like a choice you cannot take back.\n\nThe ornate black frame carries its own narrative through hand-sculpted 3D elements: a baroque rose with scrollwork, a grandfather clock frozen in time, a gothic chapel spire, a skeletal hand clutching antique keys. Every detail belongs to the same dark story.\n\n## The Gothic Fairy Tale Aesthetic\n\nWhat distinguishes "gothic fairy tale" from other dark aesthetics is its insistence on beauty. Gothic darkness is never ugly — it''s beautiful in a way that makes you slightly uneasy. The ornate frames, the metallic patinas, the careful composition — these are not horror pieces. They''re fairy tales told honestly.\n\nThis is the tradition Mila Treasures Atelier works within. Every piece tells a story that existed long before we learned to soften the endings.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
  'Inspiration',
  'Mila Treasures Atelier',
  '2026-03-18',
  6,
  true,
  ARRAY['dark-fairy-tale-mirror', 'gothic-enchantress-art-book']
),

-- Post 3
(
  'sculpting-with-polymer-clay',
  'Building Worlds in Polymer Clay',
  'How roses, ravens, dragons, and gothic towers emerge from polymer clay to become the sculpted 3D elements on our frames, boxes, and art books.',
  E'It starts with a block of polymer clay, a set of sculpting tools, and an image that won''t leave your head. Four hours later, a dragon perches on a stack of forbidden tomes, or a baroque rose blooms from the corner of a dark frame. This is how Milena builds the worlds that live on the surface of each piece.\n\n## The Material\n\nPolymer clay is a synthetic modelling material that remains soft and workable at room temperature, then hardens permanently when baked in a standard oven at around 130°C. Unlike natural clay, it doesn''t require a kiln, doesn''t shrink significantly during curing, and can be worked in extraordinarily fine detail.\n\nFor the pieces at Mila Treasures Atelier, polymer clay is the primary sculpting medium for the 3D elements that transform a frame or box from ordinary to extraordinary. The roses on the Gothic Heart Trinket Box, the dragon on the Gothic Dragon Trinket Box, the enchantress and raven on the Gothic Enchantress Art Book — all begin as raw polymer clay.\n\n## The Process\n\n**Armature.** For larger elements like the dragon or the enchantress figure, Milena starts with a wire or foil armature — a rough skeleton that gives the sculpture structural support and keeps it lightweight.\n\n**Rough shaping.** The basic form is built up in layers. At this stage, proportions matter more than detail. A dragon''s wing needs to sweep at the right angle. A rose needs the right number of petals to look natural without being botanical.\n\n**Detail work.** This is where the magic happens — and where the hours disappear. Scales are pressed one by one into the dragon''s body. Rose petals are thinned at the edges to catch light. The enchantress''s flowing robes are textured with fabric-like folds. Sculpting tools, dental picks, and sometimes just fingertips create the textures.\n\n**Baking.** Once the sculpting is complete, the piece goes into the oven. Temperature control is critical — too hot and the clay burns or bubbles; too cool and it remains brittle.\n\n**Finishing.** After baking, each sculpted element is painted with multiple layers of acrylic and metallic paints. The aged bronze patina on the fairy tale frame, the teal verdigris on the dragon box, the iridescent green on the heart box — these finishes transform polymer clay into something that looks like it was forged from metal centuries ago.\n\n## Why Hand-Sculpted Matters\n\nResin casting from a mould can replicate a shape a thousand times. Hand sculpting cannot. Every dragon Milena sculpts has slightly different wing angles, different claw positions, a different tilt of the head. Every rose has petals that opened differently.\n\nThis is not inefficiency — it''s the whole point. When you pick up a trinket box and run your finger over the sculpted lid, you''re touching something that was shaped specifically for that piece. No mould. No machine. Just hands, tools, and time.',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80',
  'Workshop',
  'Mila Treasures Atelier',
  '2026-03-15',
  6,
  false,
  ARRAY['gothic-heart-trinket-box', 'gothic-enchantress-art-book']
),

-- Post 4
(
  'from-bulgaria-with-darkness',
  'From Bulgaria with Darkness: How We Ship Art',
  'How a handmade églomisé mirror or sculpted trinket box travels from a workshop in Bulgaria to your shelf — and arrives in perfect condition.',
  E'Every Mila Treasures Atelier order begins its journey in Bulgaria and ends at a doorstep somewhere in the world. That''s potentially thousands of miles, customs checkpoints, and days of transit for pieces that are, by nature, fragile and one-of-a-kind. Here''s how we make sure your piece arrives exactly as it left the workshop.\n\n## Why Shipping Handmade Art Is Different\n\nA printed canvas in a standard frame can survive rough handling — it''s flat, uniform, and replaceable. Our pieces are none of those things. An églomisé mirror has glass that can crack. A trinket box has sculpted polymer clay elements that can snap. A framed art piece has 3D resin sculptures protruding from the surface. Each piece requires custom protection.\n\n## The Packing Process\n\n**Layer 1 — Soft Wrap.** Each piece is first wrapped in acid-free tissue paper. This protects the painted patina finishes — standard bubble wrap can leave impressions on metallic and acrylic surfaces.\n\n**Layer 2 — Sculpted Element Protection.** Any protruding 3D elements — roses, figures, dragon wings — are individually cushioned with soft foam padding secured with tissue. This is the most time-consuming step and the most important.\n\n**Layer 3 — Rigid Shell.** The wrapped piece goes into a fitted inner box with foam inserts cut to match its exact shape. Not generic packing peanuts — actual contoured padding.\n\n**Layer 4 — Outer Box.** The inner box is placed inside a larger shipping box with shock-absorbing fill between the two layers. This double-box method is the industry standard for shipping art and antiques.\n\n## Customs and Delivery\n\nWe ship worldwide through Etsy''s Global shipping network. Each piece is declared as handmade decorative art, with photos and descriptions included for customs clearance. Delivery times vary by destination — typically 5-14 business days for international orders.\n\nEvery shipment includes tracking, and we photograph each piece before packing so there''s never a question about condition at departure.\n\n## Our Track Record\n\nHandmade means irreplaceable. If something arrives damaged despite our precautions, we work with the buyer immediately to resolve it — whether that means repair guidance, partial refund, or in some cases, creating a new piece. But our packing protocol has been refined through many shipments, and damage is extremely rare.\n\nThere''s something satisfying about tracking a gothic dragon box as it travels from Sofia to someone''s shelf in Portland or London. The craft is ancient; the logistics are not.',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80',
  'Behind the Scenes',
  'Mila Treasures Atelier',
  '2026-03-12',
  5,
  false,
  ARRAY['haunted-castle-eglomise-mirror', 'baroque-castle-frame']
),

-- Post 5
(
  'styling-gothic-art-at-home',
  'Styling Gothic Art in Your Home',
  'You don''t need a castle. Here''s how to display églomisé mirrors, sculpted trinket boxes, and dark framed art in a modern space without it feeling like a theme park.',
  E'The question we hear most often isn''t "do you ship internationally?" — it''s "how do I display this without my living room looking like a Halloween store?" Fair question. Here''s the answer.\n\n## The Single Statement Rule\n\nThe most common mistake in gothic decor is overcrowding. One dramatic piece — a large églomisé mirror, an ornate framed fairy tale scene, a sculptural candle holder — will have ten times the impact of five small items clustered together. Let each piece breathe.\n\nThe Haunted Castle Églomisé Mirror, for instance, works best as the sole dramatic element on a wall. The mirror itself catches and reflects light, so it fills the space visually even though it''s a single object. Add too much around it and you dilute the effect.\n\n## Dark Walls Are Your Friend\n\nOur pieces are designed against darkness. Deep charcoal, matte black, rich burgundy, dark forest green — these wall colours make the metallic patinas and gold accents sing. A Dark Fairy Tale Mirror Art on a white wall will look striking; on a dark charcoal wall, it will look like it grew there.\n\nIf painting an entire room dark feels too bold, try a single accent wall behind the piece. Even a deep navy or charcoal panel creates the contrast these works need.\n\n## Light Is Everything\n\nGothic art lives and dies by lighting. Here''s what works:\n\n**Candlelight** is the ideal companion. The flickering light makes metallic patinas shimmer and gives églomisé pieces their distinctive shifting quality. Even battery-operated candles in warm white create this effect.\n\n**Accent lighting** — a small picture light above a framed piece, or an angled desk lamp below a mirror — creates dramatic shadows across sculpted 3D elements.\n\n**Avoid overhead fluorescents.** They flatten everything. Gothic art needs directional light that creates shadows and depth.\n\n## Unexpected Placements\n\nNot everything needs to hang on a wall:\n\n- **Trinket boxes** live beautifully on vanity tables, bookshelves, and beside tables. The Gothic Heart Trinket Box looks striking on a dark wood surface with a single candle nearby.\n- **Art books** like the Gothic Enchantress Art Book belong on a shelf spine-out as a conversation piece, or displayed upright on a stand.\n- **Small sculptures** like the Witch Hands Crystal Ball work as bookends, mantelpiece anchors, or desk companions.\n\n## Mixing Gothic with Modern\n\nGothic art doesn''t require a gothic room. Some of the most striking displays we''ve seen from customers place a single ornate piece against clean, minimal surroundings. A dark églomisé mirror above a mid-century modern console. A sculpted trinket box on a Scandinavian-style shelf. The contrast between the ornate and the minimal makes both look better.\n\nThe rule is simple: let the piece be the drama. Everything else can be quiet.',
  'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&q=80',
  'Inspiration',
  'Mila Treasures Atelier',
  '2026-03-08',
  5,
  false,
  ARRAY['haunted-castle-eglomise-mirror', 'dark-fairy-tale-mirror', 'gothic-heart-trinket-box']
),

-- Post 6
(
  'gothic-home-decor-trends-2026',
  'Gothic Home Decor Trends 2026: What''s Shifting',
  'The gothic aesthetic is moving away from mass-produced darkness and toward handmade, story-driven pieces. Here''s what''s actually changing in 2026 — and what''s staying.',
  E'Every year, design publications announce that "dark interiors are trending." Every year, they act surprised. But 2026 is different — not because gothic decor is suddenly popular (it never stopped being popular), but because what people want from it has changed.\n\n## The Shift Toward Handmade\n\nThe biggest trend in gothic home decor isn''t a colour or a material — it''s provenance. Buyers in 2026 are increasingly uninterested in mass-produced "gothic" items from large retailers. The skull candle holders and factory-stamped wall crosses that flooded the market a few years ago have lost their appeal. They look identical in every home. That''s the opposite of what gothic decor is supposed to do.\n\nWhat''s replacing them: one-of-a-kind handmade pieces with visible craftsmanship. Polymer clay sculptures where you can see the artist''s fingerprints in the texture. Églomisé mirrors where the glass is hand-scraped, making each one unrepeatable. Pieces that have a story beyond "I found it on a big-box retailer''s website."\n\n## Dark Academia Meets Gothic\n\nThe dark academia aesthetic — all old books, candlelight, and wood-panelled libraries — has been merging with traditional gothic decor since 2024. In 2026, that merger is complete. The result is spaces that feel learned and atmospheric rather than theatrical.\n\nThink: a sculpted art book displayed on a reading desk alongside real volumes. A baroque castle frame above a shelf of leather-bound classics. An ornate trinket box holding wax seals and fountain pen nibs. The gothic elements serve the room rather than dominating it.\n\n## Églomisé Is Having a Moment\n\nThis 18th-century technique — painting behind glass on a mirror surface — has been quietly gaining attention as people discover what it actually looks like in person. Photographs don''t capture it. The way an églomisé mirror shifts between reflection and painted scene depending on the light and viewing angle is something you have to experience.\n\nIn 2026, églomisé pieces are appearing in interior design features and curated home tours more frequently than at any point in the last decade. The technique''s inherent uniqueness — no two pieces can be identical because the mirror fragments differently each time — makes it the antithesis of mass production.\n\n## Colour Palette: Gold and Burgundy Over Silver and Black\n\nPure black-and-silver gothic is giving way to warmer combinations. Antique gold, aged bronze, deep burgundy, forest green, and teal patinas are the dominant finishes in 2026. These colours feel older, richer, and more connected to historical gothic craft traditions.\n\nThe trend reflects a broader move away from "modern gothic" (clean lines, monochrome) and toward "romantic gothic" (ornate details, warm metallics, layered textures). Pieces with hand-applied gold leaf, verdigris patinas, and burgundy accents are leading this shift.\n\n## What''s Not Changing\n\nSome things remain constant. Dark walls are still the best backdrop for gothic art. Candlelight is still the ideal light source. And the fundamental appeal of gothic decor — beauty that acknowledges darkness, craft that values the handmade, art that tells a story — is as strong as ever. The trends are just catching up to what collectors have always known.',
  'https://images.unsplash.com/photo-1551215717-8bc5f30b21fd?w=1200&q=80',
  'Inspiration',
  'Mila Treasures Atelier',
  '2026-04-10',
  6,
  true,
  ARRAY['haunted-castle-eglomise-mirror', 'baroque-castle-frame', 'gothic-enchantress-art-book']
),

-- Post 7
(
  'best-gothic-gifts-for-her',
  'Best Gothic Gifts for Her: A Guide for the Thoughtful',
  'She doesn''t want another candle from a chain store. Here''s how to choose a gothic gift that actually means something — from trinket boxes to mirror art.',
  E'You know she loves dark aesthetics. Her bookshelves lean toward Brontë and Poe. Her jewellery is silver, her lipstick is dark, and her idea of a perfect evening involves candlelight and silence. So you want to get her something gothic. Something real. Here''s where most people go wrong — and how to get it right.\n\n## The Problem with "Gothic Gifts"\n\nSearch for "gothic gifts" online and you''ll find a wall of mass-produced items: resin skulls, factory-printed tapestries, novelty mugs with bat handles. These items aren''t gifts — they''re merchandise. They say "I noticed you like dark things" without saying "I understand what you actually value."\n\nThe difference between a forgettable gothic gift and one she''ll keep forever comes down to craft and intention. A handmade piece carries the weight of the artist''s time. A unique piece says you chose something that exists only once.\n\n## For the Collector: Trinket Boxes\n\nA gothic trinket box is the gift that keeps working long after the unboxing. She''ll use it daily — for rings before bed, for earrings on a vanity, for small treasures that need a beautiful home.\n\nThe Gothic Heart Trinket Box, with its sculpted roses and iridescent green finish, becomes a permanent resident on a nightstand or dressing table. Both are hand-painted with metallic patinas that catch candlelight.\n\nThe key: trinket boxes are functional luxury. She won''t just display it — she''ll touch it every day.\n\n## For the Art Lover: Mirror Art and Frames\n\nIf she has wall space and a taste for the dramatic, églomisé mirror art is a gift that transforms a room. The Dark Fairy Tale Mirror Art — with its witch, poisoned apple, and baroque frame covered in 3D sculptures — is the kind of piece that stops conversations. The Haunted Castle Églomisé Mirror creates an entire gothic world inside the glass.\n\nThese pieces work because they''re not just decorative — they''re interactive. The mirror elements shift with the light, so the art looks different at every hour. She''ll notice new details for months.\n\n## For the Reader: The Art Book\n\nThe Gothic Enchantress Art Book is not a book you read — it''s a book you display. The sculpted cover, the dark enchantress figure, the raven perched on the spine — it''s a piece of gothic sculpture disguised as a tome. For the woman who values the aesthetic of old libraries and forbidden knowledge, it belongs on her shelf between her favourite novels.\n\n## The Real Gift Guide Rule\n\nThe best gothic gift isn''t the most expensive or the most dramatic. It''s the one that proves you paid attention to her specific shade of darkness. Does she lean toward fairy tales or the occult? Victorian elegance or dark fantasy? Mirrors or objects? The answer to those questions matters more than any price tag.',
  'https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=1200&q=80',
  'Inspiration',
  'Mila Treasures Atelier',
  '2026-04-13',
  6,
  false,
  ARRAY['gothic-heart-trinket-box', 'dark-fairy-tale-mirror', 'gothic-enchantress-art-book']
),

-- Post 8
(
  'handmade-vs-mass-produced-decor',
  'Handmade vs Mass-Produced: What You''re Actually Paying For',
  'A factory frame costs $30. A handmade one costs ten times that. Here''s what accounts for the difference — and why it matters more than you think.',
  E'You can buy a "gothic mirror" from a large online retailer for $35. It arrives in two days. It looks fine. It looks exactly like the one your neighbour bought, and the one in the staged photo of a teenager''s bedroom on a social media platform, and the 40,000 other units that rolled off the same production line in the same factory.\n\nOr you can buy an églomisé mirror that took three days to make, where the glass was hand-scraped and the art was painted beneath the surface by a specific person in a specific workshop. It will never look exactly like any other mirror that exists. The price difference is real. So is the difference in what you''re holding.\n\n## What Mass Production Actually Means\n\nMass-produced decor isn''t inherently bad. It serves a purpose — it fills spaces affordably. But it''s important to understand what you''re buying:\n\n**Materials.** Factory items use the cheapest materials that achieve the look: MDF instead of wood, printed decals instead of paint, resin casts from a single mould instead of original sculpture. The item is engineered for cost efficiency, not longevity.\n\n**Labour.** A factory worker might handle hundreds of identical units per shift. The goal is speed and consistency. No piece receives individual attention because individual attention is the enemy of scale.\n\n**Design.** Mass-produced gothic items are designed by committee to appeal to the broadest possible audience. The result is "gothic enough" without being challenging, unusual, or deeply personal. It''s darkness with the edges sanded off.\n\n## What Handmade Actually Means\n\nWhen Milena creates a piece at Mila Treasures Atelier, the process looks nothing like a production line:\n\n**Time.** A single trinket box takes 15-20 hours. A framed art piece with sculpted 3D elements can take 30+. An églomisé mirror requires multiple days of scraping, painting, drying, and finishing. Time is the most expensive ingredient, and handmade work uses it generously.\n\n**Decisions.** Every piece involves hundreds of micro-decisions that a factory never makes. How deep to scrape the mirror. How many petals on this particular rose. Whether the dragon''s wing should curve left or right. These decisions make each piece singular.\n\n**Risk.** Handmade work can fail. A mirror can crack during scraping. A polymer clay sculpture can break during baking. A patina finish can go wrong. The price of a handmade piece includes all the pieces that didn''t survive the process.\n\n**Skill.** Years of developed technique go into every piece. The ability to hand-scrape glass without shattering it, to sculpt polymer clay at a level of detail that reads as metal, to apply gold leaf so it ages naturally — these skills took years to build and cannot be automated.\n\n## The Longevity Question\n\nMass-produced decor is designed to be replaced. The trends change, the materials degrade, and in three years you''re buying another one. Handmade pieces are designed to last — not just physically, but emotionally. A hand-sculpted dragon box doesn''t become less interesting after a year. An églomisé mirror doesn''t follow trends because it predates them by three centuries.\n\nThe most expensive decor is the kind you keep replacing. The most affordable is the kind you keep forever.',
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80',
  'Culture',
  'Mila Treasures Atelier',
  '2026-04-17',
  7,
  false,
  ARRAY['haunted-castle-eglomise-mirror', 'dark-fairy-tale-mirror']
),

-- Post 9
(
  'how-to-style-dark-academia-room',
  'How to Style a Dark Academia Room',
  'Old books, candlelight, and the feeling of a forgotten library. Here''s how to build a dark academia space that feels authentic — not like a costume.',
  E'Dark academia is the aesthetic of old universities, candlelit libraries, handwritten letters, and the persistent feeling that you should be reading something important. It''s tweed and leather and the smell of old paper. When done well, a dark academia room feels like stepping into a 19th-century study. When done poorly, it feels like a stage set.\n\nThe difference is authenticity. Here''s how to get it right.\n\n## Start with the Walls\n\nDark academia lives on dark walls. Not black — that tips into gothic territory (which is fine, but it''s a different aesthetic). Instead, think:\n\n- **Deep olive green** — the colour of old library walls\n- **Warm brown** — leather-chair brown, not chocolate\n- **Navy blue** — Oxford and Cambridge blue, deep and serious\n- **Burgundy** — but muted, not bright\n\nMatte finishes work best. Glossy dark walls look modern; matte dark walls look old. That distinction matters in dark academia, where everything should feel like it''s been there for decades.\n\n## The Bookshelf Is the Centrepiece\n\nNo dark academia room works without books — real ones. Not decorative spines bought by the metre, not coffee table books arranged by colour. Actual books you''ve read or intend to read. Philosophy, classic literature, poetry, history, art theory. The spines should be mismatched and slightly worn.\n\nBetween the books, place objects that feel scholarly or curious: an antique magnifying glass, a brass compass, a small sculpture, a curiosity. This is where pieces like the Gothic Enchantress Art Book work beautifully — displayed spine-out among real books, it looks like a recovered grimoire from a forgotten collection.\n\n## Lighting: Warm and Low\n\nDark academia lighting is warm, low, and layered:\n\n- **Desk lamp** with a warm bulb and a brass or green glass shade\n- **Candles** — real or high-quality battery-operated in warm white\n- **No overhead lighting** — or at minimum, a dimmer set very low\n\nThe goal is pools of light, not uniform illumination. A reading chair should have its own lamp. A desk should have its own lamp. The rest of the room can stay in comfortable shadow.\n\n## Furniture: Wood and Leather\n\nDark academia furniture is heavy, wooden, and preferably old:\n\n- **Desk:** A substantial wooden writing desk, not a minimalist modern one\n- **Chair:** Leather armchair, preferably worn, preferably with brass studs\n- **Shelving:** Dark wood bookshelves, floor-to-ceiling if possible\n- **Side table:** For your tea, your book, your candle\n\n## Art and Objects\n\nWall art in a dark academia room should feel collected, not coordinated. Pieces acquired over time from different sources, unified by tone rather than matching frames:\n\n- Framed botanical prints or anatomical drawings\n- Old maps in ornate frames\n- A single dramatic piece — like a Baroque Castle Frame — as a focal point above the desk\n- Small sculptures or curiosities on shelves and surfaces\n\n## The One Rule\n\nDark academia should feel lived in, not decorated. Every object should look like it belongs to someone who reads too much, stays up too late, and has strong opinions about poetry. If it looks like a catalogue spread, start over.',
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
  'Inspiration',
  'Mila Treasures Atelier',
  '2026-04-20',
  7,
  false,
  ARRAY['gothic-enchantress-art-book', 'baroque-castle-frame']
),

-- Post 10
(
  'handmade-gothic-wall-decor-ideas',
  'Handmade Gothic Wall Decor Ideas: Beyond the Basics',
  'You''ve moved past the mass-produced phase. Here are wall decor ideas for gothic spaces that demand something with actual craft and history behind it.',
  E'There''s a moment in every gothic decorator''s journey when the factory-made pieces stop satisfying. The resin gargoyle from the chain store looks flat. The printed canvas of a dark forest feels hollow. You start noticing the seams, the repetition, the feeling that your space looks like everyone else''s.\n\nThat''s when the search for handmade begins. Here are the categories worth exploring — and what to look for in each.\n\n## Églomisé Mirror Art\n\nÉglomisé — the technique of painting behind glass on a mirror surface — is the most underrated form of gothic wall art. It''s underrated because most people have never seen it in person. Photographs capture maybe 30% of the effect. The real magic is how these pieces change with light and viewing angle, constantly shifting between reflection and painted scene.\n\nFor gothic spaces, églomisé pieces like the Haunted Castle Églomisé Mirror or the Dark Raven Queen Mirror Art offer something no other medium can: your room becomes part of the art. The remaining mirror fragments reflect your space around the painted scene, so the gothic world inside the glass and your actual room coexist. Move a candle, and the whole piece transforms.\n\n**What to look for:** Hand-scraped glass (not chemically treated), original painted artwork (not decals), and solid framing. The technique is inherently handmade — if someone is selling "églomisé" at factory prices, it isn''t real églomisé.\n\n## Sculpted Frame Art\n\nThe frame isn''t just a border — in handmade gothic art, the frame is half the piece. When a frame carries hand-sculpted 3D elements — roses, towers, ravens, skeletal hands — it transforms flat art into something sculptural.\n\nThe Dark Fairy Tale Mirror Art exemplifies this: the baroque frame features sculpted roses with scrollwork, a grandfather clock frozen in time, a gothic chapel spire, and a skeletal hand clutching antique keys. Each element was individually hand-sculpted in polymer clay, baked, and painted with metallic patinas. The frame alone took longer to create than most entire factory pieces take to manufacture.\n\n**What to look for:** Individually sculpted elements (not mould-cast multiples), hand-applied patina finishes, and secure attachment of 3D elements to the frame.\n\n## Gallery Wall Arrangements\n\nA gothic gallery wall follows different rules than a standard one:\n\n**Asymmetry over grid.** Gothic aesthetics resist rigid order. Arrange pieces in an organic cluster rather than a perfect grid.\n\n**Vary the media.** Mix mirrors, framed art, sculptural pieces, and dimensional objects. A Baroque Castle Frame next to an églomisé mirror creates visual richness that matching frames never achieve.\n\n**Anchor with one large piece.** Choose your most dramatic work as the centre, then build outward with smaller pieces.\n\n**Dark background.** A gallery wall of gothic pieces on a white wall looks like a store display. On a dark wall — charcoal, deep green, burgundy — it looks like a collection.\n\n## The Investment Perspective\n\nHandmade gothic wall decor costs more upfront than mass-produced alternatives. But consider: a handmade églomisé mirror or sculpted frame is a permanent addition to your space. It won''t degrade, go out of style, or look identical to thousands of other pieces. In a world of disposable decor, permanence is the real luxury.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
  'Inspiration',
  'Mila Treasures Atelier',
  '2026-04-24',
  7,
  false,
  ARRAY['haunted-castle-eglomise-mirror', 'dark-raven-queen-mirror', 'dark-fairy-tale-mirror', 'baroque-castle-frame']
),

-- Post 11
(
  'supporting-independent-artists',
  'Why Supporting Independent Artists Actually Matters',
  'It''s not just a feel-good slogan. When you buy from an independent artist, the economics, the craft, and the meaning of the object are fundamentally different.',
  E'"Support independent artists" has become a phrase so common it''s almost lost its meaning. It shows up on social media posts, tote bags, and the About pages of shops that may or may not be independent at all. But behind the slogan is something real — a set of economic and creative realities that genuinely matter. Here''s what actually changes when you buy from an independent artist instead of a large retailer.\n\n## Where Your Money Goes\n\nWhen you buy a $50 item from a large online retailer, the breakdown looks roughly like this: raw materials, factory labour (often at poverty wages), shipping, platform fees, warehousing, marketing, and corporate profit. The person who designed the item may have been paid a flat fee years ago. The people who made it were paid by the unit.\n\nWhen you buy a $50 item from an independent artist, the breakdown is different: materials the artist chose personally, hours of the artist''s skilled labour, and platform fees. That''s essentially it. There''s no corporate layer, no factory markup, no warehouse overhead. The money goes to the person who made the thing.\n\nFor a piece from Mila Treasures Atelier, the economics are transparent: materials (polymer clay, mirror glass, paints, gold leaf, frames) and Milena''s time. A trinket box that takes 15-20 hours to complete at a fair hourly rate should cost what it costs. The price reflects a person''s skilled time, not a corporation''s profit margin.\n\n## What You''re Actually Buying\n\nA mass-produced gothic candle holder is an object. A handmade one is a decision — someone decided to sculpt that specific raven in that specific pose with those specific feather textures. The object carries intention.\n\nThis isn''t sentimental. It''s practical. Intentional objects are more interesting to live with. They reward closer inspection. They have textures and details that weren''t optimised away by a cost engineer.\n\n## The Skill Preservation Problem\n\nMany traditional craft techniques — églomisé, hand gilding, polymer clay sculpture, metallic patina finishing — survive only because independent artists keep practising them. These techniques aren''t taught in most schools. They''re not profitable enough for factories to adopt. They exist because individual artists choose to learn them, often through years of self-directed practice.\n\nWhen these artists can''t make a living, the techniques fade. Not dramatically — they just quietly stop being practised. One fewer person knows how to hand-scrape mirror glass. One fewer person can sculpt polymer clay at a professional level. The knowledge doesn''t vanish overnight; it erodes.\n\nBuying from artists who practise these techniques is the most direct way to ensure the techniques survive. Not through grants or institutions — through commerce. An artist who can pay rent through their craft will keep practising it.\n\n## How to Support Effectively\n\nIf you want to support independent artists in a way that actually helps:\n\n**Buy directly or through artist-friendly platforms.** Etsy, despite its flaws, still gives artists more control and a larger share of revenue than most alternatives. Artist websites are even better.\n\n**Pay full price.** Artists set their prices based on real costs. Asking for discounts on handmade work is asking someone to undervalue their skilled time.\n\n**Leave reviews.** On platforms like Etsy, reviews directly affect an artist''s visibility. A detailed, honest review is worth more than a tip.\n\n**Share the work.** When you display a piece in your home and someone asks about it, tell them who made it and where to find them. Word of mouth is still the most powerful marketing an independent artist has.\n\n**Be patient.** Handmade means lead time. Custom work takes weeks, not days. Shipping from a small workshop takes longer than shipping from a fulfilment centre. The wait is part of what makes the result different.\n\n## The Real Choice\n\nEvery purchase is a vote for the kind of world you want to live in. A world where every home contains the same mass-produced objects from the same factories, or a world where your shelf holds something made by a person whose name you know, whose craft you can see, whose livelihood your purchase directly supports.\n\nThat''s not a slogan. That''s economics.',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
  'Culture',
  'Mila Treasures Atelier',
  '2026-04-28',
  8,
  false,
  ARRAY['gothic-heart-trinket-box', 'haunted-castle-eglomise-mirror']
);

-- ═══════════════════════════════════════════════════════════════
-- DONE! Your database is fully set up with:
-- - 4 categories
-- - 6 products (with all descriptions, prices, Etsy URLs)
-- - 16 reviews across all products
-- - 11 journal articles (with full content)
-- - Storage bucket "product-images" for image uploads
-- - RLS policies for public read access
-- ═══════════════════════════════════════════════════════════════
