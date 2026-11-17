# Black Spider (`spider-marketingagencyplateform`) — Marketing Agency Platform & Operations Suite

<p align="center">
  <img src="./spider/public/logo.svg" alt="Black Spider Logo" width="160" />
</p>

## Table of Contents
- [Executive Summary & Business Utility](#executive-summary--business-utility)
- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)
- [System Architecture & Layers](#system-architecture--layers)
- [Data Model & Synchronized Store](#data-model--synchronized-store)
- [Application Modules & API Endpoints](#application-modules--api-endpoints)
- [Getting Started & Scripts](#getting-started--scripts)
- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)

---

## Executive Summary & Business Utility
`spider-marketingagencyplateform` (`black-spider` / `spider/`) is a full-stack Next.js 16 (`16.4.5`), React 19, Framer Motion, and Supabase platform engineered for a full-service digital marketing agency. It pairs an interactive, high-converting public showcase (`CyberSpiderWeb`, `/threejs`, `WhatsAppFAB`, service packages, portfolio) with a synchronized `/admin` back-office for CRM, finance, projects, packages, blog publishing, client reviews, and user governance.

---

## Visual Showcase (UI & Dashboards)
Design screens captured from Stitch (`stitch_source/` and `screens_list.json`):

| Home & Services Showcase | Integrated Admin Dashboard | Agency Operations View |
| :---: | :---: | :---: |
| ![Home & Services](./stitch_source/8181b86f49bc43d8946143e6a508bb65/screenshot.png) | ![Admin Dashboard](./stitch_source/1b169ae7282443c7b1e065bc049508da/screenshot.png) | ![Operations Screen](./stitch_source/1660bdd1d7b4462288254c7a7358682b/screenshot.png) |

| Packages & Pricing | Portfolio & Case Studies | Settings & CRM View |
| :---: | :---: | :---: |
| ![Packages Screen](./stitch_source/51ad4365b77240bf95e61c7a7354beb9/screenshot.png) | ![Portfolio Screen](./stitch_source/6ac592b4cfc743c7b95ef99c1b96cef/screenshot.png) | ![CRM Screen](./stitch_source/d97d3718474e4423bf4b6310c2182970/screenshot.png) |

---

## System Architecture & Layers

```mermaid
flowchart TB
    subgraph L1["1. Brand & Interactive Presentation Layer"]
        Pub["/ • /about • /services • /packages • /pricing • /portfolio • /projects • /blog • /threejs • /contact"]
        FX["CyberSpiderWeb • PageTransition • Counter • WhatsAppFAB • Navbar • Footer"]
    end

    subgraph L2["2. Admin Back-Office Layer (/admin & /dashboard)"]
        Admin["/admin/{crm,finance,packages,projects,blog,reviews,users,settings}"]
        Shell["AdminSidebar • AdminHeader"]
    end

    subgraph L3["3. Synchronized State & API Layer"]
        Store["spider/lib/store.tsx"]
        APIs["/api/admin/store • /api/admin/users"]
    end

    subgraph L4["4. Persistence, Design Tokens & QA Layer"]
        Supa["Supabase SSR (spider/lib/supabase.ts & spider/types/database.ts)"]
        Tokens["tailwind_theme_clean.json • tailwind_theme_dashboard.json"]
        Tests["Vitest (admin-frontend-sync.test.tsx & full-suite-verification.test.tsx)"]
    end

    L1 --> L3 --> L4
    L2 --> L3
```

| Layer | Responsibility | Key Files |
| :--- | :--- | :--- |
| **Interactive Brand Layer** | Custom cybernetic spiderweb background, animated counters, page transitions, and WhatsApp lead widget | `spider/components/{CyberSpiderWeb,PageTransition,Counter,WhatsAppFAB,Navbar,Footer}.tsx` |
| **Public Marketing Funnel** | Agency positioning, tiered packages, transparent pricing, portfolio, 3D demo, and legal pages | `spider/app/{about,services,packages,pricing,portfolio,projects,blog,threejs,contact,privacy,security,terms}/page.tsx` |
| **Admin Operations Layer** | Internal CRM, financial tracking, package editor, project tracker, CMS, and RBAC users | `spider/app/admin/{crm,finance,packages,projects,blog,reviews,users,settings}/page.tsx` |
| **Synchronized Store & API** | Real-time admin-to-frontend content sync and user management endpoints | `spider/lib/store.tsx`, `spider/app/api/admin/{store,users}/route.ts` |
| **Design System & QA Layer** | Extracted Stitch Tailwind v4 tokens and automated Vitest sync tests | `tailwind_theme_*.json`, `spider/__tests__/{admin-frontend-sync,full-suite-verification}.test.tsx` |

---

## Data Model & Synchronized Store
Typed in `spider/types/database.ts` and synchronized via `spider/lib/store.tsx` + `/api/admin/store`:
- **Commercial Entities**: Marketing Packages, Pricing Tiers, Client Projects, Portfolio Items, Financial Records.
- **Growth & CRM Entities**: CRM Leads, Client Reviews, Blog Articles, Admin Users, Site Settings.

---

## Application Modules & API Endpoints

### Public & Client Routes
- `/`, `/about`, `/services`, `/packages`, `/pricing`, `/portfolio`, `/projects`, `/blog`, `/threejs`, `/contact`, `/dashboard`, `/privacy`, `/security`, `/terms`

### Admin Suite (`/admin`)
- `/admin/login`, `/admin`, `/admin/crm`, `/admin/finance`, `/admin/packages`, `/admin/projects`, `/admin/blog`, `/admin/reviews`, `/admin/users`, `/admin/settings`

### API Endpoints
| Route | Purpose |
| :--- | :--- |
| `/api/admin/store` | Persists and synchronizes CMS, packages, projects, reviews, and CRM store state |
| `/api/admin/users` | Admin staff account provisioning and role management |

---

## Getting Started & Scripts

```bash
git clone https://github.com/islamsamyy/spider-marketingagencyplateform.git
cd spider-marketingagencyplateform
npm --prefix spider install
```

| Script | Command | Description |
| :--- | :--- | :--- |
| Dev | `npm run dev` | Start Next.js 16 dev server on port 3002 (`--webpack`) |
| Build | `npm run build` | Production build |
| Lint | `npm run lint` | Run ESLint 9 |
| Test | `npm test` | Run Vitest (`admin-frontend-sync` & `full-suite-verification`) |

---

## Business Value, ROI & Growth Opportunities
- **Zero-Sprawl Agency Operating System**: Replaces separate subscriptions for Webflow, HubSpot, and spreadsheets by unifying lead capture, package pricing, CRM, and finance in one repo.
- **Self-Serve Retainer Checkout**: Integrate Stripe/Moyasar on `/packages` so clients can purchase monthly marketing retainers online and auto-create a workspace in `/admin/projects`.
- **Client Reporting Portal**: Upgrade `/dashboard` to pull live Meta/Google Ads ROAS metrics for active retainer clients.
- **White-Label Agency Template**: Resell the Stitch-themed design system + synchronized admin engine to boutique agencies across MENA.
