"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { JournalPost } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

const categories = ["All", "Workshop", "Culture", "Inspiration", "Behind the Scenes"];

function FeaturedPost({ post }: { post: JournalPost }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
      className="group relative mb-16"
    >
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-dark-3/50 border border-gold/10 group-hover:border-gold/25 transition-all duration-500 overflow-hidden">
          {/* Frame corners */}
          <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-2 border-l-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-500 z-10" />
          <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-2 border-r-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-500 z-10" />
          <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-2 border-l-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-500 z-10" />
          <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-2 border-r-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-500 z-10" />

          {/* Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${post.coverImage})`, filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-1/40 lg:bg-gradient-to-r lg:from-transparent lg:to-dark-3/80" />
            {/* Featured badge */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 bg-burgundy/80 text-white text-[10px] tracking-[0.2em] uppercase font-inter backdrop-blur-sm">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <span className="font-inter text-[10px] tracking-[0.4em] uppercase text-gold/50 mb-3">
              {post.category}
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl text-foreground/90 group-hover:text-gold-light transition-colors duration-500 mb-4 leading-tight">
              {post.title}
            </h2>
            <p className="font-inter text-sm text-foreground/40 leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-foreground/20">
              <span className="font-inter text-xs">
                {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="w-1 h-1 bg-foreground/10 rounded-full" />
              <span className="font-inter text-xs flex items-center gap-1">
                <Clock size={12} />
                {post.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function PostCard({ post, index }: { post: JournalPost; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="relative bg-dark-3/40 border border-gold/8 group-hover:border-gold/20 transition-all duration-500 overflow-hidden">
          {/* Frame corners */}
          <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t border-l border-gold/20 group-hover:border-gold/40 transition-colors duration-500 z-10" />
          <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t border-r border-gold/20 group-hover:border-gold/40 transition-colors duration-500 z-10" />
          <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b border-l border-gold/20 group-hover:border-gold/40 transition-colors duration-500 z-10" />
          <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b border-r border-gold/20 group-hover:border-gold/40 transition-colors duration-500 z-10" />

          {/* Cover image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${post.coverImage})`, filter: "brightness(0.6)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-1/80 to-transparent" />
            {/* Category tag */}
            <div className="absolute bottom-4 left-4">
              <span className="px-2.5 py-1 bg-dark-1/70 backdrop-blur-sm text-gold/60 text-[9px] tracking-[0.3em] uppercase font-inter border border-gold/10">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-cinzel text-lg text-foreground/85 group-hover:text-gold-light transition-colors duration-500 mb-3 leading-snug">
              {post.title}
            </h3>
            <p className="font-inter text-xs text-foreground/30 leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-foreground/15">
                <span className="font-inter text-[10px]">
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="w-0.5 h-0.5 bg-foreground/10 rounded-full" />
                <span className="font-inter text-[10px] flex items-center gap-1">
                  <Clock size={10} />
                  {post.readTime} min
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-foreground/10 group-hover:text-gold/40 group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function JournalPageClient({ posts }: { posts: JournalPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = posts.find((p) => p.featured);
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);
  const nonFeaturedPosts = filteredPosts.filter((p) => p.id !== featured?.id);

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <PageHeader
          title="Tales from the Workshop"
          subtitle="Craftsmanship · Culture · Dark Elegance"
        />

        {/* Category filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-inter text-xs tracking-[0.15em] uppercase border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-gold/40 text-gold bg-gold/5"
                  : "border-gold/10 text-foreground/30 hover:border-gold/25 hover:text-foreground/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeCategory === "All" && featured && (
          <FeaturedPost post={featured} />
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nonFeaturedPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {nonFeaturedPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-inter text-foreground/20 text-sm">
              No articles in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
