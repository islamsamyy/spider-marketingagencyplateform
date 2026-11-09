'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { BlogPost } from '../../../types/database';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  Save,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  X,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, togglePostPublish } = useDataStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string>(blogPosts[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedPost = blogPosts.find((p) => p.id === selectedPostId) || blogPosts[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateNew = () => {
    const newPostData = {
      title: 'مقال تحليلي جديد في التجارة الرقمية',
      slug: `article-${Date.now()}`,
      excerpt: 'مقدمة استراتيجية تشرح أثر التحول الرقمي وحلول تتبع CAPI على الإيرادات...',
      content: `## مقدمة المقال
تعتبر معمارية البيانات والربط الخادمي حجر الأساس في نجاح الحملات الإعلانية في الشرق الأوسط...

### المحاور الأساسية
1. تحليل نقاط تسرب الميزانيات بعد قيود iOS 14.
2. هندسة السيرفرات السريعة باستخدام Next.js 16.
3. استراتيجية توسيع الإنفاق الإعلاني دون انخفاض الـ ROAS.`,
      cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      reading_time: '6 دقائق قراءة',
      category: 'Media Buying & CAPI',
      author: 'فريق بلاك سبايدر الاستراتيجي',
      published: true
    };
    addBlogPost(newPostData);
    showToast('تم إنشاء مسودة مقال جديد بنجاح!');
  };

  const handleUpdateCurrent = (fields: Partial<BlogPost>) => {
    if (!selectedPost) return;
    updateBlogPost(selectedPost.id, fields);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف المقال "${title}"؟`)) {
      deleteBlogPost(id);
      showToast(`تم حذف المقال "${title}".`);
    }
  };

  const filteredPosts = blogPosts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="محرر ونظام نشر المدونة (Rich Text Blog CMS)"
        subtitle="صياغة المقالات التخصصية، إدارة المحتوى التعليمي، ومشاركته فورياً في صفحة /blog"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Posts Sidebar List (4 cols) */}
        <div className="w-full lg:w-80 bg-surface-container-low border border-white/5 rounded-3xl p-5 shadow-xl flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-text-primary">
              كافة المقالات ({blogPosts.length})
            </span>
            <button
              onClick={handleCreateNew}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>مقال جديد</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-outline absolute right-3 top-2.5" />
            <input
              type="text"
              placeholder="بحث في المقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container pr-8 pl-3 py-1.5 rounded-xl text-xs text-on-surface border border-white/5 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto no-scrollbar">
            {filteredPosts.map((post) => {
              const isSelected = post.id === selectedPostId;
              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-primary-container/20 border-primary shadow-lg shadow-glow-crimson/15'
                      : 'bg-surface-container border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-text-primary line-clamp-1">
                      {post.title}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id, post.title);
                      }}
                      className="text-on-surface-variant hover:text-rose-400 p-0.5"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/5 font-mono">
                    <span className="text-primary">{post.category}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePostPublish(post.id);
                        showToast(`تم تغيير حالة المقال إلى: ${!post.published ? 'منشور' : 'مسودة'}`);
                      }}
                      className={`px-2 py-0.5 rounded-full font-bold cursor-pointer ${
                        post.published
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {post.published ? 'منشور' : 'مسودة'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editor Main Canvas (8 cols) */}
        {selectedPost ? (
          <div className="flex-1 w-full bg-surface-container-low border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
            {/* Notifications */}
            {(saveSuccess || toastMessage) && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{toastMessage || 'تم حفظ ونشر المقال فورياً في صفحة /blog!'}</span>
                </div>
                <span className="font-mono">LIVE SYNCED</span>
              </div>
            )}

            {/* Header controls & tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 bg-surface-container p-1 rounded-xl border border-white/5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-1.5 rounded-lg font-bold transition-colors ${
                    activeTab === 'editor'
                      ? 'bg-primary-container text-white'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                >
                  محرر النص
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-1.5 rounded-lg font-bold transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-primary-container text-white'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                >
                  معاينة المقال (Live Preview)
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/blog"
                  target="_blank"
                  className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-1 font-mono"
                >
                  <span>عرض صفحة المدونة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleUpdateCurrent({})}
                  className="px-6 py-2 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ ونشر التعديلات</span>
                </button>
              </div>
            </div>

            {activeTab === 'editor' ? (
              <div className="flex flex-col gap-5">
                {/* Title and Excerpt */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-text-primary">عنوان المقال:</label>
                  <input
                    type="text"
                    value={selectedPost.title}
                    onChange={(e) => handleUpdateCurrent({ title: e.target.value })}
                    placeholder="اكتب عنوان المقال الجذاب هنا..."
                    className="w-full bg-surface-container text-lg font-bold text-text-primary p-3 rounded-xl border border-white/5 focus:outline-none focus:border-primary"
                  />

                  <label className="text-xs font-bold text-text-primary mt-2">المقدمة والموجز:</label>
                  <textarea
                    rows={2}
                    value={selectedPost.excerpt}
                    onChange={(e) => handleUpdateCurrent({ excerpt: e.target.value })}
                    placeholder="موجز المقال للظهور في بطاقات البحث وشبكات التواصل..."
                    className="w-full bg-surface-container text-xs text-on-surface-variant p-3 rounded-xl border border-white/5 focus:outline-none focus:border-secondary resize-none"
                  />
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-surface-container border border-white/5 text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-text-primary">التصنيف:</span>
                    <input
                      type="text"
                      value={selectedPost.category}
                      onChange={(e) => handleUpdateCurrent({ category: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/5 text-xs text-primary font-mono focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-text-primary">وقت القراءة المقدر:</span>
                    <input
                      type="text"
                      value={selectedPost.reading_time}
                      onChange={(e) => handleUpdateCurrent({ reading_time: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/5 text-xs text-text-primary font-mono focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-text-primary">اسم الكاتب:</span>
                    <input
                      type="text"
                      value={selectedPost.author}
                      onChange={(e) => handleUpdateCurrent({ author: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/5 text-xs text-text-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Main Content Body */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-primary flex items-center justify-between">
                    <span>محتوى المقال الكامل (Markdown):</span>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      {selectedPost.content.length} حرف
                    </span>
                  </label>
                  <textarea
                    rows={12}
                    value={selectedPost.content}
                    onChange={(e) => handleUpdateCurrent({ content: e.target.value })}
                    placeholder="اكتب المحتوى الكامل للمقال هنا باستخدام الماركداون..."
                    className="w-full bg-surface-container text-xs text-text-primary p-4 rounded-2xl border border-white/5 font-mono focus:outline-none focus:border-primary resize-y leading-relaxed"
                  />
                </div>
              </div>
            ) : (
              /* Live Preview */
              <div className="flex flex-col gap-6 p-6 rounded-2xl bg-surface-container border border-white/5">
                <div className="flex items-center gap-2 text-xs text-primary font-mono font-bold">
                  <span>{selectedPost.category}</span>
                  <span>•</span>
                  <span>{selectedPost.reading_time}</span>
                  <span>•</span>
                  <span>بواسطة {selectedPost.author}</span>
                </div>

                <h1 className="text-2xl font-bold text-text-primary leading-tight">
                  {selectedPost.title}
                </h1>

                <p className="text-xs text-on-surface-variant italic border-r-2 border-primary pr-3 leading-relaxed">
                  {selectedPost.excerpt}
                </p>

                <div className="prose prose-invert max-w-none text-xs text-on-surface leading-loose whitespace-pre-line pt-4 border-t border-white/5">
                  {selectedPost.content}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 p-12 text-center text-on-surface-variant text-xs">
            اختر مقالاً من القائمة الجانبية أو انقر على &quot;مقال جديد&quot; للبدء.
          </div>
        )}
      </main>
    </div>
  );
}
