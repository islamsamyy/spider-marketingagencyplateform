'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import { useDataStore } from '../../lib/store';

export default function ContactPage() {
  const { addLead, settings } = useDataStore();
  const [step, setStep] = useState<1 | 2 | 'success'>(1);
  const [service, setService] = useState('media_buying');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    website: '',
    budget: '$25,000 - $50,000',
    notes: ''
  });
  const [refId, setRefId] = useState('BS-9021');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `BS-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefId(newRef);
    addLead({
      client_name: formData.name,
      company: formData.company || 'شركة خاصة',
      email: formData.email,
      phone: formData.phone,
      service: service as any,
      budget: formData.budget,
      notes: `${formData.notes ? formData.notes + ' | ' : ''}رابط الموقع: ${formData.website || 'لم يُحدد'} (طلب عبر صفحة Contact)`,
      source: 'Contact Page Form',
      stage: 'new'
    });
    setStep('success');
  };

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar activeTab="contact" />

      <main className="relative z-10 w-full pt-28 pb-20 bg-transparent flex-1 flex flex-col gap-16 px-gutter max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-space-xs relative">

          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-label-md text-primary tracking-wide">
              طلب تدقيق تقني وجلسة استراتيجية فورية
            </span>
          </div>

          <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-2 max-w-3xl">
            ابدأ رحلة النمو الفائق مع <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">بلاك سبايدر</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            أكمل النموذج أدناه ليقوم فريقنا الهندسي والتسويقي بدراسة وضع علامتك الحالية وإعداد خارطة طريق بالبيانات قبل جلسة النقاش.
          </p>
        </div>

        {/* 2-Column Container: Form (7 cols) + Direct Desk (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-surface-container/80 border border-white/5 backdrop-blur-xl p-6 md:p-10 shadow-2xl shadow-glow-crimson/10">
            {step === 'success' ? (
              <div className="flex flex-col items-center text-center py-10 gap-space-md animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-primary-container/20 border-2 border-primary-container flex items-center justify-center text-primary shadow-[0_0_30px_rgba(255,0,60,0.5)]">
                  <span className="material-symbols-outlined text-4xl">check</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-label-md text-label-md text-primary font-bold">
                    تم استلام طلبك بنجاح!
                  </span>
                  <h3 className="font-headline-md text-headline-md font-bold text-text-primary">
                    رقم تتبع المعاملة: {refId}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2">
                    تم توجيه طلبك إلى فريق المستشارين التنفيذيين عبر Telegram و WhatsApp. سيتواصل معك أحد مديري النمو المعتمدين خلال أقل من 30 دقيقة.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-white/5 w-full max-w-md flex flex-col gap-2 text-xs font-mono text-right">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>الحالة:</span>
                    <span className="text-emerald-400 font-bold">DISPATCHED (200 OK)</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>الخدمة المحددة:</span>
                    <span className="text-on-surface">{service}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>الاسم:</span>
                    <span className="text-on-surface">{formData.name || 'عميل معتمد'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://wa.me/966501234567"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-secondary text-black font-label-md font-bold flex items-center gap-2 hover:bg-secondary-container transition-colors shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>بدء المحادثة على واتساب الآن</span>
                  </a>
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md"
                    type="button"
                  >
                    إرسال طلب جديد
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary-container text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="font-label-md font-bold text-text-primary">
                      البيانات الأساسية ونطاق المشروع
                    </span>
                  </div>
                  <span className="text-xs font-mono text-outline">SLA &lt; 30 MIN</span>
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant">
                    الخدمة الرئيسية المطلوبة:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'media_buying', label: 'Media Buying & Performance' },
                      { id: 'web_engineering', label: 'Custom Web & SaaS Dev' },
                      { id: 'creative_content', label: 'Creative & 3D Video Ops' },
                      { id: 'full_suite', label: 'Full Growth Suite (شامل)' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setService(s.id)}
                        className={`p-3 rounded-xl border text-right transition-all font-label-md ${
                          service === s.id
                            ? 'bg-primary-container/20 border-primary text-primary font-bold shadow-md'
                            : 'bg-surface-container-low border-white/5 text-on-surface-variant hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant">الاسم الكريم *</label>
                    <input
                      required
                      type="text"
                      placeholder="مثال: عبد الله السالم"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-surface-container-low border border-white/5 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant">رقم الجوال / واتساب *</label>
                    <input
                      required
                      type="tel"
                      dir="ltr"
                      placeholder="+966 5x xxx xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-surface-container-low border border-white/5 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary text-right"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant">البريد الإلكتروني المهني *</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-surface-container-low border border-white/5 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant">اسم الشركة / المتجر</label>
                    <input
                      type="text"
                      placeholder="مثال: شركة نمو للتقنية"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-surface-container-low border border-white/5 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant">رابط الموقع أو المتجر الحالي</label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="bg-surface-container-low border border-white/5 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary text-left"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant">الميزانية الشهرية المقدرة</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="bg-surface-container-low border border-white/5 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option>$10,000 - $25,000</option>
                      <option>$25,000 - $50,000</option>
                      <option>$50,000 - $100,000</option>
                      <option>$100,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-xs text-on-surface-variant">تفاصيل إضافية أو تحديات تواجهها</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب بإيجاز عن التحدي التسويقي أو التقني، والهدف الذي ترغب في تحقيقه..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-surface-container-low border border-white/5 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary-container text-white font-label-lg font-bold shadow-xl shadow-glow-crimson hover:bg-[#e60036] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>إرسال طلب التدقيق وحجز الجلسة الآن</span>
                  <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-xs font-label-sm text-outline pt-2">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[14px]">lock</span>
                    اتفاقية سرية بيانات (NDA) فورية
                  </span>
                  <span>•</span>
                  <span>دون أي التزام مالي مسبق</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Desk & Office Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Direct Executive WhatsApp Box */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-primary/30 shadow-xl flex flex-col gap-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[24px]">chat</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    المكتب التنفيذي الفوري (واتساب)
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-xs font-mono font-bold">
                  ACTIVE
                </span>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                هل تحتاج إلى استشارة عاجلة أو ترغب في بدء المحادثة مباشرة مع أحد شركائنا الإداريين؟
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={`https://wa.me/${(settings?.agencyWhatsApp || '966501234567').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-on-surface flex items-center justify-between px-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-bold text-sm">سلطان الشمري</span>
                      <span className="text-xs text-on-surface-variant">مسؤول الشراكات الخليجية</span>
                    </div>
                  </div>
                  <span className="text-primary font-mono text-xs" dir="ltr">{settings?.agencyPhone || '+966 50 123 4567'}</span>
                </a>

                <a
                  href="https://wa.me/966559876543"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-on-surface flex items-center justify-between px-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">code</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-bold text-sm">م. أحمد كمال الدين</span>
                      <span className="text-xs text-on-surface-variant">كبير مهندسي المنصات</span>
                    </div>
                  </div>
                  <span className="text-secondary font-mono text-xs" dir="ltr">+966 55 987 6543</span>
                </a>
              </div>
            </div>

            {/* SLA Guarantee Box */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
                <span className="font-label-md font-bold text-on-surface">ضمانات بلاك سبايدر</span>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>
                  <span>الرد خلال 30 دقيقة على جميع الطلبات المؤسسية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>
                  <span>تقرير تدقيق تقني وإعلاني أولي مجاني ومفصل بالأرقام.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>
                  <span>ملكية كاملة لحساباتك وبياناتك وشيفراتك دون أي قيود.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

