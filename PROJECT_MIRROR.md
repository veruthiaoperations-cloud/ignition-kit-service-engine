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

## Log Entry #2 - PHASE 2: THE ADMIN DASHBOARD
**Date:** 2026-01-27
**Phase:** PHASE 2 - Admin Dashboard (Command Center)
**Status:** ✅ COMPLETED

### The Intent
Build a complete admin dashboard where business owners can manage their brand, content, and layout. This is the "command center" that makes Ignition Kit a true clone-to-deploy template. The admin panel must be intuitive enough for non-technical users while providing powerful reordering and CRUD capabilities.

### The Logic
**Authentication Strategy:**
- Supabase Auth with email/password (no magic links, no social providers per PRD)
- Auto-initialization: When a user signs up, automatically create their profile, default sections (Hero, Services, Gallery, Reviews, About, FAQ), and 3 demo HVAC services
- This ensures the template is never blank and provides an immediate starting point

**Admin Layout Architecture:**
- Sidebar navigation with 4 main tabs: Brand, Layout, Services, Gallery
- "AI Receptionist" tab with lock icon and PRO badge (upsell feature)
- Sign out button in sidebar footer
- Auth guard redirects unauthenticated users to login page

**Brand Manager Design:**
- Business info form (name, phone, email, address)
- Live theme color picker that updates CSS variables in real-time using hex-to-HSL conversion
- Color picker preview shows buttons in the selected theme
- Changes save to the profiles table

**Layout Manager Design:**
- Vertical section cards with up/down arrow buttons for reordering
- Toggle switches for visibility (on/off)
- Updates the `order_index` field in the sections table
- Visual feedback: hidden sections appear with reduced opacity

**Services Manager Design:**
- Grid layout (3 columns on desktop)
- Each service card has edit/delete buttons
- Left/right arrow buttons at bottom of each card for horizontal reordering
- Dialog modal for adding/editing services (title, description, price fields)
- Uses Lucide icons (Wrench) as placeholders when no image is provided
- Updates the `order_index` field for grid positioning

**Gallery Manager Design:**
- Similar grid layout to services
- Image URL input (links to Pexels for stock photos)
- Optional caption field
- Left/right arrows for reordering images
- Delete button appears on hover
- Image preview in the add dialog
- Graceful error handling for invalid image URLs

**AI Receptionist Upsell:**
- Locked sidebar item with yellow PRO badge
- Opens a polished modal with:
  - Lock icon in the title
  - Bullet points highlighting features (spam filtering, 24/7 booking, revenue tracking)
  - Founding Partner pricing ($199/month)
  - Primary CTA: "Unlock Founding Partner Access"
  - Secondary CTA: "Maybe Later"
- This is the psychological hook to upsell premium features

### The Changes
**Files Created:**

1. **Shadcn UI Components** (`components/ui/`)
   - `button.tsx` - Primary component with variants (default, destructive, outline, ghost, link) and sizes
   - `input.tsx` - Text input with focus states and validation styles
   - `label.tsx` - Form labels with proper accessibility
   - `card.tsx` - Card container with Header, Title, Description, Content, Footer subcomponents
   - `dialog.tsx` - Modal dialog with overlay, portal rendering, and close button
   - `switch.tsx` - Toggle switch for boolean states (used for section visibility)

2. **Authentication** (`app/login/`)
   - `page.tsx` - Combined login/signup page with state toggle
   - Auto-creates profile, default sections, and demo services on signup
   - Error handling for invalid credentials
   - Redirects to /admin on success

3. **Admin Dashboard Layout** (`app/admin/`)
   - `layout.tsx` - Sidebar navigation with auth guard
     - 4 main nav items: Brand, Layout, Services, Gallery
     - AI Receptionist upsell button with modal
     - Sign out functionality
     - Loading state during auth check

4. **Brand Manager** (`app/admin/page.tsx`)
   - Business information form
   - Live theme color picker with hex input and visual color selector
   - `hexToHSL()` function converts hex colors to HSL format for CSS variables
   - `applyThemeColor()` updates `--primary` CSS variable in real-time
   - Button preview section to demonstrate theme changes
   - Save functionality with success/error feedback

