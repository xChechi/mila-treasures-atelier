-- ============================================================
-- Seed data — migrates existing static products & articles
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Categories
INSERT INTO categories (name, slug, description, image, product_count, sort_order) VALUES
('Églomisé Art', 'eglomise-art', 'Reverse-glass paintings with mirror fragments — an 18th-century French technique where art lives beneath the glass', '/products/item-8.webp', 4, 1),
('Framed Art & Decor', 'framed-art', 'Ornate framed pieces and sculptural art objects with hand-applied 3D elements and aged finishes', '/products/item-3.webp', 2, 2),
('Trinket Boxes', 'trinket-boxes', 'Handcrafted decorative boxes with sculpted lids — for jewellery, keepsakes, or simply to exist beautifully', '/products/item-4.webp', 2, 3),
('Sculptures & Decor', 'sculptures-decor', 'Ceramic figurines, candle holders, and standalone sculptural pieces for gothic altar shelves and dark interiors', '/products/item-5.webp', 2, 4);

-- Products
INSERT INTO products (name, slug, price, category, category_slug, description, short_description, image, images, in_stock, featured, badge, dimensions, material, weight, etsy_url, sort_order) VALUES
('Dark Fairy Tale Mirror Art', 'dark-fairy-tale-mirror', 95, 'Églomisé Art', 'eglomise-art',
 E'The witch extends her hand. The apple gleams — crimson and heavy with consequence. Time holds its breath.\n\nThis handcrafted gothic framed artwork captures the darkest beat of a fairy tale you thought you knew. At its heart is an églomisé-inspired mixed media piece: the image is applied to foil and finished with a mirror spray on the reverse, creating a hauntingly luminous surface that shifts and deepens with the light.\n\nThe dramatic black-and-white composition — a hooded crone offering a gleaming apple through a window to an innocent girl, surrounded by barren branches heavy with forbidden fruit — is rendered in selective colour. Only the red apples bleed into full colour, making each one feel like a choice you cannot take back.\n\nThe ornate black wooden frame is decorated with hand-applied 3D resin sculptural elements: baroque rose with scrollwork, grandfather clock figure with aged bronze patina, gothic chapel spire, ornate cross with angel detail, skeletal hand clutching antique keys, and cascading purple bell flowers. Finished in aged matte black with metallic bronze and gold patinas throughout.',
 'Églomisé-inspired framed art — witch offering a crimson apple, ornate 3D sculptural frame with aged bronze patina',
 '/products/item-2.webp', ARRAY['/products/item-2.webp'], true, true, 'bestseller', NULL,
 'Wood frame, resin sculpted elements, églomisé-style foil print, metallic paint', NULL,
 'https://www.etsy.com/listing/4464398925/', 1),

('Gothic Gold Leaf Wall Art', 'gothic-gold-leaf-wall-art', 35, 'Églomisé Art', 'eglomise-art',
 E'She stands at the edge of the world — silhouetted against a burning moon, bats circling overhead, darkness alive around her. Sealed behind genuine gold leaf, she glows from within. This piece does not hang on a wall. It haunts it.\n\nA handmade gothic framed artwork created using the historic 18th-century églomisé technique — one of the most striking and labour-intensive methods in decorative art. Genuine gold leaf is applied behind the print on foil, creating the luminous amber glow that radiates from the piece like a candle held behind glass. No filter, no trick — that warmth is real.\n\nThe ornate baroque frame is hand-finished with 3D resin sculptures: a weeping angel on the upper left, a death queen figure surrounded by skulls on the lower left, blooming roses at the base. Finished in aged verdigris green-bronze with gold dry-brushing throughout.',
 'Woman silhouette against a burning moon — genuine gold leaf églomisé art in an ornate verdigris baroque frame',
 '/products/item-7.webp', ARRAY['/products/item-7.webp'], true, true, 'new',
 'approx. 10.2 × 8.3 in (26 × 21 cm)',
 'Genuine gold leaf, resin sculpted elements, acrylic paint, wood frame', NULL,
 'https://www.etsy.com/shop/MilaTreasuresAtelier', 2),

