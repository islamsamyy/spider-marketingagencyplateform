'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Counter from '../components/Counter';
import WhatsAppFAB from '../components/WhatsAppFAB';
import { useDataStore } from '../lib/store';
import {
  TrendingUp,
  Target,
  Zap,
  Award,
  ArrowDown,
  ArrowUpRight,
  Star,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Code2,
  Video,
  Rocket,
  ShieldCheck,
  Cpu,
  Server,
  Layers,
  Terminal,
  Activity,
  Plus,
  Minus,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Radio,
  Globe,
  Database,
  Network,
  ShieldAlert,
  Sliders,
  Volume2,
  VolumeX,
  Gauge,
  Eye,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [selectedService, setSelectedService] = useState('media_buying');
  const [budget, setBudget] = useState('25k_50k');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    notes: ''
  });
  const [refNumber, setRefNumber] = useState(7842);

  // ROI Simulator State
  const [simBudget, setSimBudget] = useState(25000);
  const simClicks = Math.round(simBudget * 1.85);
  const simOrders = Math.round(simBudget * 0.082);
  const simRevenue = Math.round(simBudget * 4.6);

  // New Section: Ad-Waste Diagnostic Lab State
  const [auditPlatform, setAuditPlatform] = useState<'salla' | 'zid' | 'shopify' | 'custom'>('salla');
  const [auditSpend, setAuditSpend] = useState<number>(20000);
  const [isAuditing, setIsAuditing] = useState(false);

  // Calculations for Ad-Waste Lab
  const lostPixel = Math.round(auditSpend * 0.26);
  const lostSpeed = Math.round(auditSpend * 0.18);
  const lostCreative = Math.round(auditSpend * 0.14);
  const totalRecoverable = Math.round(auditSpend * 0.48 * 2.8);

  const runAuditScan = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 600);
  };

  // New Section: Regional Live Operations Grid State
  const [activeCity, setActiveCity] = useState<'riyadh' | 'dubai' | 'jeddah' | 'kuwait' | 'doha' | 'cairo'>('riyadh');

  const cityData = {
    riyadh: {
      name: 'الرياض (المقر الرئيسي)',
      country: 'المملكة العربية السعودية',
      ping: '14ms',
      status: 'نظام نشط فائق السرعة',
      gmv: '4,850,000 ريال',
      roas: '5.2x',
      protocol: 'Meta CAPI v19 + Edge CDN Hub',
      activeAgents: 48
    },
    dubai: {
      name: 'دبي (مركز التوسع المالي)',
      country: 'الإمارات العربية المتحدة',
      ping: '18ms',
      status: 'حملات التيك توك وسناب متزامنة',
      gmv: '3,920,000 درهم',
      roas: '4.9x',
      protocol: 'TikTok Events API Direct Pipe',
      activeAgents: 36
    },
    jeddah: {
      name: 'جدة (بوابة التجارة الإلكترونية الغربية)',
      country: 'المملكة العربية السعودية',
      ping: '16ms',
      status: 'معالجة مباشرة للطلبات السريعة',
      gmv: '2,410,000 ريال',
      roas: '4.7x',
      protocol: 'Google Enhanced Conversions Core',
      activeAgents: 24
    },
    kuwait: {
      name: 'الكويت (عمليات الخليج الشمالي)',
      country: 'دولة الكويت',
      ping: '22ms',
      status: 'بث محتوى إبداعي وإنتاج مستمر',
      gmv: '195,000 دينار',
      roas: '5.5x',
      protocol: 'Multi-Touch Attribution Node',
      activeAgents: 18
    },
    doha: {
      name: 'الدوحة (عمليات الاستثمار والرفاهية)',
      country: 'دولة قطر',
      ping: '20ms',
      status: 'حملات B2B وتجزئة فاخرة',
      gmv: '1,680,000 ريال',
      roas: '5.8x',
      protocol: 'Full-Funnel High LTV Cluster',
      activeAgents: 14
    },
    cairo: {
      name: 'القاهرة (مختبر الموشن جرافيك والإنتاج 24/7)',
      country: 'جمهورية مصر العربية',
      ping: '28ms',
      status: 'وحدة صناعة الفيديوهات الفيروسية',
      gmv: '1,200,000 دولار (صادرات)',
      roas: '4.6x',
      protocol: 'Creative Testing AI Pipeline',
      activeAgents: 32
    }
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { reviews: storeReviews, addLead } = useDataStore();
  const reviews = storeReviews.filter((r) => r.status === 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = Math.floor(1000 + Math.random() * 9000);
    setRefNumber(newRef);
    addLead({
      client_name: formData.name,
      company: formData.company || 'شركة بدون اسم',
      email: formData.email,
      phone: formData.phone,
      service: selectedService as any,
      budget: budget === '10k_25k' ? '$10,000 - $25,000' : budget === '25k_50k' ? '$25,000 - $50,000' : budget === '50k_100k' ? '$50,000 - $100,000' : '+$100,000 (Enterprise)',
      notes: formData.notes || `طلب دراسة جدوى استراتيجية عبر الموقع (مرجع: #BS-${newRef})`,
      source: 'Website Lead Funnel',
      stage: 'new'
    });
    setStep('success');
  };

  const faqs = [
    {
      q: 'كيف تضمن بلاك سبايدر دقة تتبع المبيعات بعد قيود iOS 14+ و 18؟',
      a: 'نقوم ببناء معمارية تتبع من الطرف الأول (First-Party CAPI Tracking) باستخدام خوادم سحابية مخصصة، مما يضمن تمرير كل حدث شراء وزيارة مباشرة إلى منصات Meta و TikTok و Google بدون الاعتماد على كوكيز المتصفح التقليدية، محققين دقة تطابق تفوق 96%.'
    },
    {
      q: 'هل نحتفظ بالملكية الكاملة للحسابات الإعلانية ومستودعات الشيفرة المصدرية؟',
      a: 'نعم، 100%. جميع الحسابات الإعلانية، البيكسلات، الدومينات، والمستودعات البرمجية تبقى ملكية قانونية مطلقة لشركتك. نحن نعمل كفريق استراتيجي وتنفيذي مفوض عبر Business Manager دون أي حجز للأصول.'
    },
    {
      q: 'ما هو الحد الأدنى للميزانية الإعلانية الشهرية المناسبة للبدء؟',
      a: 'نوصي بحد أدنى للإنفاق الإعلاني لا يقل عن 10,000 دولار شهرياً لنتمكن من إجراء اختبارات A/B الخوارزمية الكافية وتغذية البيكسل بالبيانات للوصول إلى مضاعفات ROAS تفوق 4x.'
    },
    {
      q: 'كيف تتم آلية التواصل ومتابعة الأداء اليومي؟',
      a: 'نخصص قناة Telegram / Slack مباشرة تجمع قادة فريقك مع مدير الحملات (Media Buyer) وكبير مهندسي المنصات ومسؤول المحتوى الإبداعي، مع لوحة تحليلات حية وتقارير أداء دورية كل أسبوع.'
    }
  ];

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white overflow-x-hidden">
      <Navbar activeTab="home" />

      {/* Main Content Viewport */}
      <main className="relative z-10 w-full pt-20 bg-transparent min-h-screen">
        <div className="flex flex-col w-full">
          
          {/* SECTION 1: HERO SECTION */}
          <section className="relative overflow-hidden w-full pt-16 pb-20 px-gutter flex flex-col items-center justify-center text-center">
            {/* Live Holographic Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-6 animate-cyber-glow">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
              <span className="font-label-md text-label-md text-primary tracking-wide">
                وكالة الجيل الجديد للنمو الرقمي والحلول البرمجية
              </span>
            </div>

            {/* Futuristic Arabic Headline with High-Contrast Gradient */}
            <h1 className="font-display-xl text-display-xl tracking-tight leading-[1.15] mb-6 max-w-4xl text-text-primary">
              نحوّل الأفكار الطموحة إلى{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">
                إيرادات متسارعة
              </span>{' '}
              وقصص نجاح استثنائية
            </h1>

            {/* Strategic Value Proposition */}
            <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-10">
              شريكك الاستراتيجي في إدارة الحملات الإعلانية فائقة العائد (Media Buying)، هندسة وتطوير المنصات الرقمية المتطورة، وصناعة المحتوى الإبداعي المؤثر للشركات في الخليج والشرق الأوسط.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-container text-white text-sm font-bold shadow-xl shadow-glow-crimson hover:bg-[#e60036] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>طلب دراسة نمو وعرض سعر مجاناً</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest border border-white/5 text-text-primary text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <ArrowDown className="w-4 h-4 text-primary" />
                <span>استكشف خدماتنا الاستراتيجية</span>
              </Link>
            </div>

            {/* Holographic Stats Grid (4 Core High-Impact Metrics) */}
            <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Stat 1: Managed Budget */}
              <div className="p-5 rounded-2xl bg-surface-container/60 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all">
                <div className="p-2 rounded-xl bg-primary/10 text-primary mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-primary font-mono tracking-tight">
                  <Counter to={10} prefix="+$" suffix="M" />
                </div>
                <span className="text-xs text-on-surface-variant font-medium mt-1">إجمالي الميزانيات المدارة</span>
                <span className="text-[10px] text-primary/85 font-mono mt-0.5">نمو تراكمي نشط</span>
              </div>

              {/* Stat 2: Launched Platforms */}
              <div className="p-5 rounded-2xl bg-surface-container/60 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all">
                <div className="p-2 rounded-xl bg-primary/10 text-primary mb-2">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-text-primary font-mono tracking-tight">
                  <Counter to={250} suffix="+" />
                </div>
                <span className="text-xs text-on-surface-variant font-medium mt-1">منصة ومشروع تقني أُطلق</span>
                <span className="text-[10px] text-[#25D366] font-mono mt-0.5">تسليم بنسبة 100%</span>
              </div>

              {/* Stat 3: Average ROAS */}
              <div className="p-5 rounded-2xl bg-surface-container/60 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all">
                <div className="p-2 rounded-xl bg-primary/10 text-primary mb-2">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-primary font-mono tracking-tight">
                  <Counter to={4.8} decimals={1} suffix="x" />
                </div>
                <span className="text-xs text-on-surface-variant font-medium mt-1">متوسط العائد الإعلاني (ROAS)</span>
                <span className="text-[10px] text-primary/85 font-mono mt-0.5">تحسين لكلفة الاكتساب</span>
              </div>

              {/* Stat 4: Client Retention */}
              <div className="p-5 rounded-2xl bg-surface-container/60 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all">
                <div className="p-2 rounded-xl bg-primary/10 text-primary mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-text-primary font-mono tracking-tight">
                  <Counter to={98} suffix="%" />
                </div>
                <span className="text-xs text-on-surface-variant font-medium mt-1">نسبة رضا الشركاء والاستمرار</span>
                <span className="text-[10px] text-[#25D366] font-mono mt-0.5">عقود شراكة سنوية</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: LIVE CYBER OPERATIONS & TELEMETRY STREAM */}
          <section className="w-full py-4 bg-surface-container-lowest/90 border-y border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-container"></span>
                </span>
                <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  LIVE CYBER TELEMETRY FEED:
                </span>
              </div>
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-mono text-on-surface-variant">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-white/5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>[META_CAPI]: 99.4% Event Match Quality</span>
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-white/5">
                  <TrendingUp className="w-3.5 h-3.5 text-secondary" />
                  <span>[ROAS_PEAK]: +5.8x Scaled across GCC</span>
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-white/5">
                  <Server className="w-3.5 h-3.5 text-primary" />
                  <span>[EDGE_CACHE]: 38ms TTFB Global Response</span>
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-white/5">
                  <Cpu className="w-3.5 h-3.5 text-secondary" />
                  <span>[AI_AGENT]: 24/7 Algorithmic Bid Optimization</span>
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 3: 3-PILLAR CORE SERVICES BENTO */}
          <section className="w-full py-24 px-gutter relative" id="services-overview">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                    <span>معمارية النمو المتكاملة</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                    خدمات مصممة لدفع كفاءة المنظومة التسويقية والبرمجية
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                    نقدم ثلاث ركائز استراتيجية متكاملة تتكاتف معاً لتحويل علامتك التجارية إلى قوة تسويقية وتقنية لا تقبل المنافسة.
                  </p>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold text-sm group"
                >
                  <span>استكشف تفاصيل الخدمات والتقنيات</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
                </Link>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Service 1: Media Buying */}
                <div className="group flex flex-col rounded-3xl bg-surface-container/70 border border-white/5 hover:border-primary/40 p-8 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 hover:bg-surface-container-high transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    إدارة الحملات الإعلانية فائقة العائد (Media Buying)
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    استراتيجيات استهداف خوارزمية على منصات Meta و TikTok و Snapchat و Google Ads مبنية على بنية تتبع من الطرف الأول (CAPI) تضمن أعلى كفاءة لتحويل الميزانيات إلى أرباح حقيقية.
                  </p>
                  <div className="flex flex-col gap-2 mt-auto pt-4 bg-surface-container-lowest/60 border border-white/5 p-4 rounded-2xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">التركيز الأساسي:</span>
                      <span className="font-bold text-text-primary">أقصى عائد على الإنفاق (ROAS)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">المنصات المدعومة:</span>
                      <span className="font-bold text-primary font-mono">Meta, TikTok, Google, Snap</span>
                    </div>
                  </div>
                </div>

                {/* Service 2: Web Engineering */}
                <div className="group flex flex-col rounded-3xl bg-surface-container/70 border border-white/5 hover:border-secondary/40 p-8 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 hover:bg-surface-container-high transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    هندسة وتطوير المنصات والمتاجر المتطورة
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    بناء تطبيقات الويب الحديثة والمتاجر الرقمية السريعة باستخدام أحدث معايير Next.js و React والربط مع حلول الدفع الخليجية وقواعد بيانات سحابية لحظية تحقق سرعة تحميل خيالية ومعدل تحويل قياسي.
                  </p>
                  <div className="flex flex-col gap-2 mt-auto pt-4 bg-surface-container-lowest/60 border border-white/5 p-4 rounded-2xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">معمارية الويب:</span>
                      <span className="font-bold text-text-primary font-mono">Next.js 16 + React 19</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">زمن الاستجابة:</span>
                      <span className="font-bold text-secondary font-mono">&lt; 50ms Edge Response</span>
                    </div>
                  </div>
                </div>

                {/* Service 3: Creative Content */}
                <div className="group flex flex-col rounded-3xl bg-surface-container/70 border border-white/5 hover:border-tertiary/40 p-8 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 hover:bg-surface-container-high transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    صناعة المحتوى الإبداعي والموشن جرافيك (Creative Lab)
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    إنتاج وتصميم فيديوهات إعلانية سينمائية وتفاعلية ثلاثية الأبعاد (3D Motion Graphics) وفيديوهات UGC مصممة خصيصاً للتفوق في المزادات الإعلانية وكسر الملل البصري للمستخدم الخليجي.
                  </p>
                  <div className="flex flex-col gap-2 mt-auto pt-4 bg-surface-container-lowest/60 border border-white/5 p-4 rounded-2xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">أنماط الإنتاج:</span>
                      <span className="font-bold text-text-primary">3D Motion, UGC, High-Hook Ads</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">معدل التفاعل:</span>
                      <span className="font-bold text-tertiary font-mono">+140% Hook Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: FUTURISTIC NEURAL TECH STACK MATRIX */}
          <section className="w-full py-24 px-gutter relative bg-surface-container-lowest/70 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col gap-14">
              <div className="text-center flex flex-col items-center gap-3">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                  NEURAL INFRASTRUCTURE & TECH STACK
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  بنية تحتية متقدمة لا تعتمد على الصدفة أو الأدوات البدائية
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                  نحن نوظف حزمة أدوات تقنية وخوارزمية فائقة التطور تمنح علامتك التجارية تفوقاً حاسماً على المنافسين في سرعة الاستجابة، دقة الاستهداف، وثبات العائد.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tech 1 */}
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Server className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">PROTOCOL: FIRST-PARTY</span>
                  </div>
                  <h4 className="font-bold text-base text-text-primary">First-Party CAPI Tracking</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    تجاوز قيود الخصوصية ومتصفحات سفاري عبر تمرير أحداث الشراء من السيرفر مباشرة لـ Meta و TikTok بدقة تزيد عن 96%.
                  </p>
                </div>

                {/* Tech 2 */}
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Cpu className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">ENGINE: REACT 19 / NEXT 16</span>
                  </div>
                  <h4 className="font-bold text-base text-text-primary">Next.js High-Speed Commerce Core</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    منصات ومتاجر مبنية بأحدث معايير React Server Components وسرعة تحميل أقل من نصف ثانية لرفع معدل التحويل اللحظي.
                  </p>
                </div>

                {/* Tech 3 */}
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Activity className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">AUTO-PILOT: REAL-TIME</span>
                  </div>
                  <h4 className="font-bold text-base text-text-primary">Algorithmic Ad Bidding Agents</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    نصوص برمجية وروبوتات تراقب المزاد الإعلاني على مدار 24 ساعة لوقف الإعلانات الخاسرة وتكبير الميزانيات الرابحة لحظياً.
                  </p>
                </div>

                {/* Tech 4 */}
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">VISUALS: THREE.JS + BLENDER</span>
                  </div>
                  <h4 className="font-bold text-base text-text-primary">3D Motion & Viral Creative Engine</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    استوديو تصيير متكامل ينتج زوايا إعلانية غير تقليدية ونماذج تفاعلية تجعل علامتك تعلق في ذهن العميل فوراً.
                  </p>
                </div>

                {/* Tech 5 */}
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">CRO: A/B TESTING</span>
                  </div>
                  <h4 className="font-bold text-base text-text-primary">Scientific Conversion Optimization (CRO)</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    خرائط حرارية واختبارات A/B دورية على صفحات الهبوط لتحويل كل زائر إلى عميل بأقل تكلفة ممكنة للاكتساب (CAC).
                  </p>
                </div>

                {/* Tech 6 */}
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">SECURITY: ISOLATED VAULT</span>
                  </div>
                  <h4 className="font-bold text-base text-text-primary">Enterprise Vault & Security Standards</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    حماية كاملة لأصولك الرقمية وتشفير كامل للبيانات وتأكيد الهوية عبر خوادم متوافقة مع متطلبات الأمن السيبراني في الخليج.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: INTERACTIVE 4-STAGE GROWTH ENGINEERING TIMELINE */}
          <section className="w-full py-24 px-gutter relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-14">
              <div className="text-center flex flex-col items-center gap-2">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                  BLACK SPIDER PROTOCOL
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  بروتوكول هندسة النمو في 4 مراحل صارمة
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  منهجية واضحة ومثبتة عملياً تأخذك من مرحلة التشوش ونزيف الميزانيات إلى الاستقرار والتوسع المتسارع.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className="p-6 rounded-3xl bg-surface-container/60 border border-white/5 hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 transition-all group flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-mono font-bold flex items-center justify-center text-base">
                        01
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant">WEEKS 1 - 2</span>
                    </div>
                    <h3 className="font-bold text-base text-text-primary mt-2">التدقيق الجنائي الشامل (Audit)</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      فحص دقيق لكافة الحسابات الإعلانية السابقة، بنية البيكسل، نقاط تسرب المبيعات في الموقع، وتحليل عميق للمنافسين.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>مخرجات واضحة بالأرقام وخطة عمل</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-6 rounded-3xl bg-surface-container/60 border border-white/5 hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 transition-all group flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-mono font-bold flex items-center justify-center text-base">
                        02
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant">WEEKS 2 - 3</span>
                    </div>
                    <h3 className="font-bold text-base text-text-primary mt-2">تأسيس البنية التحتية و CAPI</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      ربط وتفعيل معمارية التتبع من السيرفر، تسريع صفحات الهبوط، وإعداد لوحة تحليلات لحظية لمراقبة الأداء المالي.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>جاهزية تقنية بنسبة 100%</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-6 rounded-3xl bg-surface-container/60 border border-white/5 hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 transition-all group flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-mono font-bold flex items-center justify-center text-base">
                        03
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant">WEEKS 3 - 5</span>
                    </div>
                    <h3 className="font-bold text-base text-text-primary mt-2">إنتاج المحتوى واختبار الزوايا</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      إطلاق حزم إعلانية متجددة بموشن جرافيك عالي التأثير واختبار العشرات من الزوايا التسويقية لتحديد التركيبة الرابحة.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تحديد زوايا الإعلانات الفائزة</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-6 rounded-3xl bg-surface-container/60 border border-white/5 hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 transition-all group flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-mono font-bold flex items-center justify-center text-base">
                        04
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant">ONGOING SCALING</span>
                    </div>
                    <h3 className="font-bold text-base text-text-primary mt-2">التوسع الخوارزمي (Aggressive Scaling)</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      ضخ الميزانيات بحكمة في الحملات الفائزة وفتح أسواق خليجية جديدة مع الحفاظ الصارم على مضاعف العائد الإعلاني ROAS.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>توسع مستدام دون انخفاض العائد</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: BEFORE VS AFTER COMPARATIVE BENCHMARK */}
          <section className="w-full py-20 px-gutter relative">
            <div className="max-w-5xl mx-auto flex flex-col gap-10">
              <div className="text-center flex flex-col items-center gap-2">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                  THE BLACK SPIDER ADVANTAGE
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  الفرق بين وكالات التسويق التقليدية ومعمارية بلاك سبايدر
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl bg-surface-container border border-white/5 p-6 lg:p-8 shadow-xl">
                {/* Traditional Agency */}
                <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low/70 border border-white/5">
                  <div className="flex items-center gap-2 text-rose-500 font-bold mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <span className="text-sm">معظم الوكالات والشركات التقليدية</span>
                  </div>
                  <div className="flex flex-col gap-4 text-xs text-on-surface-variant flex-1">
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-500 font-bold">✕</span>
                      <p>اعتماد أعمى على بيكسل المتصفح القديم مع فقدان 30% إلى 45% من بيانات الشراء.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-500 font-bold">✕</span>
                      <p>مواقع وبوابات بطيئة تبتلع الميزانية الإعلانية وتؤدي لارتداد الزوار فور وصولهم.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-500 font-bold">✕</span>
                      <p>تقارير نهاية الشهر الجامدة بدون معرفة أين ذهبت كل هللة وكيف تحولت لعائد.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-500 font-bold">✕</span>
                      <p>تصاميم روتينية مكررة تفشل في استيقاف المتصفح وتحقيق معدل نقر منافس.</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                    <span>متوسط العائد الإعلاني:</span>
                    <span className="font-bold text-rose-400">1.5x - 2.2x ROAS</span>
                  </div>
                </div>

                {/* Black Spider Architecture */}
                <div className="flex flex-col p-6 rounded-2xl bg-surface-container-high border border-primary/40 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="flex items-center gap-2 text-primary font-bold mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></div>
                    <span className="text-sm">معمارية بلاك سبايدر (Black Spider)</span>
                  </div>
                  <div className="flex flex-col gap-4 text-xs text-on-surface flex-1">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p>تتبع خادمي مباشر (Server-Side CAPI) بدقة مطابقة تفوق 96% واسترجاع كافة البيانات.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p>منصات ومتاجر فائقة السرعة بزمن تحميل تحت 50ms ورفع معدل التحويل بنسبة +85%.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p>عائد استثماري مستقر ومضاعف يتجاوز 4.8x مع قدرة واضحة على رفع الإنفاق بأمان.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p>إنتاج مستمر لفيديوهات UGC والموشن 3D الفيروسي يعزز مكانة العلامة ومصداقيتها.</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-surface-container-highest flex items-center justify-between font-mono text-xs">
                    <span>متوسط العائد الإعلاني:</span>
                    <span className="font-bold text-primary text-base">4.8x - 5.8x ROAS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6.5 (NEW FUTURISTIC SECTION): AD-WASTE & TRACKING LEAK DIAGNOSTIC LAB */}
          <section className="w-full py-20 px-gutter relative bg-surface-container-lowest/80 border-y border-white/5" id="waste-audit">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-bold">
                    <ShieldAlert className="w-4 h-4 animate-pulse" />
                    <span>NEURAL DIAGNOSTIC LAB: AD-WASTE AUDIT</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                    مختبر كشف تسرب الميزانيات وفقدان بيانات الشراء
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                    حدد منصة متجرك الحالية وميزانيتك الشهرية لنقوم بمحاكاة فورية لحجم الميزانية المهدرة بسبب قيود التتبع وبطء الخوادم وكيفية استردادها فوراً.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runAuditScan}
                  className="px-6 py-3 rounded-xl bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-white font-mono font-bold text-xs flex items-center gap-2 transition-all shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>إعادة تشغيل الفحص الخوارزمي</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Platform & Budget Controller (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6 p-6 rounded-3xl bg-surface-container/70 border border-white/5 shadow-xl">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-text-primary flex items-center justify-between">
                      <span>منصة المتجر أو التطبيق الحالية:</span>
                      <span className="text-[11px] font-mono text-primary">SELECT PLATFORM</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'salla', label: 'سلة (Salla)' },
                        { id: 'zid', label: 'زد (Zid)' },
                        { id: 'shopify', label: 'شوبيفاي (Shopify)' },
                        { id: 'custom', label: 'برمجة مخصصة (Custom)' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setAuditPlatform(p.id as any)}
                          className={`p-3.5 rounded-xl text-xs font-bold transition-all border text-right flex items-center justify-between ${
                            auditPlatform === p.id
                              ? 'bg-primary-container text-white border-primary shadow-lg shadow-glow-crimson/20'
                              : 'bg-surface-container-high/60 text-on-surface-variant border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span>{p.label}</span>
                          {auditPlatform === p.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-text-primary">
                        الميزانية الإعلانية الشهرية:
                      </label>
                      <span className="font-mono text-base font-extrabold text-primary">
                        ${auditSpend.toLocaleString()} / شهر
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3000}
                      max={150000}
                      step={2500}
                      value={auditSpend}
                      onChange={(e) => setAuditSpend(Number(e.target.value))}
                      className="w-full h-3 rounded-lg bg-surface-container-highest accent-primary-container cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-on-surface-variant">
                      <span>$3,000</span>
                      <span>$50,000</span>
                      <span>$150,000+</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col gap-2 font-mono text-xs">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>حالة التتبع الحالي:</span>
                      <span className="text-rose-400 font-bold">تسرب مؤكد بنسبة 28%</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>سرعة التحميل التقديرية:</span>
                      <span className="text-amber-400 font-bold">2.8s (معدل ارتداد مرتفع)</span>
                    </div>
                  </div>
                </div>

                {/* Holographic Diagnostic Output (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col gap-6 p-6 lg:p-8 rounded-3xl bg-surface-container-high border border-primary/30 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary-container animate-ping"></div>
                      <span className="font-mono text-xs text-primary font-bold">
                        DIAGNOSIS MATRIX REPORT
                      </span>
                    </div>
                    <span className="text-xs font-mono text-on-surface-variant">
                      ID: SCAN-{auditSpend.toString().slice(0, 3)}
                    </span>
                  </div>

                  {/* 3 Leaks Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-surface-container-lowest/60 border border-rose-500/20 flex flex-col">
                      <span className="text-[11px] text-on-surface-variant mb-1">فقدان أحداث الشراء (CAPI):</span>
                      <span className="text-xl font-bold font-mono text-rose-400">
                        -${lostPixel.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-rose-400/80 mt-1">تراجع ذكاء خوارزميات Meta</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-container-lowest/60 border border-amber-500/20 flex flex-col">
                      <span className="text-[11px] text-on-surface-variant mb-1">تسرب ارتداد بطء المتجر:</span>
                      <span className="text-xl font-bold font-mono text-amber-400">
                        -${lostSpeed.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-amber-400/80 mt-1">ارتداد قبل إتمام السلة</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-container-lowest/60 border border-purple-500/20 flex flex-col">
                      <span className="text-[11px] text-on-surface-variant mb-1">احتراق الإعلانات (Fatigue):</span>
                      <span className="text-xl font-bold font-mono text-purple-400">
                        -${lostCreative.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-purple-400/80 mt-1">ارتفاع كلفة الألف ظهور CPM</span>
                    </div>
                  </div>

                  {/* High Impact Recovery Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-l from-primary-container/20 to-primary/10 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-text-primary">
                        الأرباح الشهرية المستردة عبر بنية بلاك سبايدر:
                      </span>
                      <span className="text-2xl lg:text-3xl font-extrabold font-mono text-primary mt-1">
                        +${totalRecoverable.toLocaleString()} / شهر
                      </span>
                      <span className="text-[11px] text-on-surface-variant mt-0.5">
                        حساب مبني على مضاعف العائد الصافي ومطابقة CAPI بنسبة 96%
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/966501234567?text=${encodeURIComponent(
                        `مرحباً بلاك سبايدر، قمت بفحص متجري على منصة (${auditPlatform}) بميزانية شهرياً ${auditSpend}$ ووجدت أن حجم التسرب يتجاوز ${lostPixel + lostSpeed}$. أود جلسة استراتيجية لاسترداد الميزانية المهدرة.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white font-bold text-xs shadow-xl shadow-glow-crimson transition-all flex items-center gap-2 shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>استرداد الميزانية المهدرة فوراً</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: INTERACTIVE LIVE ROI & GROWTH SIMULATOR */}
          <section className="w-full py-20 px-gutter relative bg-surface-container-lowest/80 border-b border-white/5">
            <div className="max-w-5xl mx-auto flex flex-col gap-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                    GROWTH VALUE SIMULATOR
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                    احسب القيمة المتوقعة لنمو مبيعاتك مع بلاك سبايدر
                  </h2>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">
                  خوارزمية مبنية على نتائج الربع الأخير في الخليج
                </span>
              </div>

              {/* Slider Control */}
              <div className="p-6 md:p-8 rounded-3xl bg-surface-container/70 border border-white/5 flex flex-col gap-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text-primary">
                      الميزانية الإعلانية الشهرية المقترحة:
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      اسحب المؤشر لتقدير عدد الطلبات والإيرادات المحققة
                    </span>
                  </div>
                  <span className="font-mono text-2xl md:text-3xl font-extrabold text-primary">
                    ${simBudget.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={simBudget}
                  onChange={(e) => setSimBudget(Number(e.target.value))}
                  className="w-full h-3 rounded-lg bg-surface-container-highest accent-primary-container cursor-pointer"
                />

                <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                  <span>$5,000</span>
                  <span>$50,000</span>
                  <span>$100,000</span>
                  <span>$200,000+</span>
                </div>

                {/* Simulator Metric Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div className="p-5 rounded-2xl bg-surface-container border border-white/5 flex flex-col items-center text-center">
                    <span className="text-xs text-on-surface-variant mb-1">الزيارات المستهدفة عالية النية</span>
                    <span className="text-2xl font-bold font-mono text-text-primary">
                      {simClicks.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-primary mt-1">CPC محكم ومدروس</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container border border-white/5 flex flex-col items-center text-center">
                    <span className="text-xs text-on-surface-variant mb-1">الطلبات / الصفقات المقدرة</span>
                    <span className="text-2xl font-bold font-mono text-secondary">
                      {simOrders.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-secondary mt-1">معدل تحويل متفوق</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-high border border-primary/30 flex flex-col items-center text-center shadow-lg">
                    <span className="text-xs text-on-surface-variant mb-1">الإيرادات المتوقعة (Gross GMV)</span>
                    <span className="text-2xl font-bold font-mono text-primary">
                      ${simRevenue.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-primary/80 font-bold mt-1">متوسط مضاعف 4.6x ROAS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: DYNAMIC MASONRY CLIENT REVIEWS */}
          <section className="w-full py-24 px-gutter relative" id="reviews">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <div className="text-center flex flex-col items-center gap-2">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                  CLIENT TESTIMONIALS
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  آراء وتجارب شركاء النمو في الخليج والشرق الأوسط
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  شهادات موثقة من مؤسسي المتاجر، الرؤساء التنفيذيين، ومديري التسويق الذين شاركونا رحلة التوسع.
                </p>
              </div>

              {/* Masonry / Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-3xl bg-surface-container/70 border border-white/5 hover:border-primary/40 shadow-xl flex flex-col justify-between relative group hover:bg-surface-container-high transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-primary">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold">
                          {rev.roas_boost}
                        </span>
                      </div>

                      <p className="text-xs text-on-surface leading-relaxed italic mb-4">
                        &ldquo;{rev.review_text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <img
                        src={rev.avatar_url}
                        alt={rev.client_name}
                        className="w-11 h-11 rounded-full object-cover border border-primary/30"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-text-primary">{rev.client_name}</span>
                        <span className="text-[11px] text-on-surface-variant">
                          {rev.client_role} • {rev.company}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8.5 (NEW FUTURISTIC SECTION): REGIONAL TELEMETRY NODES & DEPLOYMENT GRID */}
          <section className="w-full py-20 px-gutter relative bg-surface-container-lowest/80 border-y border-white/5" id="regional-nodes">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/5">
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-bold">
                    <Radio className="w-4 h-4 text-primary animate-pulse" />
                    <span>REGIONAL RADAR TELEMETRY NODES</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                    خريطة شبكة العمليات ونطاق التغطية الإقليمي المباشر
                  </h2>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">
                  تغطية خوادم متزامنة عبر السعودية، الإمارات، قطر، الكويت، ومصر
                </span>
              </div>

              {/* Interactive City Selector Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(cityData).map(([key, data]) => {
                  const isActive = activeCity === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveCity(key as any)}
                      className={`p-4 rounded-2xl text-right transition-all border flex flex-col gap-1 ${
                        isActive
                          ? 'bg-primary-container text-white border-primary shadow-xl shadow-glow-crimson/25 scale-[1.02]'
                          : 'bg-surface-container/60 text-on-surface-variant border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">{data.name.split(' ')[0]}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-black/30 text-white' : 'bg-surface-container-high text-primary'}`}>
                          {data.ping}
                        </span>
                      </div>
                      <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-on-surface-variant'}`}>
                        {data.country.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Node Live Telemetry Panel */}
              <div className="p-6 lg:p-8 rounded-3xl bg-surface-container/80 border border-primary/30 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col gap-2 text-right">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
                    <span>ACTIVE NODE: {cityData[activeCity].name}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {cityData[activeCity].country}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {cityData[activeCity].status}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col">
                    <span className="text-[11px] text-on-surface-variant">حجم المبيعات المدارة (GMV):</span>
                    <span className="text-lg font-bold font-mono text-text-primary mt-1">
                      {cityData[activeCity].gmv}
                    </span>
                    <span className="text-[10px] text-primary mt-0.5">مضاعف ROAS: {cityData[activeCity].roas}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col">
                    <span className="text-[11px] text-on-surface-variant">العملاء النشطون حالياً:</span>
                    <span className="text-lg font-bold font-mono text-primary mt-1">
                      {cityData[activeCity].activeAgents} علامة تجارية
                    </span>
                    <span className="text-[10px] text-secondary mt-0.5">معدل استجابة {cityData[activeCity].ping}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-white/5 flex flex-col justify-center">
                  <span className="text-[11px] text-on-surface-variant mb-1">البروتوكول السحابي النشط:</span>
                  <span className="font-mono text-xs font-bold text-primary">
                    {cityData[activeCity].protocol}
                  </span>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-on-surface-variant">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>تشفير كامل وحماية أصول بنسبة 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: MULTI-STEP LEAD FUNNEL */}
          <section className="w-full py-24 px-gutter relative" id="growth-funnel">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <div className="text-center mb-10 flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-primary mx-auto">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  <span>دراسة الجدوى وبدء الشراكة</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  طلب دراسة نمو مخصصة وعرض سعر استراتيجي
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  أجب عن الخطوات البسيطة التالية لنقوم بتحليل وضع علامتك الحالية وإعداد خارطة طريق واضحة بالأرقام قبل جلسة النقاش.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="w-full max-w-xl mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      step === 1 || step === 2 || step === 3 || step === 'success'
                        ? 'bg-primary-container text-white shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    1
                  </span>
                  <span className="hidden sm:inline text-text-primary">الخدمة المطلوبة</span>
                </div>
                <div className="h-0.5 flex-1 mx-3 bg-surface-container-highest relative">
                  <div
                    className="absolute top-0 right-0 h-full bg-primary-container transition-all duration-300"
                    style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                  />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      step === 2 || step === 3 || step === 'success'
                        ? 'bg-primary-container text-white shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    2
                  </span>
                  <span className="hidden sm:inline text-on-surface-variant">الميزانية الشهرية</span>
                </div>
                <div className="h-0.5 flex-1 mx-3 bg-surface-container-highest" />
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      step === 3 || step === 'success'
                        ? 'bg-primary-container text-white shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    3
                  </span>
                  <span className="hidden sm:inline text-on-surface-variant">بيانات التواصل</span>
                </div>
              </div>

              {/* Form Glass Container */}
              <div className="w-full rounded-3xl bg-surface-container/70 border border-white/5 p-6 md:p-10 shadow-2xl relative overflow-hidden">
                {step === 1 && (
                  <div className="flex flex-col gap-6">
                    <h3 className="font-title-lg text-title-lg text-text-primary font-bold">
                      ما هو التحدي أو الخدمة الرئيسية التي تبحث عنها؟
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          id: 'media_buying',
                          title: 'إدارة الحملات الإعلانية',
                          desc: 'مضاعفة المبيعات والعائد (ROAS) عبر Meta, TikTok, Google'
                        },
                        {
                          id: 'web_dev',
                          title: 'تطوير متجر أو منصة سريعة',
                          desc: 'Next.js فائقة السرعة مع ربط الدفع والتحليلات'
                        },
                        {
                          id: 'full_growth',
                          title: 'منظومة نمو كاملة (Full Stack)',
                          desc: 'إعلانات + برمجة + إنتاج محتوى إبداعي مستمر'
                        }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedService(item.id)}
                          type="button"
                          className={`p-5 rounded-2xl text-right flex flex-col justify-between transition-all border ${
                            selectedService === item.id
                              ? 'bg-primary-container/20 border-primary shadow-lg shadow-glow-crimson/20'
                              : 'bg-surface-container-high/60 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="font-bold text-sm text-text-primary mb-2">
                            {item.title}
                          </span>
                          <span className="text-xs text-on-surface-variant leading-relaxed">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        onClick={() => setStep(2)}
                        type="button"
                        className="px-8 py-3 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-[#e60036] transition-all flex items-center gap-2"
                      >
                        <span>الخطوة التالية</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-6">
                    <h3 className="font-title-lg text-title-lg text-text-primary font-bold">
                      ما هو متوسط ميزانيتكم الإعلانية الشهرية المتوقعة؟
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: '10k_25k', label: '10,000$ - 25,000$ شهرياً' },
                        { id: '25k_50k', label: '25,000$ - 50,000$ شهرياً' },
                        { id: '50k_100k', label: '50,000$ - 100,000$ شهرياً' },
                        { id: '100k_plus', label: 'أكثر من 100,000$ شهرياً (Enterprise)' }
                      ].map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBudget(b.id)}
                          type="button"
                          className={`p-5 rounded-2xl text-right transition-all border ${
                            budget === b.id
                              ? 'bg-primary-container/20 border-primary shadow-lg shadow-glow-crimson/20 text-primary font-bold'
                              : 'bg-surface-container-high/60 border-white/5 hover:border-white/20 text-on-surface-variant'
                          }`}
                        >
                          <span className="text-sm">{b.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <button
                        onClick={() => setStep(1)}
                        type="button"
                        className="text-xs text-on-surface-variant hover:text-text-primary transition-colors"
                      >
                        العودة للسابق
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        type="button"
                        className="px-8 py-3 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-[#e60036] transition-all flex items-center gap-2"
                      >
                        <span>الخطوة التالية</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <h3 className="font-title-lg text-title-lg text-text-primary font-bold">
                      أدخل بيانات التواصل لتجهيز دراسة الجدوى
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-on-surface-variant font-medium">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="مثال: عبدالله الشمري"
                          className="px-4 py-3 rounded-xl bg-surface-container-highest border border-white/5 text-text-primary text-xs focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-on-surface-variant font-medium">رقم الواتساب مع المفتاح الدولي *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+966 50 000 0000"
                          className="px-4 py-3 rounded-xl bg-surface-container-highest border border-white/5 text-text-primary text-xs focus:outline-none focus:border-primary transition-colors text-left"
                          dir="ltr"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-on-surface-variant font-medium">اسم المتجر أو الشركة *</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="مثال: متجر لين للعبايات"
                          className="px-4 py-3 rounded-xl bg-surface-container-highest border border-white/5 text-text-primary text-xs focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-on-surface-variant font-medium">البريد الإلكتروني للعمل *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ceo@company.com"
                          className="px-4 py-3 rounded-xl bg-surface-container-highest border border-white/5 text-text-primary text-xs focus:outline-none focus:border-primary transition-colors text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-on-surface-variant font-medium">
                        رابط المتجر أو ملاحظات إضافية (اختياري)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="رابط الموقع، المشاكل الحالية مع الوكالة السابقة..."
                        className="px-4 py-3 rounded-xl bg-surface-container-highest border border-white/5 text-text-primary text-xs focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <button
                        onClick={() => setStep(2)}
                        type="button"
                        className="text-xs text-on-surface-variant hover:text-text-primary transition-colors"
                      >
                        العودة للسابق
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-[#e60036] shadow-lg shadow-glow-crimson transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>إرسال الطلب وحجز الجلسة الآن</span>
                      </button>
                    </div>
                  </form>
                )}

                {step === 'success' && (
                  <div className="flex flex-col items-center text-center py-8 gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      تم استلام طلبك بنجاح!
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
                      رقم المرجع الخاص بك:{' '}
                      <span className="font-mono font-bold text-primary">#BS-{refNumber}</span>.
                      يقوم فريق التحليل الاستراتيجي الآن بمراجعة بياناتك وسيتواصل معك مدير النمو خلال أقل من 30 دقيقة عبر الواتساب لتنسيق موعد الجلسة.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs text-primary underline"
                      >
                        إرسال طلب آخر
                      </button>
                      <a
                        href="https://wa.me/966501234567"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-xs font-bold text-on-surface flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>متابعة فورية عبر واتساب</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 10: FUTURISTIC HOLOGRAPHIC FAQ ACCORDION */}
          <section className="w-full py-24 px-gutter relative bg-surface-container-lowest/60 border-t border-white/5" id="faq">
            <div className="max-w-4xl mx-auto flex flex-col gap-10">
              <div className="text-center flex flex-col items-center gap-2">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                  FAQ & GUARANTEES
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  الأسئلة الشائعة وضمانات الشراكة
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  إجابات واضحة وشفافة حول نموذج عملنا والضمانات التي نقدمها لشركاء النمو.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-surface-container/70 border border-white/5 overflow-hidden transition-all shadow-md"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-text-primary hover:text-primary transition-colors"
                        type="button"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 11: GRAND BOTTOM CYBERNETIC CTA PORTAL */}
          <section className="w-full py-24 px-gutter relative">
            <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-l from-primary-container/25 via-surface-container to-surface-container-low border border-primary/40 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-glow-crimson/20 relative overflow-hidden">
              <div className="flex flex-col gap-3 text-center md:text-right max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-bold mx-auto md:mx-0">
                  <Sparkles className="w-4 h-4" />
                  <span>جاهز للهيمنة على السوق؟</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-text-primary font-bold leading-tight">
                  دعنا نبني محرك نموك الرقمي القادم بأعلى كفاءة في الشرق الأوسط
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  احجز جلسة استراتيجية وتدقيقاً مجانياً لحساباتك الإعلانية أو منصتك الرقمية الآن.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-primary-container hover:bg-[#e60036] text-white font-bold text-xs shadow-xl shadow-glow-crimson transition-all"
                >
                  طلب استشارة وتدقيق تقني
                </Link>
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-on-surface font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>واتساب مباشر</span>
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
