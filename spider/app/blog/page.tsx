'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import { useDataStore } from '../../lib/store';
import { BlogPost } from '../../types/database';
import { Clock, User, ArrowUpRight, BookOpen, Search } from 'lucide-react';

export default function BlogPage() {
  const { blogPosts } = useDataStore();
  const posts = blogPosts.filter((p) => p.published);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar activeTab="blog" />

      <main className="relative z-10 w-full pt-28 pb-20 bg-transparent flex-1 flex flex-col gap-16 px-gutter max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-space-xs relative">

          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-label-md text-primary tracking-wide">
              مدونة بلاك سبايدر التقنية
            </span>
          </div>

          <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-2 max-w-3xl">
            أحدث تحليلات <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">النمو الرقمي والهندسة</span> البرمجية
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            مقالات تخصصية واستراتيجيات عملية موجهة لرواد الأعمال، مديري التسويق، وقادة المنتجات في الشرق الأوسط.
          </p>

          {/* Search Bar */}
          <div className="mt-6 w-full max-w-md relative">
            <Search className="w-4 h-4 text-outline absolute right-4 top-3.5" />
            <input
              type="text"
              placeholder="ابحث في المقالات والتحليلات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border border-white/5 rounded-2xl pr-11 pl-4 py-3 text-xs text-on-surface focus:outline-none focus:border-primary backdrop-blur-md"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group rounded-3xl bg-surface-container/70 border border-white/5 hover:border-primary/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-primary border border-primary/30">
                    {post.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-outline">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{post.reading_time}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-secondary" />
                      <span>{post.author}</span>
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Link */}
              <div className="px-6 py-4 bg-surface-container-low/50 border-t border-white/5 flex items-center justify-between text-xs font-bold text-primary group-hover:underline">
                <span>قراءة المقال بالكامل</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>

        {/* Read Article Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-2xl rounded-3xl bg-surface-container-low border border-primary/40 p-6 md:p-8 flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="px-2.5 py-1 rounded bg-primary-container/20 text-primary text-xs font-mono font-bold">
                  {activeArticle.category}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-xl font-bold text-text-primary leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-on-surface-variant font-mono">
                <span>بواسطة: {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.reading_time}</span>
              </div>

              <img
                src={activeArticle.cover_image}
                alt={activeArticle.title}
                className="w-full h-56 object-cover rounded-xl border border-white/10 my-2"
              />

              <div className="text-xs text-on-surface leading-relaxed space-y-3 font-sans">
                <p className="font-semibold text-text-primary text-sm">
                  {activeArticle.excerpt}
                </p>
                <p>{activeArticle.content}</p>
                <p>
                  تواصل هندسة بلاك سبايدر ابتكار حلول مرنة تضمن لشركائها في الخليج التفوق المستمر عبر أتمتة الحملات الإعلانية ومزامنة التحليلات في لوحة تحكم موحدة.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-xl bg-surface-container text-xs text-on-surface"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

