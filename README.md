# 🍽️ Delizioso — Fine Dining Restaurant Website

> A full-stack restaurant website with a public-facing UI and an admin panel for managing menu items and contact information.

---

## 📸 Overview

**Delizioso** is a modern, elegant restaurant website built for a fictional fine dining establishment. It features a beautiful single-page experience with smooth scroll navigation, a filterable menu, a photo gallery, and a contact section — all backed by a Node.js/Express API.

Restaurant owners can log in via a hidden admin panel to **add, edit, or delete** menu items and update contact details in real time — no separate dashboard needed.

---

## ✨ Features

- 🏠 **Hero Section** — Full-viewport hero with background image, restaurant name, and CTA
- 👨‍🍳 **About Section** — Restaurant story, ambiance image, and key stats
- 📋 **Menu Section** — Browsable menu with category filtering (Starters, Main Course, Desserts, Beverages)
- 🖼️ **Gallery Section** — Masonry-style photo gallery
- 📞 **Contact Section** — Contact form, map embed, social media links, and address
- 🔐 **Admin Panel** — Session-based login for CRUD operations on menu items and contact info
- ☁️ **Image Uploads** — Cloudinary integration for image hosting (optional)
- 🗄️ **Dual Storage** — In-memory (default) or PostgreSQL via Neon (persistent)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Wouter | Lightweight client-side routing |
| TanStack React Query v5 | Server state & data fetching |
| shadcn/ui + Radix UI | Accessible component library |
| Tailwind CSS | Utility-first styling |
| React Hook Form + Zod | Form management & validation |
| Framer Motion | Animations |
| Lucide React | Icons |
| Embla Carousel | Image carousel/slider |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | HTTP server |
| TypeScript (tsx) | Runtime TypeScript execution |
| express-session + memorystore | Session management |
| bcrypt | Password hashing |
| pg (node-postgres) | PostgreSQL client |
| multer | File upload handling |
| Cloudinary SDK | Cloud image storage |

### Database
| Mode | Technology | Notes |
|---|---|---|
| Default | In-memory (MemStorage) | No setup needed; resets on restart |
| Persistent | PostgreSQL via Neon | Activated when `DATABASE_URL` is set |

---

## 📁 Project Structure

```
delizioso-project/
├── client/                  # Frontend (React + Vite)
│   ├── index.html
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # UI components (Nav, Menu, Gallery, etc.)
│       ├── pages/           # Page-level components
│       ├── hooks/           # Custom React hooks
│       └── lib/             # Utilities, query client setup
├── server/                  # Backend (Express)
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API route definitions
│   ├── storage.ts           # Storage auto-selector (MemStorage or PgStorage)
│   ├── pgStorage.ts         # PostgreSQL IStorage implementation
│   ├── db.ts                # pg Pool connection
│   ├── defaults.ts          # Default seed data
│   ├── static.ts            # Static file serving
│   └── vite.ts              # Vite dev middleware integration
├── shared/
│   └── schema.ts            # Shared Zod schemas (MenuItem, ContactInfo, etc.)
├── schema.sql               # PostgreSQL schema + seed data
├── migration.sql            # Database migration script
├── NEON_SETUP.md            # Step-by-step guide: Neon + Cloudinary setup
├── design_guidelines.md     # Design system documentation
├── drizzle.config.ts        # Drizzle ORM config
├── vite.config.ts           # Vite build config
├── tailwind.config.ts       # Tailwind CSS theme config
├── tsconfig.json            # TypeScript config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd delizioso-project

# Install dependencies
npm install
```

### Running Locally (Development)

```bash
npm run dev
```

The app starts on `http://localhost:5000` by default.
- Frontend is served via Vite dev middleware
- Backend API is available under `/api/`
- In-memory storage is used by default — **no database setup required**

---

## 🔑 Admin Access

The admin panel is accessible from the main site (look for the login option in the navigation).

| Credential | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ **Change the default password** before deploying to production — especially when using PostgreSQL storage.

---

## 🗄️ Database Setup (Optional — PostgreSQL via Neon)

By default the app runs with **in-memory storage** (data resets on restart).  
To enable **persistent storage**, connect a free [Neon](https://neon.tech) PostgreSQL database:

### 1. Create a Neon Project
Go to [neon.tech](https://neon.tech), sign up, and create a new project.

### 2. Apply the Schema
In the Neon dashboard, open the **SQL Editor**, paste the contents of `schema.sql`, and click **Run**.

### 3. Set Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@ep-something.region.aws.neon.tech/neondb?sslmode=require
SESSION_SECRET=your-strong-random-secret
```

### 4. Restart the App

```bash
npm run dev
```

You should see in the console:
```
[storage] Using PostgreSQL storage (Neon)
```

> For the full step-by-step guide, see [NEON_SETUP.md](./NEON_SETUP.md).

---

## ☁️ Cloudinary Image Uploads (Optional)

To enable image file uploads in the admin panel, add these environment variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Or use the combined URL format:
```env
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

Once set, the `POST /api/upload` endpoint becomes active.  
Without this config, image URLs can still be entered manually.

---

## 🌐 API Reference

All routes are prefixed with `/api/`.

### Menu
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/menu` | No | List all menu items |
| `POST` | `/api/menu` | ✅ Admin | Create a new menu item |
| `GET` | `/api/menu/:id` | No | Get a single menu item |
| `PUT` | `/api/menu/:id` | ✅ Admin | Update a menu item |
| `DELETE` | `/api/menu/:id` | ✅ Admin | Delete a menu item |

### Contact
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/contact` | No | Get contact information |
| `PUT` | `/api/contact` | ✅ Admin | Update contact information |

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login with username/password |
| `POST` | `/api/auth/logout` | End admin session |
| `GET` | `/api/auth/check` | Check current auth status |

### Uploads
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/upload` | ✅ Admin | Upload image to Cloudinary |

---

## ⚙️ Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | For PostgreSQL | Neon connection string |
| `SESSION_SECRET` | Recommended | Signs session cookies securely |
| `NODE_ENV` | Auto-set | Controls cookie security & Vite dev middleware |
| `CLOUDINARY_URL` | For image uploads | Cloudinary connection string (combined) |
| `CLOUDINARY_CLOUD_NAME` | For image uploads | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | For image uploads | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | For image uploads | Cloudinary API secret |

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (frontend + backend) |
| `npm run build` | Build for production (`dist/`) |
| `npm run start` | Run the production build |
| `npm run check` | TypeScript type-check |
| `npm run db:push` | Push Drizzle schema to database |

---

## 🎨 Design System

The design is inspired by premium hospitality experiences, featuring:

- **Fonts:** Playfair Display (headings) + Inter / DM Sans (body)
- **Primary Color:** Warm orange — `hsl(15 86% 55%)`
- **Layout:** Max-width `7xl` containers, responsive grid (1 → 2 → 3 columns)
- **Components:** Cards with hover lift, pill-shaped CTAs, backdrop-blur navigation
- **Animations:** Subtle hover effects, scroll fade-ins via Framer Motion

See [`design_guidelines.md`](./design_guidelines.md) for the full design specification.

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** when using PostgreSQL storage
- Sessions use `httpOnly` cookies (secure in production)
- Session TTL: **24 hours**
- All admin routes are protected by the `requireAdmin` middleware
- Set a strong `SESSION_SECRET` in production

---

## 📄 License

MIT © Delizioso Project
