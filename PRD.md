IGNITION KIT: MASTER PRD (Service Engine v2.1)
Project Name: Ignition Kit (Service Industry Engine) Version: 2.1 (Founding Partner Edition) Repository Strategy: GitHub Clone-to-Deploy Target Industry: Scalable Service Business (HVAC, Plumbing, Auto, etc.)

0. SYSTEM INSTRUCTIONS (MANDATORY)
TO THE AI DEVELOPER: You are an expert Full Stack Developer. You are building a "Master Template" that will be cloned hundreds of times. The code must be clean, modular, and use environment variables for all configuration.

PROTOCOL 1: THE "NO AMNESIA" LOG You must maintain a file in the root directory called PROJECT_MIRROR.md. For every single response or code change, you must append a log entry:

The Intent: What was the user trying to achieve?

The Logic: Why did you choose this specific code/tech stack?

The Change: Exactly what files/lines were modified?

The Snapshot: A brief summary of the project state so the next AI agent can pick up immediately.

PROTOCOL 2: CLONE-READY ARCHITECTURE

Do not hardcode any business data. All data must come from Supabase.

Create a database/setup.sql file containing all table definitions and initial seed data. This allows the admin to spin up a new client database instantly.

1. TECH STACK (NON-NEGOTIABLE)
Framework: Next.js 14 (App Router)

Styling: Tailwind CSS + Shadcn/UI (Strict requirement for polished UI).

Database: Supabase (PostgreSQL).

Icons: Lucide React.

Deployment: Vercel (Edge Functions).

2. CORE FEATURES & SCOPE
A. The "Smart" Admin Panel (Client Command Center)
Auth: Supabase Auth (Email/Password).

Brand Manager:

Inputs: Business Name, Phone, Email, Address.

Logo: Image Upload (Supabase Storage).

Theme Color: Color Picker (Updates a global CSS variable --primary).

Layout Manager (The "Skeleton" Control):

List of Sections: Hero, Services, Gallery, Reviews, About, FAQ.

Controls: Toggle Visibility (On/Off), Move Up/Down (Reorder vertical sections).

Content Manager (The "Sub-Section" Control):

Services Module:

Fields: Title, Price, Description, Image.

Reorder Controls: Left/Right (or Up/Down) arrows to change the order_index. This dictates which service appears first in the grid.

Gallery Module:

Upload images.

Reorder Controls: Left/Right arrows to rearrange the photo grid.

The "Receptionist" Upsell (The Hook):

Sidebar Tab: "AI Receptionist" (Locked Icon).

Modal Content:

"Stop Spam, Start Booking."

"Filters 100% of robocalls."

"Recovered Revenue Tracker (Live Demo View)."

CTA: "Unlock Founding Partner Access."

B. The Public Website (The Asset)
Dynamic Engine: The page.tsx fetches the Section Order from the DB, then maps through the components in that order.

Visuals:

High-converting "Service Business" layout.

Sticky "Call Now" button on mobile.

Grid Layouts: Services and Gallery must respect the order_index set in the Admin Panel.

Seeding:

The setup.sql must pre-load generic HVAC data (e.g., "AC Tune-Up", "Furnace Repair") so the template is never blank.

3. DEVELOPMENT PHASES (EXECUTION PLAN)
INSTRUCTION: Execute strictly in order. Update PROJECT_MIRROR.md after each step.

PHASE 1: THE FOUNDATION (Bolt.new)
Initialize Next.js + Tailwind + Shadcn/UI.

Set up Supabase Client (utils/supabase/server.ts).

Generate database/setup.sql: Write the SQL to create tables (profiles, services, sections, gallery) and RLS (Row Level Security) policies.

Run the seed script to populate the database with HVAC data.

PHASE 2: THE ADMIN DASHBOARD
Build the Layout Manager (Vertical Reordering).

Build the Service/Gallery Managers (Horizontal/Grid Reordering).

Implement the Color Picker (updates Tailwind config or CSS variables).

Build the AI Receptionist Upsell Modal.

PHASE 3: THE PUBLIC FRONTEND
Build the Dynamic Home Page that renders sections based on DB rows.

Ensure Mobile Responsiveness (Critical for HVAC clients).

Test the "Call Now" buttons.

PHASE 4: THE HANDOFF
Finalize PROJECT_MIRROR.md.

Push to GitHub.

4. CONSTRAINTS & GUARDRAILS
Strict File Structure: Keep components in components/ and database logic in utils/.

No Visual Drag-and-Drop Libraries: Use simple buttons (Arrows) for reordering. It is faster to build and less buggy on mobile.

Images: If a user doesn't upload an image, fallback to a clean Lucide Icon (e.g., a Wrench or Snowflake).

Error Handling: If Supabase disconnects, show a "Maintenance Mode" screen, do not crash.