('Haunted Castle Églomisé Mirror', 'haunted-castle-eglomise-mirror', 96, 'Églomisé Art', 'eglomise-art',
 E'Look closely. The castle glows from somewhere deep inside the glass. The crescent moon hangs still above its towers — but the room around you moves. That flicker you see is real. This piece reflects the living world while holding something older inside it.\n\nA large handmade églomisé mirror artwork — a rare 18th-century French decorative technique in which parts of the mirror''s backing are carefully removed and an image is embedded beneath the glass surface. The result is something that cannot be photographed properly: part mirror, part painting, entirely its own thing.\n\nThe gothic castle scene — lit windows, crescent moon, twisted bare trees, stone staircase rising into darkness — lives inside the glass, while your room lives in the mirror around it. The two worlds overlap.\n\nThe wide distressed wood frame is finished in aged silver-gold with handpainted dark undertones.',
 'Large églomisé mirror with castle glowing beneath the glass — part mirror, part painting, entirely its own thing',
 '/products/item-8.webp', ARRAY['/products/item-8.webp'], true, true, 'bestseller',
 'approx. 15.0 × 13.0 in (38 × 33 cm)',
 'Mirror glass, églomisé technique, distressed wood frame', NULL,
 'https://www.etsy.com/listing/4471777010/', 3),

('Dark Raven Queen Mirror Art', 'dark-raven-queen-mirror', 93, 'Églomisé Art', 'eglomise-art',
 E'She stands in silence, her dark gown dissolving into feathers while ravens circle like living shadows — frozen beneath hand-aged mirror glass, watching the room with eyes that follow the candlelight. This is not decoration; it is a presence.\n\nThis artwork is created using the églomisé technique — a decorative art form dating back to 18th-century France. Parts of the mirror''s reflective backing are carefully removed by hand, and the image of a dark raven queen is embedded beneath the glass surface. The remaining mirror fragments catch real light and merge with the painted figure beneath, creating a layered effect where the queen seems to shift between the real world and her own.\n\nThe wide distressed dark brown wood frame features heavy bronze and gold dry-brushed patina with a deep burgundy wine-red mat — ornate and commanding without overpowering the figure within.',
 'Raven queen frozen beneath hand-aged mirror glass — églomisé technique, distressed frame with burgundy mat',
 '/products/item-9.webp', ARRAY['/products/item-9.webp'], true, true, 'new',
 '15.0 × 13.0 in (38 × 33 cm)',
 'Mirror glass, églomisé technique, distressed wood frame, burgundy mat', NULL,
 'https://www.etsy.com/listing/4471791818/', 4),

('Gothic Enchantress Art Book', 'gothic-enchantress-art-book', 65, 'Framed Art & Decor', 'framed-art',
 E'An art object in book form. The cover is decorated entirely by hand — sculpted polymer clay figures emerge from the dark surface: a wide-brimmed enchantress, a gothic lantern, a raven, a castle silhouette glimpsed through the shadows, and a butterfly crowning the composition.\n\nBuilt on a solid hardcover base, the surface is layered with acrylic paint, metallic wax, and bronze patina to create the look of something found in a forgotten library. Every element is hand-applied. No two are alike, and this one will never be made again.\n\nDisplayable upright as a shelf statement piece. Photographed here in a stone kitchen setting — it belongs anywhere the light is low and the shelves are full.',
 'Gothic art book with sculpted polymer clay enchantress, lantern, and raven cover — a dark shelf statement piece',
 '/products/item-1.webp', ARRAY['/products/item-1.webp'], true, false, NULL, NULL,
 'Wood base, polymer clay, acrylic paint, metallic wax', NULL,
 'https://www.etsy.com/listing/4464391947/', 5),

('Baroque Castle Frame', 'baroque-castle-frame', 86, 'Framed Art & Decor', 'framed-art',
 E'A single light burns in the tower window. Stone steps disappear into ivy and shadow. From your wall, this castle doesn''t just hang — it watches.\n\nThis is a hand-crafted baroque-style ceramic frame with an oval gothic castle art print at its heart. The frame is intricately cast with raised scrollwork, floral motifs, and botanical detail work that give it the feel of a centuries-old relic. Finished in deep black with aged bronze and gold metallic highlights, the surface carries the worn, layered depth of something found in a forgotten manor.\n\nArtificial moss is hand-applied into the recesses of the frame, completing the look of a castle slowly reclaimed by nature. The print within the oval depicts a gothic manor at dusk — a cobblestone path leading to a towering manor wrapped in mist. Can be displayed freestanding on a shelf or mantelpiece, or hung on a wall.',
 'Baroque ceramic oval frame with gothic castle print — moss-filled recesses, aged bronze and gold patina',
 '/products/item-3.webp', ARRAY['/products/item-3.webp'], true, false, 'limited', NULL,
 'Ceramic, metallic paint, acrylic paint, artificial moss, art print', NULL,
 'https://www.etsy.com/listing/4464398461/', 6),

