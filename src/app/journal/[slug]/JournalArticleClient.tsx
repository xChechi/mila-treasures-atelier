"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import type { JournalPost } from "@/data/journal";
import Breadcrumb from "@/components/ui/Breadcrumb";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-cinzel text-2xl sm:text-3xl text-foreground/85 mt-12 mb-6 tracking-wide"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="font-cinzel text-xl text-foreground/80 mt-8 mb-4 tracking-wide"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Bold paragraph (starts with **)
    if (line.startsWith("**") && !line.startsWith("- **")) {
      const match = line.match(/^\*\*(.+?)\*\*\s*(.*)/);
      if (match) {
        elements.push(
          <p key={i} className="font-inter text-base text-foreground/50 leading-relaxed mb-4">
            <strong className="text-foreground/70">{match[1]}</strong>{" "}
            {renderInlineFormatting(match[2])}
          </p>
        );
        i++;
        continue;
      }
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const listTexts: { key: number; content: React.ReactNode }[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        const itemText = lines[i].slice(2);
        listTexts.push({ key: i, content: renderInlineFormatting(itemText) });
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-2 mb-6 ml-4 list-none">
          {listTexts.map((item) => (
            <li key={item.key} className="flex gap-3">
              <span className="w-1 h-1 bg-gold/30 rounded-full mt-2.5 shrink-0" />
              <span className="font-inter text-sm text-foreground/45 leading-relaxed">
                {item.content}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="font-inter text-base text-foreground/50 leading-[1.85] mb-5">
        {renderInlineFormatting(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Handle **bold** and *italic* and em dashes
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|—/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold
      parts.push(
        <strong key={match.index} className="text-foreground/65">
          {match[1]}
        </strong>
      );
    } else if (match[2]) {
      // Italic
      parts.push(
        <em key={match.index} className="text-foreground/55">
          {match[2]}
        </em>
      );
    } else if (match[0] === "—") {
      parts.push(" — ");
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

interface Props {
  post: JournalPost;
  prevPost: JournalPost | null;
  nextPost: JournalPost | null;
}

export default function JournalArticleClient({ post, prevPost, nextPost }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" });

  const handleShare = async () => {
    const url = `https://milatreasuresatelier.com/journal/${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <article className="relative min-h-screen gothic-bg">
      {/* Hero Image */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="relative h-[50vh] sm:h-[60vh] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${post.coverImage})`,
            filter: "brightness(0.4) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-12 w-full">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block px-3 py-1 bg-burgundy/60 backdrop-blur-sm text-white text-[10px] tracking-[0.3em] uppercase font-inter mb-4"
            >
              {post.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground/95 leading-tight mb-4"
            >
              {post.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 text-foreground/30"
            >
              <span className="font-inter text-xs">
                {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="w-1 h-1 bg-foreground/15 rounded-full" />
              <span className="font-inter text-xs flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime} min read
              </span>
              <span className="w-1 h-1 bg-foreground/15 rounded-full" />
              <button
                onClick={handleShare}
                className="font-inter text-xs flex items-center gap-1.5 hover:text-gold-light transition-colors"
              >
                <Share2 size={12} />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Breadcrumb + Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-10 pb-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: post.title },
          ]}
        />

        {/* Article body */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-8"
        >
          {/* Lead paragraph */}
          <p className="font-playfair text-lg sm:text-xl text-foreground/55 leading-relaxed mb-10 italic border-l-2 border-gold/20 pl-6">
            {post.excerpt}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-gold/15 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/25" />
            <div className="flex-1 h-px bg-gradient-to-l from-gold/15 to-transparent" />
          </div>

          {/* Content */}
          <div className="prose-gothic">{renderContent(post.content)}</div>
        </motion.div>

        {/* Author + divider */}
        <div className="mt-16 pt-10 border-t border-gold/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-burgundy/10 border border-gold/15 flex items-center justify-center">
              <span className="font-cinzel text-sm text-gold/50">MTA</span>
            </div>
            <div>
              <p className="font-cinzel text-sm text-foreground/70">{post.author}</p>
              <p className="font-inter text-[10px] text-foreground/25 tracking-wider">
                Handcrafted Dark Elegance
              </p>
            </div>
          </div>
        </div>

        {/* Previous / Next navigation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/journal/${prevPost.slug}`}
              className="group p-5 bg-dark-3/30 border border-gold/8 hover:border-gold/20 transition-all duration-300"
            >
              <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/15 flex items-center gap-1 mb-2">
                <ArrowLeft size={10} /> Previous
              </span>
              <span className="font-cinzel text-sm text-foreground/50 group-hover:text-gold-light transition-colors line-clamp-1">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/journal/${nextPost.slug}`}
              className="group p-5 bg-dark-3/30 border border-gold/8 hover:border-gold/20 transition-all duration-300 text-right"
            >
              <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/15 flex items-center gap-1 justify-end mb-2">
                Next <ArrowRight size={10} />
              </span>
              <span className="font-cinzel text-sm text-foreground/50 group-hover:text-gold-light transition-colors line-clamp-1">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
