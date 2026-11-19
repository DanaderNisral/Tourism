# Imbuto Safaris — Production Website Theme

A luxury, monochrome-editorial tourism and safari website theme built for **Imbuto Safaris** (Rwanda & East Africa), crafted with the exact design language, component system, and typography of the **Jeskay Collections** system.

Engineered to be resold to boutique tour operators, safari lodges, and travel agencies across Rwanda and East Africa, with seamless content editing via a Supabase-backed admin dashboard.

---

## 1. Tech Stack

- **Framework**: TanStack Start / Router (file routes in `src/routes`) + Vite 6 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` design tokens in `src/styles.css` using OKLCH colors)
- **Design Language**: Monochrome editorial (pure black & white base, `--mint` accent glows and icon chips, no saturated flat fills)
- **Typography**: Dual-font system:
  - **Headings**: `Inter` weight 800 (extrabold, tracking 0, tight leading)
  - **Body & UI**: `JetBrains Mono` 14px base (`ss01`, `cv11` features)
- **UI Primitives**: Radix UI (Dialog, Accordion, Popover, Slider, Checkbox, Dropdown) styled with `class-variance-authority`, `clsx`, and `tailwind-merge`
- **Icons**: `lucide-react` (strokeWidth 2 to 2.4)
- **Data & State**: `@tanstack/react-query` with a 15-second polling interval on the homepage for instantaneous live admin preview without redeploying
- **Database**: Supabase (`@supabase/supabase-js`) with public anon key and resilient offline/demo fallback

---

## 2. 8 Distinct Hero Layouts

Every page features its own signature hero composition:

1. **Home (`/`)**: Tall full-bleed photo inside a `rounded-[2rem]` frame with a dark scrim, display headline ("See Africa differently"), mono subtitle, and a floating **Glass Search Bar** (Destination, Dates, Travellers, Budget → Search).
2. **Tours (`/tours`)**: Split hero. Left: giant display title, category filter pill chips (*Gorilla trekking, Safari, Culture, Hiking, Lakes*), and a Radix budget slider. Right: 3 overlapping tilted rounded photos with `float-slow` floating animation.
3. **Tour Detail (`/tours/$slug`)**: 5-photo **Mosaic Hero** (1 large + 4 small photos, "View all photos" lightbox trigger), metadata chips, sticky desktop glass booking card, mobile bottom booking bar, day-by-day accordion itinerary, and included/excluded checklists.
4. **Destinations (`/destinations`)**: Typographic hero featuring a giant display wordmark **"WHERE?"** with a horizontally scrolling pill row over mint & sky orbs, leading to alternating destination feature cards with travel facts (best season, altitude, distance from Kigali).
5. **Experiences (`/experiences`)**: 3-column glass icon-tile hero (*Wildlife, Culture, Adventure*) with mint and sky ambient glows, followed by detailed experiential deep-dives.
6. **About (`/about`)**: Inverted dark hero (`bg-foreground text-background`) with a team photo in a rounded frame and 3 stat counters (14+ years, 3,800+ travellers, 5.0 TripAdvisor rating).
7. **Contact (`/contact`)**: Calm light hero with 3 glass cards (*WhatsApp, Telephone, Email*), office hours, Kigali map link, and an embedded interactive safari booking form.
8. **Gallery & Journal (`/gallery`)**: Masonry photo strip with an interactive high-resolution lightbox modal and guide field notes.

---

## 3. Environment Variables

Create a `.env` file in the project root (or set in Vercel):

```bash
# Supabase Project URL (from Project Settings -> API)
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Public Anon Key (safe for client-side queries)
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here

# Optional Multi-tenant Client Filter (leave empty if single client)
VITE_SHOP_ID=imbuto-safaris
```

> **Note**: If Supabase credentials are not provided or the tables are empty, the site gracefully renders rich default demo data from `src/data/site.defaults.ts`.

---

## 4. Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (TypeScript check + Vite compilation)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 5. Deploy to Vercel (5-Step Guide)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Imbuto Safaris theme"
   git remote add origin https://github.com/your-username/imbuto-safaris-theme.git
   git push -u origin main
   ```