('Gothic Heart Trinket Box', 'gothic-heart-trinket-box', 40, 'Trinket Boxes', 'trinket-boxes',
 E'Somewhere between a relic and a dream, this heart-shaped box holds the weight of dark beauty in your hands. Aged in shadow and crowned with blooms that never decay, it is a piece that whispers of forgotten chambers and treasured secrets.\n\nCrafted from a solid MDF base, the lid is hand-decorated with sculpted polymer clay relief — roses and botanical forms emerging from the surface like something half-reclaimed by nature. Artificial moss and slender plastic branches complete the composition, evoking a haunted garden frozen in time. The interior carries a stamped gold heraldic motif, adding a regal gothic elegance beneath the lid.\n\nFinished using a mixed media technique, the piece layers acrylic and metallic paints to create deep, textured depth — a rich burgundy-brown patina with iridescent green undertones where the moss meets the shadow.',
 'Heart-shaped box with sculpted polymer clay roses and moss — a dark botanical relic for rings and secrets',
 '/products/item-4.webp', ARRAY['/products/item-4.webp'], true, false, NULL,
 '6.7 × 6.7 × 1.4 in (17 × 17 × 3.5 cm)',
 'MDF wood, polymer clay, artificial moss, acrylic and metallic paint', NULL,
 'https://www.etsy.com/listing/4464465242/', 7),

('Gothic Dragon Trinket Box', 'gothic-dragon-trinket-box', 27, 'Trinket Boxes', 'trinket-boxes',
 E'A dragon stirs atop a stack of forbidden tomes, claws wrapped around a glowing orb, scales catching the last light of a dying fire. This is not just a box — it''s a fragment of a dragon''s hoard, frozen in time.\n\nHandmade gothic decorative box featuring a sculpted dragon perched on stacked ancient books, clutching a pearl orb. The dragon has intricately detailed spread wings, textured scales, and a commanding presence that anchors the entire piece.\n\nBuilt on a solid wood base with sculpted resin and polymer clay elements, finished with multiple layers of acrylic paint, metallic wax, and hand-applied teal verdigris patina. The crackle finish on the body reveals warm golden undertones beneath a dark brown surface — every crack and aged detail is deliberate. Four ornate claw-and-scroll feet elevate the box from the surface it rests on.',
 'Dragon perched on forbidden tomes clutching a pearl orb — teal verdigris patina, crackle finish, ornate claw feet',
 '/products/item-10.webp', ARRAY['/products/item-10.webp'], true, false, 'new',
 'approx. 6.1 × 4.9 in (15.5 × 12.5 cm)',
 'Wood, resin, polymer clay, acrylic paint, metallic wax, teal verdigris patina', NULL,
 'https://www.etsy.com/shop/MilaTreasuresAtelier', 8),

('Gothic Raven Candle Holder', 'gothic-raven-candle-holder', 64, 'Sculptures & Decor', 'sculptures-decor',
 E'Where shadow and moss reclaim what candlelight once held — this gothic raven candle holder rises from the dark like a forgotten altar, watching over your space with hollow, knowing eyes.\n\nHandcrafted on a solid wood base, this striking piece is decorated on three sides with richly detailed gothic prints: a dark sorceress surrounded by ravens, a moonlit haunted castle bathed in deep purple light, and a crescent-moon gothic tower shrouded in mist. The fourth side is draped in lush artificial moss cascading to the base, adorned with dried purple blooms, bare wire branches, and delicate cobwebs.\n\nCrowning the piece is a hand-sculpted ceramic raven designed to hold a candle — fully removable to accommodate a taper or cocktail candle in the hollow below. Place a candle inside and watch the printed panels come alive.',
 'Gothic wood candle tower with ceramic raven crown — three printed panels, moss cascade, dried purple blooms',
 '/products/item-5.webp', ARRAY['/products/item-5.webp'], true, false, NULL,
 '11.8 × 4.7 × 4.7 in (30 × 12 × 12 cm)',
 'Solid wood, ceramic raven, art prints, artificial moss, dried flowers', NULL,
 'https://www.etsy.com/shop/MilaTreasuresAtelier', 9),

