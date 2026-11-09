// Database schema types matching Supabase tables and relations

export type AdminRole = 'super_admin' | 'sales_manager' | 'finance_manager' | 'content_editor';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  avatar_url?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PackageTier {
  id: string;
  tier_name: string;
  tier_name_en: string;
  monthly_price: number;
  quarterly_price: number;
  popular?: boolean;
  description: string;
  features: string[];
  whatsapp_message: string;
  sort_order?: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Lead {
  id: string;
  created_at: string;
  client_name: string;
  company: string;
  email: string;
  phone: string;
  service: 'media_buying' | 'web_engineering' | 'creative_content' | 'full_suite' | 'web_dev' | 'content_creation';
  budget: string;
  stage: 'new' | 'contacted' | 'negotiation' | 'closed_won';
  notes?: string;
  source?: string;
  package_id?: string | null;
  assigned_to?: string | null;
  package?: PackageTier | null;
  assigned_user?: UserProfile | null;
}

export interface ProjectCaseStudy {
  id: string;
  created_at: string;
  title: string;
  client_name: string;
  category: 'ecommerce' | 'saas' | 'real_estate' | 'lead_gen';
  category_label: string;
  metric_badge: string;
  metric_label: string;
  thumbnail_url: string;
  description: string;
  tags: string[];
  timeline: string;
  lead_id?: string | null;
  package_id?: string | null;
  author_id?: string | null;
  lead?: Lead | null;
  package?: PackageTier | null;
}

export interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  reading_time: string;
  category: string;
  author: string;
  author_id?: string | null;
  published: boolean;
}

export interface Review {
  id: string;
  created_at: string;
  client_name: string;
  client_role: string;
  company: string;
  avatar_url: string;
  rating: number;
  review_text: string;
  roas_boost: string;
  status: 'approved' | 'pending' | 'rejected';
  project_id?: string | null;
  lead_id?: string | null;
  approved_by?: string | null;
  project?: ProjectCaseStudy | null;
}

export interface Invoice {
  id: string;
  created_at: string;
  invoice_number: string;
  client_name: string;
  company: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  due_date: string;
  service: string;
  lead_id?: string | null;
  package_id?: string | null;
  created_by?: string | null;
  lead?: Lead | null;
  package?: PackageTier | null;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  user_id?: string | null;
  activity_type: string;
  description: string;
  created_at: string;
  user_profile?: UserProfile | null;
}

// Initial placeholder mock datasets ready for Supabase fetching
export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    created_at: '2026-11-08T10:14:00Z',
    client_name: 'عبد الله السبيعي',
    company: 'مجموعة الزمرد للتجارة الفاخرة',
    email: 'abdullah@alzumurrud.sa',
    phone: '+966501234567',
    service: 'media_buying',
    budget: '$45,000 / Mo',
    stage: 'negotiation',
    notes: 'عميل مجوهرات فاخرة يستهدف مضاعفة المبيعات بموسم الأعياد عبر سناب وإنستغرام.',
    source: 'Google Search'
  },
  {
    id: 'lead-2',
    created_at: '2026-11-08T09:42:00Z',
    client_name: 'د. عمر كمال',
    company: 'متجر نكست فيجن للإلكترونيات',
    email: 'omar@nextvision.ae',
    phone: '+971508821928',
    service: 'web_engineering',
    budget: '$28,000 Setup',
    stage: 'contacted',
    notes: 'طلب واجهة متجر Next.js مخصصة لتقليل زمن الاستجابة إلى أقل من 50ms.',
    source: 'Website Form'
  },
  {
    id: 'lead-3',
    created_at: '2026-11-08T08:15:00Z',
    client_name: 'فيصل المطيري',
    company: 'أركان كابيتال العقارية',
    email: 'faisal@arkancapital.com',
    phone: '+96599341872',
    service: 'media_buying',
    budget: '$60,000 / Mo',
    stage: 'new',
    notes: 'استهداف مشترين مؤهلين لشقق وأبراج سكنية في الكويت.',
    source: 'WhatsApp Referral'
  },
  {
    id: 'lead-4',
    created_at: '2026-11-07T14:30:00Z',
    client_name: 'م. رزان الباشا',
    company: 'منصة سيناريو للذكاء الاصطناعي',
    email: 'razan@scenario.ai',
    phone: '+966559876543',
    service: 'full_suite',
    budget: '$52,000 Fixed',
    stage: 'closed_won',
    notes: 'تم توقيع العقد السنوي للنمو الشامل وهندسة الواجهات.',
    source: 'Direct Partner'
  },
  {
    id: 'lead-5',
    created_at: '2026-11-07T11:20:00Z',
    client_name: 'بدر الزهراني',
    company: 'سلسلة مقاهي إكسير',
    email: 'bader@elixir.sa',
    phone: '+966542219901',
    service: 'creative_content',
    budget: '$18,500 / Mo',
    stage: 'contacted',
    notes: 'إنتاج 16 فيديو UGC شهرياً لحملات التيك توك الجغرافية.',
    source: 'TikTok Ad'
  }
];

