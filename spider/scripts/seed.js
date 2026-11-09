if (typeof global.WebSocket === 'undefined') {
  global.WebSocket = class WebSocket {};
}
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://aijgzvgnmjjvkxqrgfhm.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamd6dmdubWpqdmt4cXJnZmhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NDE3MzU5NCwiZXhwIjoyMTA5NzQ5NTk0fQ.AYl5gpF8X53rFFwFd6f_fAYr9eusm5Ew2r6OzhVQ4yQ';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createAuthUserIfNotExists(email, password, fullName, role) {
  // Check if user already exists
  const { data: usersData, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) throw listErr;

  let existing = usersData.users.find(u => u.email === email);
  if (!existing) {
    console.log(`Creating user: ${email}...`);
    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role },
      app_metadata: { role }
    });
    if (createErr) throw createErr;
    existing = created.user;
  } else {
    console.log(`User ${email} already exists (${existing.id})`);
    await supabase.auth.admin.updateUserById(existing.id, {
      user_metadata: { full_name: fullName, role },
      app_metadata: { role }
    });
  }

  // Upsert user_profile
  const { error: profileErr } = await supabase.from('user_profiles').upsert({
    id: existing.id,
    email: email,
    full_name: fullName,
    role: role,
    is_active: true,
    updated_at: new Date().toISOString()
  });
  if (profileErr) throw profileErr;

  return existing.id;
}