2. **Import Project into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New..." → "Project"**.
   - Select your GitHub repository.
3. **Configure Build Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variables**:
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
5. **Deploy**:
   - Click **Deploy**. Vercel will build the project in under 30 seconds.
   - The included `vercel.json` rewrite rule automatically handles client-side SPA routing (`/(.*) -> /index.html`).

---

## 6. How to Change the Theme Accent Hue

The theme accent is controlled in `src/styles.css` using OKLCH color tokens:

```css
/* In src/styles.css: */
:root {
  /* Current accent is --mint */
  --mint: oklch(0.9 0.07 160);
  --sky: oklch(0.88 0.07 230);
  --lavender: oklch(0.85 0.08 290);
  --peach: oklch(0.88 0.08 50);
  --rose: oklch(0.86 0.08 10);
}
```

To switch the primary accent hue to **Lavender**, update the accent token in `@theme`:
```css
@theme {
  --color-accent: var(--lavender);
}
```
Or for **Peach**:
```css
@theme {
  --color-accent: var(--peach);
}
```
All hero glow orbs, badges, icon chips, and active focus highlights will update automatically while keeping the monochrome editorial base intact.

---

## 7. Supabase Database Schema & Admin Dashboard Mapping

The theme reads and writes to 4 tables with Row Level Security (RLS) configured:

### 1. `site_kv`
Key-value store for site copy and business information.
- `key = "settings"`:
  ```json
  {
    "name": "Imbuto Safaris",
    "phone": "+250 788 123 456",
    "email": "safaris@imbuto.rw",
    "address": "KG 7 Ave, Kimihurura, Kigali, Rwanda",
    "hours": "Mon – Sat: 08:00 – 19:00 (CAT)",
    "whatsappNumber": "250788123456",
    "currency": "USD",
    "announcement": {
      "enabled": true,
      "text": "2026/2027 Gorilla trekking permits now open"
    }
  }
  ```
- `key = "site"`: Hero titles, subtitles, "Why Travel With Us" features, and steps.

### 2. `products` (Safaris & Tours)
- `id` (uuid or text)
- `name` (text, e.g. "Volcanoes Silverback Encounter")
- `slug` (text, e.g. "volcanoes-silverback-encounter")
- `category` (*Gorilla trekking | Safari | Culture | Hiking | Lakes*)
- `price` (numeric, base from-price in USD)
- `sale_price` (numeric, optional discount price)
- `stock` (integer, max group size or available dates)
- `photos` (text array of URLs)
- `visible` (boolean)
- `meta` (jsonb):
  - `durationDays`: number
  - `groupSize`: text
  - `difficulty`: text
  - `season`: text
  - `highlights`: text[]
  - `itinerary`: array of `{ day: number, title: string, text: string }`
  - `included`: text[]
  - `excluded`: text[]
  - `gallery`: text[]

### 3. `orders` (Trip Inquiries)
When a user submits the booking form, a record is inserted:
- `order_number`: e.g. `IMB-2026-X9K2A`
- `customer_name`: string
- `customer_email`: string
- `customer_phone`: string
- `total_amount`: numeric (estimated quote)
- `status`: `'inquiry_pending'`
- `meta`: `{ type: "booking", tour_name: "...", adults: 2, children: 0, start_date: "..." }`

### 4. `discounts`
- `code`: text (e.g. `SAFARI2026`)
- `type`: `'percent'` | `'fixed'`
- `value`: number (e.g. 10)
- `active`: boolean
- `message`: text

---

## 8. Quality & Accessibility Audit

- **Mobile First**: Tested at 375px viewport with zero horizontal overflow.
- **Touch Targets**: All buttons, links, inputs, and steppers have a minimum touch target of 44x44px.
- **Contrast**: Full WCAG AA compliance across both light and `.dark` mode variants. Text over images is protected with dark scrim gradients.
- **Performance**: Vendor chunking separates React, TanStack Router, Radix UI, and Lucide icons for high cache hit rates and sub-second load times on 3G/4G mobile networks.
