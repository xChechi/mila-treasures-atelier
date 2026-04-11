-- ============================================================
-- Mila Treasures Atelier — Supabase Schema
-- Run this in Supabase SQL Editor to set up your database
-- ============================================================

-- Products table
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

-- Journal articles table
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

-- Comments table (visitors can leave comments on products or articles)
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

-- Categories table
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  product_count int NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0
);

-- Indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_slug);
CREATE INDEX idx_journal_slug ON journal_posts(slug);
CREATE INDEX idx_comments_target ON comments(target_type, target_slug);
CREATE INDEX idx_comments_approved ON comments(approved);

-- Auto-update updated_at
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

-- Storage bucket for product images (run in Supabase dashboard > Storage)
-- Create a bucket called "product-images" with public access

-- RLS policies — allow public read, restrict writes to service role
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read journal" ON journal_posts FOR SELECT USING (true);
CREATE POLICY "Public read approved comments" ON comments FOR SELECT USING (approved = true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- Allow public to insert comments (they submit, admin approves)
CREATE POLICY "Public insert comments" ON comments FOR INSERT WITH CHECK (true);

-- Service role has full access by default (used by admin API routes)