export const INITIAL_PACKAGES: PackageTier[] = [
  {
    id: 'tier-1',
    tier_name: 'انطلاقة النمو (Starter Scale)',
    tier_name_en: 'Starter Scale',
    monthly_price: 1499,
    quarterly_price: 1275,
    popular: false,
    description: 'مثالية للشركات الناشئة والمتاجر في بداية التوسع الإعلاني والتقني.',
    features: [
      'إدارة حملتين إعلانيتين على منصتين رئيسيتين (Meta أو Google)',
      'إعداد تتبع CAPI ومزامنة البكسل الأساسي',
      'إنتاج 4 فيديوهات UGC / موشن أسبوعياً',
      'تدقيق فني لسرعة المتجر ومعدل التحويل (CRO)',
      'تقارير أسبوعية للنتائج وتحليل العائد الإعلاني'
    ],
    whatsapp_message: 'مرحباً بلاك سبايدر، أود الاستفسار عن باقة Starter Scale ($1,499/شهر) لتوسيع أعمالي.'
  },
  {
    id: 'tier-2',
    tier_name: 'محرك التوسع الفائق (Growth Engine)',
    tier_name_en: 'Growth Engine',
    monthly_price: 2699,
    quarterly_price: 2294,
    popular: true,
    description: 'الخيار الأكثر طلباً للعلامات التجارية التي تستهدف الهيمنة ومضاعفة المبيعات.',
    features: [
      'إدارة شاملة لـ 4 قنوات إعلانية (Meta, Snap, TikTok, Google)',
      'تتبع متقدم عبر خوادم الطرف الأول مع تجاوز قيود iOS',
      'إنتاج 12 فيديو إبداعي شهرياً + تصاميم ثنائية وثلاثية الأبعاد',
      'تطوير وتعديل برمجيات المتجر وتصميم لاندنج بيدجز مخصصة فائقة السرعة',
      'قناة Telegram مباشرة مع مديري الحملات وفريق البرمجة 24/7'
    ],
    whatsapp_message: 'مرحباً بلاك سبايدر، أرغب في حجز باقة Growth Engine ($2,699/شهر) لمضاعفة الإيرادات.'
  },
  {
    id: 'tier-3',
    tier_name: 'ريادة السوق المتكاملة (Market Leader)',
    tier_name_en: 'Market Leader',
    monthly_price: 3999,
    quarterly_price: 3399,
    popular: false,
    description: 'شراكة نمو حصرية واستراتيجية مخصصة للشركات الكبرى والمنصات التوسعية.',
    features: [
      'إدارة غير محدودة للميزانيات والقنوات الإعلانية والتسويق الآلي',
      'فريق عمل مخصص كامل (Media Buyer + Fullstack Dev + Creative Director)',
      'هندسة متجر كامل على Next.js / Headless Commerce بدون قيود سرعة',
      'إنتاج محتوى مرئي وسرد بصري مكثف (24+ فيديو وموشن ثلاثي الأبعاد)',
      'جلسات استراتيجية أسبوعية مع الإدارة العليا وضمانات أداء ملموسة'
    ],
    whatsapp_message: 'مرحباً بلاك سبايدر، مهتم بشراكة باقة Market Leader ($3,999/شهر) وأرغب في تدقيق تقني.'
  }
];

