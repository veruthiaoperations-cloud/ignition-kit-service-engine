# PROJECT MIRROR - Ignition Kit v2.1

## Purpose
This file tracks every decision, change, and the current state of the project. It ensures continuity between development sessions and prevents "amnesia" when switching between AI agents or team members.

---

## Log Entry #1 - PHASE 1: THE FOUNDATION
**Date:** 2026-01-27
**Phase:** PHASE 1 - Foundation Setup
**Status:** ✅ COMPLETED

### The Intent
Initialize the foundational structure for Ignition Kit, a clone-to-deploy service business template. The goal is to create a master template that can be rapidly deployed for HVAC, Plumbing, Auto Repair, and similar service businesses.

### The Logic
**Tech Stack Choices:**
- **Next.js 14 (App Router)**: Modern React framework with server-side rendering, optimal for SEO-critical service business websites
- **Tailwind CSS + Shadcn/UI**: Ensures consistent, polished UI components out of the box. Shadcn provides production-ready components without bloat
- **Supabase (PostgreSQL)**: Managed database with built-in authentication and RLS (Row Level Security). Perfect for multi-tenant architecture where each business owner manages their own data
- **TypeScript**: Type safety prevents bugs in a complex admin panel with reordering, CRUD operations, and dynamic rendering

**Database Architecture:**
- **profiles**: Stores business branding (name, contact, logo, theme color). One profile per authenticated user
- **sections**: Controls the layout skeleton (Hero, Services, Gallery, etc.). Supports visibility toggling and vertical reordering via `order_index`
- **services**: Service offerings with horizontal reordering via `order_index`. Displayed in a grid on the public website
- **gallery**: Photo gallery with reordering capability

**Security Design:**
- RLS enabled on all tables
- Authenticated users can only access their own data
- Public (anon) users can view all profiles, services, and galleries (for the public website)
- Visible sections are public; hidden sections are completely inaccessible to anon users

### The Changes
**Files Created:**
1. **package.json** - Project dependencies and scripts
   - Next.js 14, React 18, TypeScript
   - Supabase SSR client (@supabase/ssr)
   - Tailwind CSS, Lucide React icons
   - Utility libraries: clsx, tailwind-merge, class-variance-authority

2. **Configuration Files:**
   - `tsconfig.json` - TypeScript configuration with path aliases (@/*)
   - `tailwind.config.ts` - Tailwind with Shadcn design system (CSS variables for theming)
   - `postcss.config.mjs` - PostCSS setup for Tailwind
   - `next.config.mjs` - Next.js config with Supabase image optimization

3. **App Structure:**
   - `app/layout.tsx` - Root layout with Inter font and global CSS
   - `app/page.tsx` - Temporary homepage (placeholder for PHASE 3)
   - `app/globals.css` - Tailwind directives + Shadcn design tokens (CSS variables for primary, secondary, etc.)

4. **Utility Files:**
   - `lib/utils.ts` - `cn()` helper for merging Tailwind classes (required by Shadcn components)
   - `utils/supabase/server.ts` - Server-side Supabase client (for Server Components and API routes)
   - `utils/supabase/client.ts` - Client-side Supabase client (for Client Components)

5. **Database:**
   - `database/setup.sql` - Complete schema with tables, RLS policies, and indexes
   - Applied migration: `initial_schema_setup` - Successfully deployed to Supabase

6. **Environment:**
   - `.env` - Updated with Next.js environment variable naming:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### The Snapshot
**Current Project State:**
✅ Next.js 14 project initialized with App Router
✅ Tailwind CSS and Shadcn/UI foundation configured
✅ Supabase clients (server + client) ready for use
✅ Database schema deployed with 4 tables (profiles, sections, services, gallery)
✅ RLS policies active on all tables
✅ Performance indexes created

**What's Missing (Next Phases):**
- PHASE 2: Admin dashboard UI
  - Brand Manager (business info, logo, color picker)
  - Layout Manager (section visibility and reordering)
  - Service Manager (CRUD + reordering)
  - Gallery Manager (upload + reordering)
  - AI Receptionist Upsell Modal
- PHASE 3: Public website
  - Dynamic homepage that renders sections from DB
  - Mobile-responsive service business layout
  - Sticky "Call Now" button
- PHASE 4: Final polish and GitHub deployment

**Database Schema (Current):**
```
profiles (id, user_id, business_name, phone, email, address, logo_url, theme_color)
sections (id, user_id, name, slug, is_visible, order_index)
services (id, user_id, title, description, price, image_url, order_index)
gallery (id, user_id, image_url, caption, order_index)
```

**Key Technical Decisions:**
1. No seed data in migration (to avoid foreign key issues). Seed data will be created through the admin panel on first use
2. Using CSS variables (--primary, etc.) for theme color customization
3. All timestamps use `timestamptz` for timezone awareness
4. `order_index` is an integer for simple array-based reordering
5. Using Tailwind CSS v3 (not v4) for Next.js 14 compatibility

**Build Verification:**
✅ Project builds successfully with no errors
- Build output: 87.4 kB First Load JS (homepage)
- All routes pre-rendered as static content
- TypeScript validation passed

**Next Steps:**
1. Start PHASE 2: Build the admin dashboard
2. Implement authentication (Supabase Auth - email/password)
3. Create the Brand Manager component
4. Build the Layout Manager with up/down arrows for section reordering

---

## How to Use This Log
When resuming development:
1. Read the latest log entry to understand the current state
2. Check "What's Missing" to see what needs to be built next
3. Review "Key Technical Decisions" to maintain consistency
4. Add a new log entry after making changes
