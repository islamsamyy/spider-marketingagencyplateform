import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { DataStoreProvider, useDataStore } from '../lib/store';
import BlogPage from '../app/blog/page';
import ContactPage from '../app/contact/page';
import { POST as storeApiHandler } from '../app/api/admin/store/route';
import { NextRequest } from 'next/server';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock CyberSpiderWeb
vi.mock('../components/CyberSpiderWeb', () => ({
  default: () => <div data-testid="cyber-spider-web" />,
}));

// Mock Counter
vi.mock('../components/Counter', () => ({
  default: ({ end, prefix = '', suffix = '' }: any) => (
    <span>{prefix}{end}{suffix}</span>
  ),
}));

// Consumer component helper
function ConsumerHelper({ onStore }: { onStore: (store: ReturnType<typeof useDataStore>) => void }) {
  const store = useDataStore();
  React.useEffect(() => {
    onStore(store);
  }, [store, onStore]);

  return (
    <div>
      <div data-testid="active-reviews-count">{store.reviews.filter(r => r.status === 'approved').length}</div>
      <div data-testid="active-posts-count">{store.blogPosts.filter(p => p.published).length}</div>
      <div data-testid="active-leads-count">{store.leads.length}</div>
      <div data-testid="active-invoices-count">{store.invoices.length}</div>
      {store.reviews.filter(r => r.status === 'approved').map(r => (
        <div key={r.id} data-testid={`review-${r.id}`}>{r.review_text}</div>
      ))}
    </div>
  );
}