('Witch Hands Crystal Ball Sculpture', 'witch-hands-crystal-ball', 24, 'Sculptures & Decor', 'sculptures-decor',
 E'Two skeletal, clawed hands rise from the shadows — each finger arched with quiet menace, crimson-tipped nails catching the light — cradling a smooth orb as if stolen from some forgotten ritual. This is not decoration. This is presence.\n\nA handmade ceramic figurine of two witch hands gripping a crystal ball orb, mounted on an ornate pedestal base adorned with skull motifs, coiling serpents, and baroque scrollwork. Finished in deep matte black with hand-applied metallic gold and bronze accents and dark red gem details.\n\nEvery surface has been painted by hand using high-quality, non-toxic Dora metallic paints — the kind that give a rich, lustrous sheen without looking cheap or plasticky.',
 'Ceramic witch hands cradling a crystal ball — skull pedestal base, matte black with gold and bronze patina',
 '/products/item-6.webp', ARRAY['/products/item-6.webp'], true, false, NULL,
 'approx. 4.3 × 3.5 in (11 × 9 cm)',
 'Ceramic casting, hand-painted with non-toxic metallic paints', NULL,
 'https://www.etsy.com/shop/MilaTreasuresAtelier', 10);

-- Journal posts (all 11 articles)
INSERT INTO journal_posts (slug, title, excerpt, content, cover_image, category, author, date, read_time, featured, related_product_slugs) VALUES
('the-art-of-eglomise', 'The Art of Églomisé: Painting Behind Glass',
 'An 18th-century French technique where art lives beneath the glass surface, merging with mirror fragments to create something that shifts with the light. Here''s how it works.',
 E'You''re looking at a mirror. Then you''re looking through it. Then you''re not sure which world you''re in. That''s églomisé — and it''s been unsettling people in the most beautiful way since the 1700s.\n\n## What Is Églomisé?\n\nÉglomisé (pronounced ay-glo-mee-ZAY) is a decorative technique where parts of a mirror''s reflective backing are carefully removed by hand, and an image is painted or applied beneath the glass surface. The result is part mirror, part artwork — a piece where your room and the painted scene coexist in the same frame.\n\nThe name comes from Jean-Baptiste Glomy, a French art dealer in the 18th century who popularized the technique, though the method is much older. Ancient Romans decorated gold leaf under glass, and the technique flourished throughout Renaissance Italy before Glomy gave it his name.\n\n## How Milena Uses It\n\nAt Mila Treasures Atelier, the traditional technique is adapted for a gothic aesthetic. Each piece begins with a mirror — the reflective surface is hand-scraped in specific areas to create a distressed, aged effect. Then the artwork is applied beneath the glass using foil transfers and specialized mirror spray.\n\nThe Haunted Castle Églomisé Mirror, for instance, features a gothic castle scene embedded inside the glass itself. The castle''s lit windows, crescent moon, and twisted bare trees live permanently beneath the surface, while the remaining mirror fragments reflect your room around them. The effect cannot be properly photographed — it must be seen in shifting light to understand.\n\nThe Dark Raven Queen Mirror Art uses the same approach: the figure of a dark queen with ravens dissolves into the mirror fragments, so she appears to watch the room with eyes that follow the candlelight.\n\n## Why It Matters\n\nIn an age when "art" often means a printed canvas from a factory, églomisé is stubbornly handmade. Every piece requires hours of careful scraping, painting, and finishing. One wrong move with the scraper and the entire mirror is ruined.\n\nThe technique also produces something genuinely unique — because the mirror fragments break differently each time, no two églomisé pieces can ever be identical. The art and the mirror dance together, and that dance is unrepeatable.\n\n## Living With Églomisé\n\nA few things to know if you''re considering an églomisé piece:\n\n- **Light matters.** These pieces change dramatically depending on the light source. Candlelight makes them glow. Daylight makes them shimmer. They are never static.\n- **Placement matters.** Hang them where they can catch both direct and ambient light. Opposite a window or near a candle is ideal.\n- **They''re mirrors too.** The remaining reflective surface is functional — you''ll catch glimpses of yourself alongside the painted scene. That''s not a flaw; it''s the point.',
 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200&q=80',
 'Workshop', 'Mila Treasures Atelier', '2026-03-20', 5, true,
 ARRAY['haunted-castle-eglomise-mirror', 'dark-raven-queen-mirror', 'dark-fairy-tale-mirror']),

('dark-fairy-tales-in-art', 'Dark Fairy Tales: The Art of Beautiful Darkness',
 'Before Disney softened the edges, fairy tales were dark, strange, and dangerous. That original darkness is what makes them powerful — and what inspires our most striking pieces.',
 'Content migrated — see source data', -- Abbreviated for seed; full content in app
 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
 'Inspiration', 'Mila Treasures Atelier', '2026-03-18', 6, true,
 ARRAY['dark-fairy-tale-mirror', 'gothic-gold-leaf-wall-art', 'gothic-enchantress-art-book']),