5. **Layout Manager** (`app/admin/layout/page.tsx`)
   - Lists all sections sorted by order_index
   - Up/down buttons for vertical reordering
   - Toggle switches for visibility control
   - Batch updates to maintain order_index consistency
   - Visual indication of hidden sections (reduced opacity)
   - Info tip explaining hidden sections won't appear on public site

6. **Services Manager** (`app/admin/services/page.tsx`)
   - Grid layout with responsive columns (1/2/3 based on screen size)
   - Service cards with icon, title, description, price
   - Edit/delete buttons in card header
   - Left/right reordering arrows in card footer
   - "Add Service" dialog with 3 fields (title, description, price)
   - Empty state with call-to-action
   - Auto-calculates max order_index for new items

7. **Gallery Manager** (`app/admin/gallery/page.tsx`)
   - Image grid with aspect-ratio containers
   - Image URL input with Pexels link reference
   - Optional caption field
   - Live image preview in add dialog
   - Error handling for broken image URLs (shows placeholder icon)
   - Delete button on hover
   - Left/right reordering arrows
   - Empty state with call-to-action

### The Snapshot
**Current Project State:**
✅ PHASE 1: Foundation complete
✅ PHASE 2: Admin Dashboard complete
- Authentication (login/signup) functional
- Brand Manager with live theme color picker
- Layout Manager with section visibility and reordering
- Services Manager with full CRUD and left/right reordering
- Gallery Manager with image URL input and reordering
- AI Receptionist upsell modal implemented

**Routes Created:**
```
/login - Authentication page
/admin - Brand Manager (default admin page)
/admin/layout - Layout Manager
/admin/services - Services Manager
/admin/gallery - Gallery Manager
```

**Build Status:**
✅ Project builds successfully with no errors
- Build output: 152-155 kB First Load JS (admin pages)
- All routes pre-rendered as static content
- TypeScript validation passed
- 9 total routes generated

**What's Missing (Next Phases):**
- PHASE 3: Public website
  - Dynamic homepage that fetches sections from DB
  - Render sections in order based on order_index
  - Hero section with business name and call-to-action
  - Services grid displaying all services
  - Gallery photo grid
  - Mobile-responsive layout
  - Sticky "Call Now" button on mobile
- PHASE 4: Final polish
  - Testing on mobile devices
  - Performance optimization
  - GitHub deployment
  - README documentation

**Key Technical Decisions:**
1. All admin pages use client-side rendering ("use client") for interactivity
2. Auth guard in admin layout.tsx redirects unauthenticated users
3. Theme color picker converts hex to HSL for CSS variable compatibility
4. Reordering uses splice/insert pattern to maintain array order, then batch updates DB
5. Services and gallery use left/right arrows (not up/down) because they're displayed in horizontal grids
6. Image URLs are stored as strings (no file upload yet) with Pexels recommended for stock photos
7. Empty states encourage users to add their first item
8. Auto-initialization on signup ensures users always have starting content (demo HVAC services)

**Database Interaction Patterns:**
- All queries use `.eq('user_id', user.id)` to enforce RLS
- Services and gallery use `.order('order_index', { ascending: true })`
- Updates use individual queries (not batch) for simplicity
- `.maybeSingle()` used for profile queries (returns null if not found)
- Auto-calculated `order_index`: `Math.max(...items.map(i => i.order_index)) + 1`

**User Experience Decisions:**
1. Success messages auto-dismiss after 3 seconds
2. Confirmation dialogs before destructive actions (delete)
3. Disabled state on buttons during loading
4. Visual feedback for all state changes (loading spinners, success messages)
5. Inline help text (tips) in blue info boxes
6. Graceful error handling with user-friendly messages

**Next Steps:**
1. Start PHASE 3: Build the dynamic public website
2. Create sections components (Hero, Services, Gallery, etc.)
3. Implement the dynamic rendering engine that reads from sections table
4. Add mobile-responsive layout with sticky call button
5. Test the full flow: signup → customize admin → view public site

---

## How to Use This Log
When resuming development:
1. Read the latest log entry to understand the current state
2. Check "What's Missing" to see what needs to be built next
3. Review "Key Technical Decisions" to maintain consistency
4. Add a new log entry after making changes