describe('Enterprise Full-Suite Verification Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('1. Cross-Tab Live Synchronization (BroadcastChannel)', () => {
    it('synchronizes state between two independent DataStoreProvider trees in real time', async () => {
      let tab1Store: any;
      let tab2Store: any;

      // Render Tab 1 (Admin tab)
      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { tab1Store = s; }} />
        </DataStoreProvider>
      );

      // Render Tab 2 (Front-End tab)
      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { tab2Store = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(tab1Store).toBeDefined();
        expect(tab2Store).toBeDefined();
      });

      const updatedPrice = 4500;
      const firstPkg = tab1Store.packages[0];

      // Tab 1 edits package
      await act(async () => {
        await tab1Store.updatePackage(firstPkg.id, {
          monthly_price: updatedPrice,
          tier_name: 'باقة التزامن اللحظي بين التبويبات',
        });
      });

      // Tab 2 MUST reflect the updated package without a page reload!
      await waitFor(() => {
        const pkgInTab2 = tab2Store.packages.find((p: any) => p.id === firstPkg.id);
        expect(pkgInTab2.monthly_price).toBe(updatedPrice);
        expect(pkgInTab2.tier_name).toBe('باقة التزامن اللحظي بين التبويبات');
      });
    });
  });

  describe('2. Blog Posts CMS & Front-End Reflection', () => {
    it('reflects new published blog posts on the /blog page and hides unpublished posts', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { storeRef = s; }} />
          <BlogPage />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const testPostTitle = 'كيف تضاعف مبيعات متجرك بنسبة 400% باستخدام هندسة CAPI';
      let createdPostId: string = '';

      // Admin adds unpublished draft
      await act(async () => {
        await storeRef.addBlogPost({
          title: testPostTitle,
          slug: 'double-sales-capi-guide',
          excerpt: 'دليل عملي لتجاوز قيود الخصوصية وتحسين تتبع الإعلانات.',
          content: 'تفاصيل الدليل الكامل لهندسة التتبع...',
          cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
          reading_time: '5 دقائق',
          category: 'engineering',
          author: 'فريق هندسة النمو',
          published: false, // Draft!
        });
      });

      // Post is draft, should NOT appear on public blog page
      expect(screen.queryByText(testPostTitle)).toBeNull();

      // Admin publishes post
      const draft = storeRef.blogPosts.find((p: any) => p.title === testPostTitle);
      expect(draft).toBeDefined();
      createdPostId = draft.id;

      await act(async () => {
        await storeRef.togglePostPublish(createdPostId);
      });

      // Now it MUST appear on the /blog page!
      await waitFor(() => {
        expect(screen.getByText(testPostTitle)).toBeDefined();
      });
    });
  });

  describe('3. Reviews Moderation & Front-End Reflection', () => {
    it('displays reviews only when approved by admin in the dashboard', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { storeRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const clientReview = 'وكالة استثنائية نقلت متجرنا إلى مستوى جديد تماماً!';

      await act(async () => {
        await storeRef.addReview({
          client_name: 'فيصل القحطاني',
          client_role: 'الرئيس التنفيذي',
          company: 'مجموعة القحطاني للتجارة',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
          rating: 5,
          review_text: clientReview,
          roas_boost: '+420%',
          status: 'pending', // Pending moderation
        });
      });

      // Not visible yet because pending
      expect(screen.queryByText(clientReview)).toBeNull();

      // Admin approves review
      const addedReview = storeRef.reviews.find((r: any) => r.review_text === clientReview);
      expect(addedReview).toBeDefined();

      await act(async () => {
        await storeRef.setReviewStatus(addedReview.id, 'approved');
      });

      // Now visible!
      await waitFor(() => {
        expect(screen.getByText(clientReview)).toBeDefined();
      });
    });
  });

  describe('4. CRM Leads Pipeline Integration', () => {
    it('records leads submitted from the front-end and allows stage transitions in CRM', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { storeRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const initialCount = storeRef.leads.length;

      await act(async () => {
        await storeRef.addLead({
          client_name: 'سعود الدوسري',
          company: 'شركة الأفق الرقمي',
          email: 'saud@alofoq.sa',
          phone: '+966500001122',
          service: 'media_buying',
          budget: '$50,000 / Mo',
          stage: 'new',
          source: 'Website Contact Page',
        });
      });

      expect(storeRef.leads.length).toBe(initialCount + 1);
      const newLead = storeRef.leads[0];
      expect(newLead.client_name).toBe('سعود الدوسري');
      expect(newLead.stage).toBe('new');

      // Admin moves lead stage to 'closed_won'
      await act(async () => {
        await storeRef.moveLeadStage(newLead.id, 'closed_won');
      });

      const updatedLead = storeRef.leads.find((l: any) => l.id === newLead.id);
      expect(updatedLead.stage).toBe('closed_won');
    });
  });

  describe('5. Invoices & Financial Tracking', () => {
    it('manages invoices and updates payment statuses', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { storeRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const initialCount = storeRef.invoices.length;

      await act(async () => {
        await storeRef.addInvoice({
          invoice_number: 'INV-2026-999',
          client_name: 'شركة النماء الخليجية',
          company: 'النماء القابضة',
          amount: 15000,
          status: 'pending',
          due_date: '2026-12-01',
          service: 'Media Buying & CAPI Setup',
        });
      });

      expect(storeRef.invoices.length).toBe(initialCount + 1);
      const addedInv = storeRef.invoices[0];
      expect(addedInv.status).toBe('pending');

      await act(async () => {
        await storeRef.markInvoicePaid(addedInv.id);
      });

      const paidInv = storeRef.invoices.find((i: any) => i.id === addedInv.id);
      expect(paidInv.status).toBe('paid');
    });
  });

  describe('6. Server-Side /api/admin/store Route Handler', () => {
    it('handles validation and rejects requests with missing or invalid table', async () => {
      const mockReq = new NextRequest('http://localhost:3000/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save' }), // Missing table
      });

      const res = await storeApiHandler(mockReq);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('table is required');
    });

    it('rejects unsupported tables safely', async () => {
      const mockReq = new NextRequest('http://localhost:3000/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'dangerous_table', action: 'save' }),
      });

      const res = await storeApiHandler(mockReq);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('unsupported table');
    });

    it('gracefully handles non-UUID delete requests as local deletions', async () => {
      const mockReq = new NextRequest('http://localhost:3000/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'packages', action: 'delete', id: 'pkg-mock-1234' }),
      });

      const res = await storeApiHandler(mockReq);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
    });
  });

  describe('7. Contact Page Form & WhatsApp Binding', () => {
    it('uses dynamic settings for executive WhatsApp contact link on the contact page', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <ConsumerHelper onStore={(s) => { storeRef = s; }} />
          <ContactPage />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const customWhatsApp = '966555554433';
      const customPhone = '+966 55 555 4433';

      await act(async () => {
        await storeRef.updateSettings({
          agencyWhatsApp: customWhatsApp,
          agencyPhone: customPhone,
        });
      });

      await waitFor(() => {
        expect(screen.getAllByText(new RegExp(customPhone.replace('+', '\\+'), 'i')).length).toBeGreaterThan(0);
        const waLink = document.querySelector(`a[href*="${customWhatsApp}"]`);
        expect(waLink).toBeDefined();
      });
    });
  });
});
