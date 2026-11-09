'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import { useDataStore } from '../../lib/store';
import { ProjectCaseStudy } from '../../types/database';
import { Sparkles, ArrowUpRight, TrendingUp, Filter, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { projects } = useDataStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  const categories = [
    { id: 'all', label: 'كافة المشاريع' },
    { id: 'ecommerce', label: 'متاجر وتجارة إلكترونية' },
    { id: 'saas', label: 'منصات SaaS وتطبيقات' },
    { id: 'real_estate', label: 'عقارات واستثمار فاخر' },
    { id: 'lead_gen', label: 'تطبيقات ومطاعم' },
  ];

  const filtered = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar activeTab="projects" />

      <main className="relative z-10 w-full pt-28 pb-20 bg-transparent flex-1 flex flex-col gap-16 px-gutter max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-space-xs relative">

          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-label-md text-primary tracking-wide">
              سجل الإنجازات والنتائج بالأرقام
            </span>
          </div>

          <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-2 max-w-3xl">
            سابقة الأعمال ودراسات الحالة <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">الموثقة بالنتائج</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            استعرض كيف ساهمت هندسة بلاك سبايدر في مضاعفة مبيعات وحركة زوار نخبة الشركات والمتاجر في دول الخليج.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface-container-low border border-white/5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary-container text-white font-bold shadow-lg shadow-glow-crimson/30'
                    : 'text-on-surface-variant hover:text-white'
                }`}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl bg-surface-container/70 border border-white/5 hover:border-primary/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with overlay badge */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={proj.thumbnail_url}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-black/40"></div>

                  {/* Top Metric Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 border border-primary/40 backdrop-blur-md flex items-center gap-2 shadow-lg">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-mono font-bold text-sm text-primary" dir="ltr">{proj.metric_badge}</span>
                    <span className="text-[10px] text-on-surface-variant">{proj.metric_label}</span>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-surface-container-low/90 backdrop-blur-md text-[11px] font-bold text-on-surface border border-white/10">
                    {proj.category_label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-primary font-semibold">{proj.client_name}</span>
                    <h3 className="text-lg font-bold text-text-primary mt-1 group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-surface-container-low border border-white/5 text-[10px] text-on-surface-variant font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="px-6 py-4 bg-surface-container-low/50 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">المدة: {proj.timeline}</span>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="text-primary font-bold hover:underline flex items-center gap-1 font-sans text-xs"
                  type="button"
                >
                  <span>عرض التفاصيل الكاملة</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-xl rounded-3xl bg-surface-container-low border border-primary/40 p-6 md:p-8 flex flex-col gap-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-primary">{selectedProject.client_name}</span>
                  <h3 className="text-lg font-bold text-text-primary">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:text-white"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedProject.thumbnail_url}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-xl border border-white/10"
              />

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-primary/20">
                <span className="text-xs text-on-surface-variant">النتيجة المحققة:</span>
                <span className="font-mono font-bold text-base text-primary" dir="ltr">
                  {selectedProject.metric_badge} ({selectedProject.metric_label})
                </span>
              </div>

              <p className="text-xs text-on-surface leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-[#e60036] shadow-lg shadow-glow-crimson transition-all"
                >
                  طلب تدقيق مماثل لمشروعك
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs text-on-surface"
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

