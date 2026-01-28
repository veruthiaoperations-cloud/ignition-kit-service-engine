# Ignition Kit - Service Business Engine v2.1

**The 3-Minute Deployment: Fork → Connect → Launch**

A production-ready template for service businesses (HVAC, Plumbing, Auto Repair, and more). Built with Next.js 14, Supabase, and Tailwind CSS.

---

## What You Get

- **Instant Professional Website**: Hero, Services, Gallery, Reviews, About, FAQ sections
- **Admin Control Panel**: Manage content, reorder sections, toggle visibility, add services
- **Blank Canvas Mode**: Shows placeholders until you add your business details
- **Secure Admin Access**: Manual provisioning (no public signup)
- **Dynamic SEO**: Browser tab shows your business name automatically
- **Mobile Responsive**: Perfect on all devices
- **Zero Config**: Everything works out of the box

---

## 3-Minute Deployment

### Step 1: Fork & Deploy (60 seconds)

1. Fork this repository to your GitHub account
2. Deploy to Vercel/Netlify (or your preferred host)
3. Note your deployment URL (e.g., `https://your-site.vercel.app`)

### Step 2: Connect Supabase (90 seconds)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **SQL Editor** and paste the contents of `/database/setup.sql`
4. Click **Run** to create all tables and security policies
5. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon/public key`
6. Add these to your deployment's environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key

### Step 3: Create Admin Account (30 seconds)

1. In Supabase, go back to **SQL Editor**
2. Paste the SQL snippet below (replace email/password):

```sql
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, recovery_sent_at, last_sign_in_at,
    raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'your-email@example.com', -- ← CHANGE THIS
    crypt('YourSecurePassword123!', gen_salt('bf')), -- ← CHANGE THIS
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(), now(),
    '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (user_id, business_name, phone, email, address, theme_color)
  VALUES (
    new_user_id,
    'Your Business Name',
    '(555) 123-4567',
    'contact@yourbusiness.com',
    '123 Main St, City, State 12345',
    '#3b82f6'
  );

  INSERT INTO sections (user_id, name, slug, is_visible, order_index)
  VALUES
    (new_user_id, 'Hero', 'hero', true, 0),
    (new_user_id, 'Services', 'services', true, 1),
    (new_user_id, 'Gallery', 'gallery', true, 2),
    (new_user_id, 'About', 'about', true, 3),
    (new_user_id, 'Reviews', 'reviews', true, 4),
    (new_user_id, 'FAQ', 'faq', true, 5);

  RAISE NOTICE 'SUCCESS! Admin user created with ID: %', new_user_id;
END $$;
```

3. Click **Run**
4. Log in at `https://your-site.vercel.app/login`

**Done! You're live.**

---

## Admin Panel Features

After logging in, access the admin panel at `/admin`:

### Business Profile Manager
- Update business name, phone, email, address
- Change theme color
- Upload logo

### Layout Manager (`/admin/layout`)
- **Reorder sections** using Up/Down arrows
- **Toggle visibility** to show/hide sections
- **Live preview**: Changes appear instantly on homepage

### Services Manager (`/admin/services`)
- Add/Edit/Delete services
- **Reorder services** using Left/Right arrows
- Set pricing and descriptions

### Gallery Manager (`/admin/gallery`)
- Add images via Pexels URLs
- Add captions
- Reorder photos

---

## How It Works

### Blank Canvas Mode
- If the database is empty, the homepage shows placeholder text: "Your Business Name"
- As soon as you insert a profile, the homepage updates automatically
- No caching issues due to `force-dynamic` rendering

### Security Model
- **No public signup**: Admins are manually provisioned via SQL
- **Row Level Security (RLS)**: Users can only access their own data
- **Hardened login**: Only sign-in allowed at `/login`

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL with RLS)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React

---

## File Structure

```
ignition-kit/
├── app/
│   ├── page.tsx                 # Public homepage (dynamic)
│   ├── login/page.tsx           # Admin login (sign-in only)
│   ├── admin/
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── layout/page.tsx      # Section manager (Up/Down arrows)
│   │   ├── services/page.tsx    # Services manager (Left/Right arrows)
│   │   └── gallery/page.tsx     # Gallery manager
│   └── layout.tsx               # Root layout with dynamic metadata
├── components/
│   ├── public/                  # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── Footer.tsx
│   └── ui/                      # Reusable UI components
├── database/
│   └── setup.sql                # Database schema + auto-provisioning
├── utils/supabase/
│   ├── client.ts                # Client-side Supabase
│   └── server.ts                # Server-side Supabase
└── README.md                    # This file
```

---

## Customization Guide

### Change Business Details
1. Log in at `/login`
2. Go to `/admin`
3. Click "Edit Business Profile"
4. Update name, phone, email, address, theme color
5. Save changes

### Reorder Homepage Sections
1. Go to `/admin/layout`
2. Use Up/Down arrows to change section order
3. Toggle switches to show/hide sections

### Add Services
1. Go to `/admin/services`
2. Click "Add Service"
3. Enter service name, description, price
4. Use Left/Right arrows to reorder

### Add Gallery Images
1. Go to `/admin/gallery`
2. Click "Add Image"
3. Paste Pexels image URL
4. Add caption and save

---

## For Developers

### Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/ignition-kit.git
cd ignition-kit

# Install dependencies
npm install

# Set up environment variables
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Run development server
npm run dev
```

### Database Schema
- `profiles`: Business information (1 per user)
- `sections`: Homepage layout control
- `services`: Service offerings grid
- `gallery`: Photo showcase

All tables have RLS enabled. Users can only access their own data.

### Adding New Sections
1. Add new component in `/components/public/`
2. Import in `app/page.tsx`
3. Add conditional rendering based on `sections` data
4. Insert new section row in database

---

## Deployment Checklist

- [ ] Fork repository
- [ ] Create Supabase project
- [ ] Run `/database/setup.sql` in SQL Editor
- [ ] Set environment variables in hosting platform
- [ ] Run admin provisioning SQL
- [ ] Log in and test admin panel
- [ ] Customize business details
- [ ] Add services and gallery images
- [ ] Test on mobile devices
- [ ] Update SEO metadata (auto-generated from business name)

---

## Provisioning New Clients

When you want to give a client their own site:

1. Deploy a new instance or multi-tenant the same deployment
2. Run the admin provisioning SQL with their email/password
3. Give them their login credentials
4. They log in and customize everything themselves

---

## Support & Documentation

- **PROJECT_MIRROR.md**: Development history and technical decisions
- **PRD.md**: Original product requirements
- **Issues**: Open a GitHub issue for bugs/features

---

## License

ISC License - Free for commercial and personal use.

---

## Credits

Built with:
- [Next.js](https://nextjs.org/) by Vercel
- [Supabase](https://supabase.com/) for database and auth
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

---

**Made for service businesses that deserve better.**