('sculpting-with-polymer-clay', 'Building Worlds in Polymer Clay',
 'How roses, ravens, dragons, and gothic towers emerge from polymer clay to become the sculpted 3D elements on our frames, boxes, and art books.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80',
 'Workshop', 'Mila Treasures Atelier', '2026-03-15', 6, false,
 ARRAY['gothic-heart-trinket-box', 'gothic-dragon-trinket-box', 'gothic-enchantress-art-book']),

('from-bulgaria-with-darkness', 'From Bulgaria with Darkness: How We Ship Art',
 'How a handmade églomisé mirror or sculpted trinket box travels from a workshop in Bulgaria to your shelf — and arrives in perfect condition.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80',
 'Behind the Scenes', 'Mila Treasures Atelier', '2026-03-12', 5, false,
 ARRAY['gothic-dragon-trinket-box', 'haunted-castle-eglomise-mirror', 'baroque-castle-frame']),

('styling-gothic-art-at-home', 'Styling Gothic Art in Your Home',
 'You don''t need a castle. Here''s how to display églomisé mirrors, sculpted trinket boxes, and dark framed art in a modern space without it feeling like a theme park.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&q=80',
 'Inspiration', 'Mila Treasures Atelier', '2026-03-08', 5, false,
 ARRAY['haunted-castle-eglomise-mirror', 'dark-fairy-tale-mirror', 'gothic-heart-trinket-box', 'witch-hands-crystal-ball']),

('gothic-home-decor-trends-2026', 'Gothic Home Decor Trends 2026: What''s Shifting',
 'The gothic aesthetic is moving away from mass-produced darkness and toward handmade, story-driven pieces. Here''s what''s actually changing in 2026 — and what''s staying.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1551215717-8bc5f30b21fd?w=1200&q=80',
 'Inspiration', 'Mila Treasures Atelier', '2026-04-10', 6, true,
 ARRAY['haunted-castle-eglomise-mirror', 'gothic-gold-leaf-wall-art', 'baroque-castle-frame', 'gothic-enchantress-art-book']),

('best-gothic-gifts-for-her', 'Best Gothic Gifts for Her: A Guide for the Thoughtful',
 'She doesn''t want another candle from a chain store. Here''s how to choose a gothic gift that actually means something — from trinket boxes to mirror art.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=1200&q=80',
 'Inspiration', 'Mila Treasures Atelier', '2026-04-13', 6, false,
 ARRAY['gothic-heart-trinket-box', 'gothic-dragon-trinket-box', 'dark-fairy-tale-mirror', 'gothic-enchantress-art-book', 'witch-hands-crystal-ball']),

('handmade-vs-mass-produced-decor', 'Handmade vs Mass-Produced: What You''re Actually Paying For',
 'A factory frame costs $30. A handmade one costs ten times that. Here''s what accounts for the difference — and why it matters more than you think.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80',
 'Culture', 'Mila Treasures Atelier', '2026-04-17', 7, false,
 ARRAY['haunted-castle-eglomise-mirror', 'gothic-dragon-trinket-box', 'dark-fairy-tale-mirror', 'gothic-gold-leaf-wall-art']),

('how-to-style-dark-academia-room', 'How to Style a Dark Academia Room',
 'Old books, candlelight, and the feeling of a forgotten library. Here''s how to build a dark academia space that feels authentic — not like a costume.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
 'Inspiration', 'Mila Treasures Atelier', '2026-04-20', 7, false,
 ARRAY['gothic-enchantress-art-book', 'gothic-raven-candle-holder', 'baroque-castle-frame', 'witch-hands-crystal-ball']),

('handmade-gothic-wall-decor-ideas', 'Handmade Gothic Wall Decor Ideas: Beyond the Basics',
 'You''ve moved past the mass-produced phase. Here are wall decor ideas for gothic spaces that demand something with actual craft and history behind it.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
 'Inspiration', 'Mila Treasures Atelier', '2026-04-24', 7, false,
 ARRAY['haunted-castle-eglomise-mirror', 'dark-raven-queen-mirror', 'dark-fairy-tale-mirror', 'gothic-gold-leaf-wall-art', 'baroque-castle-frame']),

('supporting-independent-artists', 'Why Supporting Independent Artists Actually Matters',
 'It''s not just a feel-good slogan. When you buy from an independent artist, the economics, the craft, and the meaning of the object are fundamentally different.',
 'Content migrated — see source data',
 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
 'Culture', 'Mila Treasures Atelier', '2026-04-28', 8, false,
 ARRAY['gothic-raven-candle-holder', 'gothic-heart-trinket-box', 'haunted-castle-eglomise-mirror', 'gothic-dragon-trinket-box']);