async function seed() {
  console.log('Seeding initial data with complete relational integrity...');

  // 1. Create Admins / Team
  const superAdminId = await createAuthUserIfNotExists(
    'admin@blackspider.agency',
    'BlackSpider@2026!',
    'المدير العام (Super Admin)',
    'super_admin'
  );

  const salesManagerId = await createAuthUserIfNotExists(
    'sales@blackspider.agency',
    'BlackSpider@2026!',
    'مدير المبيعات (Sales Manager)',
    'sales_manager'
  );

  const financeManagerId = await createAuthUserIfNotExists(
    'finance@blackspider.agency',
    'BlackSpider@2026!',
    'المدير المالي (Finance Manager)',
    'finance_manager'
  );

  const contentEditorId = await createAuthUserIfNotExists(
    'content@blackspider.agency',
    'BlackSpider@2026!',
    'مسؤول المحتوى (Content Editor)',
    'content_editor'
  );

  console.log('Users created / verified successfully.');

  // 2. System Settings
  const { error: settingsErr } = await supabase.from('system_settings').upsert({
    id: 1,
    agency_name: 'بلاك سبايدر | Black Spider Agency',
    agency_phone: '+966 50 123 4567',
    agency_whatsapp: '966501234567',
    agency_email: 'contact@blackspider.agency',
    currency: 'USD',
    stitch_api_key: 'st_live_994827103847',
    meta_pixel_id: '8839201948201',
    meta_capi_token: 'EAAGm0PX4ZBqwBO...',
    tiktok_pixel_id: 'TT-9928103-SPIDER',
    updated_by: superAdminId,
    updated_at: new Date().toISOString()
  });
  if (settingsErr) console.error('Settings error:', settingsErr);
  else console.log('System settings seeded.');

  // 3. Packages
  const packagesData = [
    {
      tier_name: 'باقة الانطلاق الرقمي (Starter)',
      tier_name_en: 'Starter Launch',
      monthly_price: 990,
      quarterly_price: 2490,
      popular: false,
      description: 'مثالية للشركات الناشئة والمتاجر في بدايتها التي تبحث عن بناء حضور إعلاني قوي وتحقيق أولى مبيعاتها بثبات.',
      features: [
        'إدارة منصتين إعلانيتين (Snapchat + Meta)',
        'صناعة 8 تصميمات وفيديوهات إعلانية شهرياً',
        'ضبط بكسل التتبع والـ Conversion API',
        'تقرير أداء أسبوعي مباشر واجتماع نصف شهري',
        'دعم فني واستشاري عبر واتساب مخصص'
      ],
      whatsapp_message: 'مرحباً، أود الاشتراك في باقة الانطلاق الرقمي (Starter) والاستفسار عن موعد البدء.',
      sort_order: 1,
      created_by: superAdminId
    },
    {
      tier_name: 'باقة التوسع ومضاعفة العائد (Growth)',
      tier_name_en: 'Scale & Growth',
      monthly_price: 2490,
      quarterly_price: 6200,
      popular: true,
      description: 'الخيار الأقوى للعلامات التجارية والمتاجر التي تتطلع إلى كسر حاجز المليون ومضاعفة معدل العائد الإعلاني ROAS بشكل متسارع.',
      features: [
        'إدارة شاملة لجميع المنصات (TikTok + Meta + Google Ads + Snapchat)',
        'صناعة 20 إعلان إبداعي و UGC فيديوهات مخصصة شهرياً',
        'هندسة مسارات بيع متقدمة وتحسين معدل التحويل (CRO)',
        'لوحة تحكم إحصائية حية 24/7 لمتابعة العائد الفعلي',
        'مدير حساب مخصص واجتماعات استراتيجية أسبوعية'
      ],
      whatsapp_message: 'مرحباً، أود التعاقد على باقة التوسع ومضاعفة العائد (Growth) لبدء خطة التوسع.',
      sort_order: 2,
      created_by: superAdminId
    },
    {
      tier_name: 'باقة الهيمنة المتكاملة (Enterprise)',
      tier_name_en: 'Full Dominance',
      monthly_price: 4990,
      quarterly_price: 12500,
      popular: false,
      description: 'حل نخبوي متكامل للمؤسسات والشركات الكبرى التي تطلب إدارة أداء كاملة مع تطوير برمجيات خاصة وتخصيص فريق عمل كامل.',
      features: [
        'فريق تسويق وبرمجة متفرغ بالكامل تحت تصرفك',
        'ميزانيات إعلانية مفتوحة مع اختبارات A/B يومية على مدار الساعة',
        'تطوير وتحديث متجر الكتروني أو تطبيق ويب فائق السرعة',
        'ربط مستودعات وأنظمة CRM مخصصة وأتمتة مبيعات ذكية',
        'اتفاقية مستوى خدمة SLA مع خط ساخن مخصص'
      ],
      whatsapp_message: 'مرحباً، نرغب في جدولة اجتماع لمناقشة باقة الهيمنة المتكاملة (Enterprise) لشركتنا.',
      sort_order: 3,
      created_by: superAdminId
    }
  ];

  const { data: insertedPackages, error: pkgErr } = await supabase
    .from('packages')
    .upsert(packagesData, { onConflict: 'tier_name' })
    .select();

  if (pkgErr) throw pkgErr;
  console.log(`Seeded ${insertedPackages.length} packages.`);

  const starterPkg = insertedPackages.find(p => p.tier_name.includes('Starter')) || insertedPackages[0];
  const growthPkg = insertedPackages.find(p => p.tier_name.includes('Growth')) || insertedPackages[1];
  const enterprisePkg = insertedPackages.find(p => p.tier_name.includes('Enterprise')) || insertedPackages[2];

  // 4. Leads (with package_id and assigned_to relations)
  const leadsData = [
    {
      client_name: 'عبدالله السعيد',
      company: 'مجموعة أزياء نخبة الخليج',
      email: 'a.alsaeed@nukhba-fashion.com',
      phone: '+966 55 981 2233',
      service: 'media_buying',
      budget: '$10,000 - $25,000',
      stage: 'closed_won',
      notes: 'تم توقيع العقد ربع السنوي. الهدف مضاعفة مبيعات التخفيضات وتحقيق ROAS لا يقل عن 5x.',
      source: 'حملة جوجل الإعلانية',
      package_id: growthPkg.id,
      assigned_to: salesManagerId
    },
    {
      client_name: 'سارة المنصور',
      company: 'منصة بيوتي نكست للتجارة الإلكترونية',
      email: 'sara@beautynext.sa',
      phone: '+966 50 443 1122',
      service: 'media_buying',
      budget: '$25,000+',
      stage: 'negotiation',
      notes: 'مهتمة بالانتقال من وكالة منافسة. تم تقديم العرض الفني وننتظر الموافقة على الميزانية النهائية.',
      source: 'Google Stitch Referral',
      package_id: enterprisePkg.id,
      assigned_to: salesManagerId
    },
    {
      client_name: 'م. فهد القحطاني',
      company: 'شركة عقارات الرياض الفاخرة',
      email: 'fahad@riyadh-luxury.com',
      phone: '+966 56 778 9900',
      service: 'web_dev',
      budget: '$15,000 - $30,000',
      stage: 'contacted',
      notes: 'طلب تطوير منصة عقارية تفاعلية ثلاثية الأبعاد وربطها بنظام تتبع العملاء المتوقعين.',
      source: 'استمارة تواصل الموقع',
      package_id: starterPkg.id,
      assigned_to: salesManagerId
    },
    {
      client_name: 'د. طارق الهاشمي',
      company: 'سلسلة عيادات بلاتينيوم الطبية',
      email: 'dr.tariq@platinum-clinics.com',
      phone: '+971 50 112 3344',
      service: 'content_creation',
      budget: '$5,000 - $10,000',
      stage: 'new',
      notes: 'عميل جديد مهتم بإدارة محتوى السوشيال ميديا وحملات سناب شات وتيك توك.',
      source: 'رسائل واتساب المباشرة',
      package_id: starterPkg.id,
      assigned_to: salesManagerId
    }
  ];

  const { data: insertedLeads, error: leadsErr } = await supabase
    .from('leads')
    .upsert(leadsData, { onConflict: 'email' })
    .select();

  if (leadsErr) throw leadsErr;
  console.log(`Seeded ${insertedLeads.length} leads.`);

  const wonLead = insertedLeads.find(l => l.stage === 'closed_won') || insertedLeads[0];
  const negotiationLead = insertedLeads.find(l => l.stage === 'negotiation') || insertedLeads[1];

  // 5. Invoices (with lead_id, package_id, created_by relations)
  const invoicesData = [
    {
      invoice_number: 'INV-2026-001',
      client_name: wonLead.client_name,
      company: wonLead.company,
      amount: 6200,
      status: 'paid',
      due_date: '2026-03-01',
      service: 'إدارة حملات الميديا باينج - باقة التوسع الربع سنوية',
      lead_id: wonLead.id,
      package_id: growthPkg.id,
      created_by: financeManagerId
    },
    {
      invoice_number: 'INV-2026-002',
      client_name: negotiationLead.client_name,
      company: negotiationLead.company,
      amount: 4990,
      status: 'pending',
      due_date: '2026-03-15',
      service: 'الدفعة الأولى - باقة الهيمنة المتكاملة Enterprise',
      lead_id: negotiationLead.id,
      package_id: enterprisePkg.id,
      created_by: financeManagerId
    },
    {
      invoice_number: 'INV-2026-003',
      client_name: 'أكاديمية رواد الغد التعليمية',
      company: 'رواد الغد الرقمية',
      amount: 2490,
      status: 'paid',
      due_date: '2026-02-28',
      service: 'خدمات إطلاق المنصة وحملات تسجيل الطلاب',
      lead_id: null,
      package_id: starterPkg.id,
      created_by: financeManagerId
    },
    {
      invoice_number: 'INV-2026-004',
      client_name: 'شركة نماء للاستثمار العقاري',
      company: 'نماء العقارية',
      amount: 7500,
      status: 'overdue',
      due_date: '2026-02-15',
      service: 'تطوير موقع عقاري مخصص وحملات تسويقية متزامنة',
      lead_id: null,
      package_id: null,
      created_by: financeManagerId
    }
  ];

  const { data: insertedInvoices, error: invErr } = await supabase
    .from('invoices')
    .upsert(invoicesData, { onConflict: 'invoice_number' })
    .select();

  if (invErr) throw invErr;
  console.log(`Seeded ${insertedInvoices.length} invoices.`);

  // 6. Projects / Case Studies (with lead_id, package_id, author_id relations)
  const projectsData = [
    {
      title: 'مضاعفة مبيعات متجر عطور فاخر في موسم التخفيضات الكبرى',
      client_name: wonLead.company,
      category: 'ecommerce',
      category_label: 'تجارة إلكترونية',
      metric_badge: '+640% ROAS',
      metric_label: 'عائد الاستثمار الإعلاني المحقق',
      thumbnail_url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
      description: 'إعادة هيكلة كاملة لحسابات سناب شات وتيك توك، وبناء مسار إعلاني ذكي استهدف جمهور الخليج عالي القيمة مع محتوى UGC تفاعلي أدى لمضاعفة المبيعات خلال 45 يوماً.',
      tags: ['Media Buying', 'Snapchat Ads', 'TikTok Ads', 'UGC Content', 'Shopify Plus'],
      timeline: '45 يوماً عمل',
      lead_id: wonLead.id,
      package_id: growthPkg.id,
      author_id: superAdminId
    },
    {
      title: 'بناء وهندسة منصة SaaS متطورة لإدارة وتتبع اللوجستيات الذكية',
      client_name: 'LogiFlow Solutions',
      category: 'saas',
      category_label: 'تطبيقات سحابية SaaS',
      metric_badge: '180,000+ مستخدم نشط',
      metric_label: 'توسع قياسي خلال أول 6 أشهر',
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      description: 'تصميم وبناء نظام سحابي معقد باستخدام Next.js 16 و Supabase مع واجهة مستخدم مظلمة فائقة السرعة ولوحات تحكم تفاعلية معالجة بأحدث معايير الأداء.',
      tags: ['Next.js 16', 'Supabase', 'Tailwind CSS', 'WebSockets', 'Dashboard UX'],
      timeline: '3 أشهر تطوير متواصل',
      lead_id: null,
      package_id: enterprisePkg.id,
      author_id: superAdminId
    },
    {
      title: 'إطلاق وتوسيع مشروع أبراج النخبة السكنية بالعاصمة الرياض',
      client_name: 'شركة نماء العقارية',
      category: 'real_estate',
      category_label: 'تطوير عقاري فاخر',
      metric_badge: '100% بيع كامل',
      metric_label: 'إغلاق مبيعات بقيمة 85 مليون ريال',
      thumbnail_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      description: 'حملة Lead Generation فائقة الدقة استهدفت كبار المستثمرين في السعودية والإمارات عبر Google Search و Meta Ads مع موقع هبوط ثلاثي الأبعاد سريع الاستجابة.',
      tags: ['Lead Generation', 'Google Ads', 'Meta CAPI', 'High-Net-Worth Targeting'],
      timeline: '60 يوماً متتالية',
      lead_id: null,
      package_id: growthPkg.id,
      author_id: superAdminId
    },
    {
      title: 'نمو استثنائي لتطبيق توصيل سريع في 5 مدن رئيسية',
      client_name: 'تطبيق فاست كليك',
      category: 'lead_gen',
      category_label: 'تطبيقات ذكية وحلول أداء',
      metric_badge: '-42% تكلفة التثبيت',
      metric_label: 'انخفاض قياسي في Cost Per Install',
      thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      description: 'تطبيق استراتيجية App Install Optimization على تيك توك وجوجل مع نماذج تتبع متطورة قادت إلى تحقيق أكثر من نصف مليون عملية تثبيت مؤكدة.',
      tags: ['App Growth', 'TikTok For Business', 'Firebase Tracking', 'A/B Creative Testing'],
      timeline: '90 يوماً',
      lead_id: null,
      package_id: growthPkg.id,
      author_id: superAdminId
    }
  ];

  const { data: insertedProjects, error: projErr } = await supabase
    .from('projects')
    .upsert(projectsData, { onConflict: 'title' })
    .select();

  if (projErr) throw projErr;
  console.log(`Seeded ${insertedProjects.length} projects.`);

  const firstProject = insertedProjects[0];

  // 7. Reviews (with project_id, lead_id, approved_by relations)
  const reviewsData = [
    {
      client_name: 'عبدالله السعيد',
      client_role: 'الرئيس التنفيذي',
      company: 'مجموعة أزياء نخبة الخليج',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      review_text: 'العمل مع فريق بلاك سبايدر غيّر مسار تجارتنا تماماً. انتقلنا من مجرد الإعلان التقليدي إلى استراتيجيات نمو تعتمد على الذكاء الاصطناعي وتحليل الأرقام بدقة مخيفة. حققنا أعلى عائد في تاريخ الشركة.',
      roas_boost: '+640% ROAS في 45 يوماً',
      status: 'approved',
      project_id: firstProject ? firstProject.id : null,
      lead_id: wonLead ? wonLead.id : null,
      approved_by: superAdminId
    },
    {
      client_name: 'د. هند العتيبي',
      client_role: 'مديرة التسويق والنمو',
      company: 'سلسلة مراكز ديرما كير',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      review_text: 'احترافية استثنائية لم أشهد مثلها في أي وكالة تسويق أخرى. التزام صارم بالمواعيد، تقارير شفافة، وفريق يفهم طبيعة السوق السعودي والخليجي بأدق تفاصيله.',
      roas_boost: 'مضاعفة العملاء 3.8x',
      status: 'approved',
      project_id: null,
      lead_id: null,
      approved_by: superAdminId
    },
    {
      client_name: 'سلطان الشمري',
      client_role: 'المؤسس والشريك الإداري',
      company: 'منصة سحاب للحلول اللوجستية',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      review_text: 'فريق المطورين في بلاك سبايدر عباقرة بمعنى الكلمة. قاموا ببناء وتصميم منصتنا السحابية بكفاءة لا تضاهى وفي وقت قياسي مع مراعاة كافة تفاصيل تجربة المستخدم.',
      roas_boost: 'أداء 99.9% وسرعة فائقة',
      status: 'approved',
      project_id: insertedProjects[1] ? insertedProjects[1].id : null,
      lead_id: null,
      approved_by: superAdminId
    }
  ];

  const { data: insertedReviews, error: revErr } = await supabase
    .from('reviews')
    .upsert(reviewsData, { onConflict: 'client_name,company' })
    .select();

  if (revErr) throw revErr;
  console.log(`Seeded ${insertedReviews.length} reviews.`);

  // 8. Blog Posts (with author_id relation)
  const blogPostsData = [
    {
      title: 'أسرار مضاعفة ROAS في إعلانات سناب شات وتيك توك للأسواق الخليجية 2026',
      slug: 'double-roas-snapchat-tiktok-gulf-2026',
      excerpt: 'دليل عملي شامل يكشف خوارزميات التوصيل الذكية وكيفية بناء زوايا إعلانية إبداعية تحقق أعلى عائد ممكن لمتاجرك الإلكترونية.',
      content: 'في ظل التغيرات المتسارعة في خوارزميات المنصات الإعلانية وتأثير الذكاء الاصطناعي في توجيه الجمهور، لم يعد شراء الإعلانات (Media Buying) مجرد تشغيل حملة وضبط ميزانية...',
      cover_image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
      reading_time: '6 دقائق قراءة',
      category: 'Media Buying & Performance',
      author: 'فريق الاستراتيجيات الإعلانية',
      author_id: contentEditorId,
      published: true
    },
    {
      title: 'لماذا يفشل 70% من المتاجر الإلكترونية في تحويل الزوار إلى مشترين؟',
      slug: 'why-ecommerce-conversion-fails-cro',
      excerpt: 'تحليل دقيق لأهم 5 أخطاء شائعة في تجربة المستخدم ومسار السلة والشراء، وطرق معالجتها فورياً لمضاعفة معدل التحويل CRO.',
      content: 'زيادة الزيارات بدون تحسين معدل التحويل هي بمثابة صب الماء في وعاء مثقوب. في هذا التحليل المتعمق نكشف كيف تعيد هندسة صفحات الهبوط لرفع أرباحك...',
      cover_image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c3?q=80&w=1200&auto=format&fit=crop',
      reading_time: '5 دقائق قراءة',
      category: 'Conversion Rate Optimization (CRO)',
      author: 'قسم هندسة تجربة المستخدم',
      author_id: contentEditorId,
      published: true
    },
    {
      title: 'الجيل الجديد من تطبيقات الويب: كيف تقود بنيات Next.js 16 تجربة التجارة فائقة السرعة',
      slug: 'nextjs-16-modern-web-apps-performance',
      excerpt: 'استكشاف لمفاهيم Server Components و Streaming والدمج مع Supabase لبناء منصات تجارية تقدم سرعة استجابة فورية بدون أي تأخير.',
      content: 'السرعة هي مفتاح الربحية في عصر الويب الفضائي الحديث. عندما يستغرق موقعك ثانية إضافية في التحميل، تفقد ما يصل إلى 20% من عملائك المحتملين...',
      cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
      reading_time: '8 دقائق قراءة',
      category: 'Web Architecture & Modern Stack',
      author: 'كبير مهندسي البرمجيات',
      author_id: superAdminId,
      published: true
    }
  ];

  const { data: insertedPosts, error: postErr } = await supabase
    .from('blog_posts')
    .upsert(blogPostsData, { onConflict: 'slug' })
    .select();

  if (postErr) throw postErr;
  console.log(`Seeded ${insertedPosts.length} blog posts.`);

  // 9. Lead Activities (with lead_id and user_id relations)
  if (wonLead) {
    const activities = [
      {
        lead_id: wonLead.id,
        user_id: salesManagerId,
        activity_type: 'call',
        description: 'مكالمة هاتفية مع العميل لمناقشة أهداف الربع الأول والميزانيات المستهدفة.'
      },
      {
        lead_id: wonLead.id,
        user_id: superAdminId,
        activity_type: 'contract',
        description: 'تم توقيع العقد الرسمي وتأكيد تفاصيل باقة النمو ربع السنوية بنجاح.'
      }
    ];

    await supabase.from('lead_activities').insert(activities);
    console.log('Seeded lead activities.');
  }

  console.log('ALL SEEDING COMPLETED SUCCESSFULLY WITH EXPLICIT TABLE RELATIONS!');
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
