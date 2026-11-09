import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { DataStoreProvider, useDataStore } from '../lib/store';
import PricingPage from '../app/pricing/page';
import PortfolioPage from '../app/portfolio/page';
import Footer from '../components/Footer';

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

// Mock Counter component
vi.mock('../components/Counter', () => ({
  default: ({ end, prefix = '', suffix = '' }: any) => (
    <span>{prefix}{end}{suffix}</span>
  ),
}));

// Mock CyberSpiderWeb
vi.mock('../components/CyberSpiderWeb', () => ({
  default: () => <div data-testid="cyber-spider-web" />,
}));

// Test consumer component
function TestConsumer({ onStore }: { onStore: (store: ReturnType<typeof useDataStore>) => void }) {
  const store = useDataStore();
  React.useEffect(() => {
    onStore(store);
  }, [store, onStore]);

  return (
    <div>
      <div data-testid="pkg-count">{store.packages.length}</div>
      {store.packages.map((p) => (
        <div key={p.id} data-testid={`pkg-${p.id}`}>
          <span data-testid={`pkg-name-${p.id}`}>{p.tier_name}</span>
          <span data-testid={`pkg-price-${p.id}`}>{p.monthly_price}</span>
        </div>
      ))}
      <div data-testid="settings-phone">{store.settings.agencyPhone}</div>
      <div data-testid="settings-email">{store.settings.agencyEmail}</div>
    </div>
  );
}

describe('Admin Dashboard to Front-End Data Synchronization', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('1. Store Persistence (LocalStorage Fallback)', () => {
    it('persists package updates to localStorage and reloads them on fresh mount', async () => {
      let storeRef: any;

      const { unmount } = render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { storeRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
        expect(storeRef.packages.length).toBeGreaterThan(0);
      });

      const firstPkg = storeRef.packages[0];
      const targetId = firstPkg.id;
      const updatedPrice = 9999;
      const updatedName = 'باقة الاختبار الفائقة VIP';

      // Simulate Admin editing package
      await act(async () => {
        await storeRef.updatePackage(targetId, {
          monthly_price: updatedPrice,
          tier_name: updatedName,
        });
      });

      // Verify immediate local update in same tree
      expect(screen.getByTestId(`pkg-name-${targetId}`).textContent).toBe(updatedName);
      expect(screen.getByTestId(`pkg-price-${targetId}`).textContent).toBe(String(updatedPrice));

      // Unmount the tree (simulating closing tab or navigating away)
      unmount();

      // Mount a BRAND NEW DataStoreProvider (simulating a new tab or page refresh)
      let freshStoreRef: any;
      render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { freshStoreRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(freshStoreRef).toBeDefined();
      });

      // The new instance MUST have loaded the edited values from persistent storage!
      const pkgInNewInstance = freshStoreRef.packages.find((p: any) => p.id === targetId);
      expect(pkgInNewInstance).toBeDefined();
      expect(pkgInNewInstance.monthly_price).toBe(updatedPrice);
      expect(pkgInNewInstance.tier_name).toBe(updatedName);
    });

    it('persists system settings updates and reloads them on fresh mount', async () => {
      let storeRef: any;

      const { unmount } = render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { storeRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      await act(async () => {
        await storeRef.updateSettings({
          agencyPhone: '+966 59 999 8888',
          agencyEmail: 'updated-admin@blackspider.agency',
        });
      });

      expect(screen.getByTestId('settings-phone').textContent).toBe('+966 59 999 8888');
      expect(screen.getByTestId('settings-email').textContent).toBe('updated-admin@blackspider.agency');

      unmount();

      let freshStoreRef: any;
      render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { freshStoreRef = s; }} />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(freshStoreRef).toBeDefined();
      });

      expect(freshStoreRef.settings.agencyPhone).toBe('+966 59 999 8888');
      expect(freshStoreRef.settings.agencyEmail).toBe('updated-admin@blackspider.agency');
    });
  });

  describe('2. Front-End Pricing Page Dynamic Binding', () => {
    it('reflects updated package names and prices on the /pricing page', async () => {
      let storeRef: any;

      const { rerender } = render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { storeRef = s; }} />
          <PricingPage />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const firstPkg = storeRef.packages[0];
      const targetId = firstPkg.id;
      const customPrice = 7777;
      const customName = 'باقة الاستثمار المخصصة للمؤسسات';

      await act(async () => {
        await storeRef.updatePackage(targetId, {
          monthly_price: customPrice,
          tier_name: customName,
        });
      });

      // The pricing page should now render the custom tier name and price
      await waitFor(() => {
        expect(screen.getAllByText(new RegExp(customName, 'i')).length).toBeGreaterThan(0);
        expect(screen.getAllByText(new RegExp(`\\$${customPrice.toLocaleString()}`, 'i')).length).toBeGreaterThan(0);
      });
    });
  });

  describe('3. Front-End Portfolio Page Dynamic Binding', () => {
    it('reflects updated projects on the /portfolio page', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { storeRef = s; }} />
          <PortfolioPage />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const customTitle = 'دراسة حالة استثنائية: نمو متجر الفخامة 800%';
      await act(async () => {
        await storeRef.addProject({
          title: customTitle,
          client_name: 'شركة الفخامة العالمية',
          category: 'ecommerce',
          category_label: 'تجارة إلكترونية',
          metric_badge: '+800% ROAS',
          metric_label: 'عائد الاستثمار',
          thumbnail_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
          description: 'تفاصيل دراسة الحالة المضافة حديثاً من لوحة الإدارة.',
          tags: ['Meta Ads', 'Scale'],
          timeline: '30 يوماً',
        });
      });

      await waitFor(() => {
        expect(screen.getAllByText(new RegExp(customTitle, 'i')).length).toBeGreaterThan(0);
      });
    });
  });

  describe('4. Footer Dynamic Settings Binding', () => {
    it('displays the dynamic agency contact details from store settings in the Footer', async () => {
      let storeRef: any;

      render(
        <DataStoreProvider>
          <TestConsumer onStore={(s) => { storeRef = s; }} />
          <Footer />
        </DataStoreProvider>
      );

      await waitFor(() => {
        expect(storeRef).toBeDefined();
      });

      const customPhone = '+966 54 321 0000';
      const customEmail = 'executive-ops@blackspider.agency';

      await act(async () => {
        await storeRef.updateSettings({
          agencyPhone: customPhone,
          agencyEmail: customEmail,
        });
      });

      await waitFor(() => {
        expect(screen.getAllByText(new RegExp(customPhone.replace('+', '\\+'), 'i')).length).toBeGreaterThan(0);
        expect(screen.getAllByText(new RegExp(customEmail, 'i')).length).toBeGreaterThan(0);
      });
    });
  });
});