export const INITIAL_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-1',
    created_at: '2026-10-15',
    title: 'مضاعفة مبيعات متجر سديم للأزياء الراقية',
    client_name: 'سديم للأزياء (Sadeem Fashion)',
    category: 'ecommerce',
    category_label: 'تجارة إلكترونية',
    metric_badge: '+340% ROAS',
    metric_label: 'عائد الإنفاق الإعلاني',
    thumbnail_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    description: 'إعادة بناء مسار التحويل بالكامل مع إطلاق حملات UGC مستهدفة في الرياض ودبي حققت 2.4 مليون ريال خلال 60 يوماً.',
    tags: ['Meta Ads', 'TikTok Shop', 'CRO', 'Shopify Next.js'],
    timeline: '60 يوماً'
  },
  {
    id: 'proj-2',
    created_at: '2026-10-22',
    title: 'تطوير منصة كلاود لينك لإدارة اللوجستيات',
    client_name: 'كلاود لينك (CloudLink SA)',
    category: 'saas',
    category_label: 'منصات SaaS',
    metric_badge: '38ms',
    metric_label: 'زمن استجابة المنصة',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'بناء معمارية برمجية حديثة باستخدام Next.js 16 ولوحة تحكم تفاعلية رفعت معدل بقاء المستخدمين النشطين بنسبة 68%.',
    tags: ['Next.js', 'React', 'Tailwind', 'SaaS Dashboard'],
    timeline: '90 يوماً'
  },
  {
    id: 'proj-3',
    created_at: '2026-11-01',
    title: 'استقطاب مستثمرين لمشروع أبراج هورايزون',
    client_name: 'هورايزون العقارية (Horizon Real Estate)',
    category: 'real_estate',
    category_label: 'عقارات واستثمار',
    metric_badge: '820+',
    metric_label: 'مشتري مؤهل (Qualified Leads)',
    thumbnail_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    description: 'حملات إعلانية عالية الدقة على Google Search و LinkedIn Funnel لفلترة المستثمرين برؤوس أموال تفوق مليون دولار.',
    tags: ['Google Search', 'LinkedIn B2B', 'Funnels', 'Lead Gen'],
    timeline: '45 يوماً'
  },
  {
    id: 'proj-4',
    created_at: '2026-11-04',
    title: 'إطلاق تطبيق كافيهات أروما وتوسيع الفروع',
    client_name: 'سلسلة مقاهي أروما',
    category: 'lead_gen',
    category_label: 'تطبيقات ومطاعم',
    metric_badge: '+185%',
    metric_label: 'نمو الطلبات الشهرية',
    thumbnail_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    description: 'تصميم هوية بصرية مذهلة ومقاطع تيك توك فيروسية ساهمت في افتتاح 4 فروع جديدة بالمنطقة الشرقية.',
    tags: ['UGC Videos', 'TikTok Ads', '3D Motion', 'Branding'],
    timeline: '30 يوماً'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    created_at: '2026-11-05',
    title: 'كيف تتجاوز تحديثات تتبع iOS بمضاعفة العائد عبر تتبع CAPI المباشر؟',
    slug: 'capi-tracking-ios-updates-guide',
    excerpt: 'دليل عملي للمتاجر والشركات في الخليج لتثبيت تتبع الطرف الأول وربط Conversion API عبر خوادم مخصصة بدون فقدان للبيانات.',
    content: 'تفاصيل كاملة حول إعداد خوادم CAPI وتأثيرها على استهداف الجماهير المشابهة وتحسين تكلفة الشراء...',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    reading_time: '5 دقائق قراءة',
    category: 'Media Buying',
    author: 'سلطان الشمري',
    published: true
  },
  {
    id: 'post-2',
    created_at: '2026-11-02',
    title: 'لماذا تخسر 60% من مبيعاتك بسبب بطء المتجر؟ وكيف يساعد Next.js؟',
    slug: 'why-speed-matters-nextjs-ecommerce',
    excerpt: 'تحليل معمق لعلاقة سرعة التحميل بمعدل التحويل (CRO) وكيف ينقل Headless Commerce متجرك إلى سرعة تقل عن 50ms.',
    content: 'دراسة حالة بالأرقام توضح أثر خفض زمن استجابة الصفحة من 2.8 ثانية إلى 40 ميلي ثانية على زيادة إتمام الطلبات...',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    reading_time: '7 دقائق قراءة',
    category: 'Web Dev',
    author: 'م. أحمد كمال الدين',
    published: true
  },
  {
    id: 'post-3',
    created_at: '2026-10-28',
    title: 'أسرار صناعة فيديوهات UGC التي توقف التمرير وتحقق مبيعات فورية',
    slug: 'viral-ugc-secrets-gcc-market',
    excerpt: 'التركيبة السحرية للثواني الثلاث الأولى (Hook)، السرد النفسي البيعي، والتعامل مع صناع المحتوى في السوق السعودي والإماراتي.',
    content: 'تحليل أكثر من 120 إعلان فيديو ناجح في دول مجلس التعاون الخليجي وأهم المحفزات النفسية لقرار الشراء...',
    cover_image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    reading_time: '4 دقائق قراءة',
    category: 'Creative Ops',
    author: 'سارة المنصور',
    published: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    created_at: '2026-11-04',
    client_name: 'عبد العزيز التميمي',
    client_role: 'الرئيس التنفيذي',
    company: 'سديم للأزياء الراقية',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    review_text: 'نقلة نوعية بكل ما تعنيه الكلمة. مع بلاك سبايدر تضاعف العائد على الإنفاق من 1.8x إلى أكثر من 5.4x خلال شهرين فقط، مع استقرار تام للمتجر.',
    roas_boost: '+300% ROAS',
    status: 'approved'
  },
  {
    id: 'rev-2',
    created_at: '2026-10-29',
    client_name: 'م. فهد القحطاني',
    client_role: 'مدير التقنية والمنتج',
    company: 'منصة لوجستك كلاود',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    review_text: 'الفريق البرمجي في بلاك سبايدر يمتلك كفاءة هندسية نادرة. سرعة الموقع أصبحت مذهلة ومعدل الارتداد انخفض بأكثر من 45%.',
    roas_boost: '42ms Speed',
    status: 'approved'
  },
  {
    id: 'rev-3',
    created_at: '2026-10-20',
    client_name: 'ريم الشريف',
    client_role: 'المؤسسة والمديرة الإبداعية',
    company: 'براند ناتشورال كير',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    review_text: 'مقاطع الفيديو والـ UGC التي أنتجوها حققت انتشاراً فيروسياً على تيك توك وسناب شات، وكانت السبب الرئيسي في نفاد المخزون مرتين!',
    roas_boost: '+185% Sales',
    status: 'approved'
  },
  {
    id: 'rev-4',
    created_at: '2026-11-06',
    client_name: 'خالد بن ناصر',
    client_role: 'مدير العمليات',
    company: 'مجموعة الميراث للاستثمار',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    review_text: 'الاحترافية وسرعة الرد في قنوات التليجرام مدهشة. تشعر أن لديك فريقاً داخلياً متكاملاً يعمل على مدار الساعة.',
    roas_boost: '+4.9x ROI',
    status: 'pending'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    created_at: '2026-11-01',
    invoice_number: 'INV-2026-881',
    client_name: 'عبد الله السبيعي',
    company: 'مجموعة الزمرد للتجارة الفاخرة',
    amount: 4500,
    status: 'paid',
    due_date: '2026-11-05',
    service: 'Growth Engine - شهر نوفمبر'
  },
  {
    id: 'inv-2',
    created_at: '2026-11-03',
    invoice_number: 'INV-2026-882',
    client_name: 'د. عمر كمال',
    company: 'متجر نكست فيجن للإلكترونيات',
    amount: 14000,
    status: 'paid',
    due_date: '2026-11-10',
    service: 'دفعة أولى - تطوير متجر Next.js'
  },
  {
    id: 'inv-3',
    created_at: '2026-11-06',
    invoice_number: 'INV-2026-883',
    client_name: 'فيصل المطيري',
    company: 'أركان كابيتال العقارية',
    amount: 6000,
    status: 'pending',
    due_date: '2026-11-15',
    service: 'إدارة حملات Google Search و Funnel'
  },
  {
    id: 'inv-4',
    created_at: '2026-10-25',
    invoice_number: 'INV-2026-879',
    client_name: 'بدر الزهراني',
    company: 'سلسلة مقاهي إكسير',
    amount: 2850,
    status: 'overdue',
    due_date: '2026-11-01',
    service: 'إنتاج محتوى UGC وحملات تيك توك'
  }
];

