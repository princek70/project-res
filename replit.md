# Delizioso Restaurant Website

## Overview

Delizioso is a full-stack restaurant website for a fictional fine dining establishment. The application presents a single-page experience with sections for hero, about, menu, gallery, and contact information. It includes an admin authentication system allowing restaurant owners to manage menu items and contact information through the live site.

The backend supports two storage modes:
- **In-memory** (default, no setup needed — data resets on restart)
- **PostgreSQL via Neon** (persistent — activated automatically when `DATABASE_URL` is set)

**Core Features:**
- Public-facing restaurant site with smooth scroll navigation between sections
- Menu browsing with category filtering (Starters, Main Course, Desserts, Beverages)
- Photo gallery display
- Contact section with social media links and map embed
- Admin login with session-based authentication (bcrypt password hashing when using PostgreSQL)
- Admin CRUD operations for menu items and contact info
- Cloudinary image upload endpoint (`POST /api/upload`) — active when Cloudinary env vars are set

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework:** React 18 with TypeScript, bundled via Vite
- **Routing:** Wouter (lightweight client-side router) — only two routes: `/` (Home) and a 404 fallback
- **State Management:** TanStack React Query for server state (menu items, contact info); React `useState` for local UI state
- **UI Components:** shadcn/ui component library built on Radix UI primitives, styled with Tailwind CSS
- **Forms:** React Hook Form with Zod resolvers for validation
- **Design System:** Custom Tailwind theme using CSS variables for colors; Playfair Display (serif) for headings, Inter/DM Sans for body text; warm orange primary color (`hsl(15 86% 55%)`)
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Runtime:** Node.js with Express, written in TypeScript, run via `tsx`
- **Session Management:** `express-session` with `memorystore` for in-memory session storage
- **Authentication:** Session-based admin auth; password validation uses bcrypt (PgStorage) or plaintext comparison (MemStorage); session flag `req.session.isAdmin` gates protected routes
- **API Structure:** RESTful routes under `/api/`:
  - `GET/POST /api/menu` — list and create menu items
  - `GET/PUT/DELETE /api/menu/:id` — single item operations
  - `GET/PUT /api/contact` — contact info
  - `POST /api/upload` — Cloudinary image upload (admin only, requires Cloudinary env vars)
  - `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/check`
- **Storage Layer:** Abstracted via `IStorage` interface with two implementations:
  - `MemStorage` — in-memory Map, default when no DATABASE_URL
  - `PgStorage` — PostgreSQL via `pg` Pool, used when DATABASE_URL is set; auto-seeds on first run

### Data Storage
- **Default:** In-memory storage (`MemStorage`) — data resets on server restart
- **PostgreSQL:** `PgStorage` using raw `pg` Pool queries against Neon; schema in `schema.sql`
- **Schema (Zod-defined in shared/schema.ts):**
  - `MenuItem`: id, category (enum), name, description, price, image URL
  - `ContactInfo`: phone, email, address, social URLs, map embed HTML
  - `LoginCredentials`: username, password
- **Database Tables (PostgreSQL):** users, restaurant, categories, menu_items, gallery, contact_info, contact_messages

### Authentication & Authorization
- Session cookies (`httpOnly`, secure in production, 24-hour TTL)
- `requireAdmin` middleware checks `req.session.isAdmin` on mutating routes
- Frontend `AuthContext` provides `isAdmin`, `login()`, `logout()` to all components
- Admin UI controls (edit/delete buttons) are conditionally rendered based on auth state
- Default credentials: username `admin`, password `admin123`

### Build System
- Client: Vite builds to `dist/public/`
- Server: esbuild bundles `server/index.ts` to `dist/index.cjs`
- TypeScript strict mode across all code

## Setup Files

- `schema.sql` — PostgreSQL schema + seed data; paste into Neon SQL Editor
- `server/db.ts` — pg Pool connection (null when DATABASE_URL missing)
- `server/pgStorage.ts` — PostgreSQL IStorage implementation with bcrypt auth
- `server/storage.ts` — auto-selects PgStorage or MemStorage based on DATABASE_URL
- `NEON_SETUP.md` — step-by-step guide for connecting Neon + Cloudinary

## External Dependencies

### UI & Styling
- **Radix UI** — Headless accessible component primitives
- **shadcn/ui** — Component library pattern layered over Radix UI
- **Tailwind CSS** — Utility-first styling with custom theme variables
- **Lucide React** — Icon library
- **Embla Carousel** — Carousel/slider component

### Data & Forms
- **TanStack React Query v5** — Server state caching and synchronization
- **React Hook Form** — Form state management
- **Zod** — Schema validation shared between frontend and backend

### Backend
- **Express** — HTTP server framework
- **express-session + memorystore** — Session management
- **pg** — PostgreSQL Node.js client (for Neon)
- **bcrypt** — Password hashing for admin credentials
- **multer** — Multipart form data / file upload handling
- **cloudinary** — Cloud image storage and transformation

### Key Environment Variables
- `DATABASE_URL` — Neon PostgreSQL connection string (enables persistent storage)
- `SESSION_SECRET` — Express session signing secret
- `CLOUDINARY_URL` — Cloudinary connection string (enables image uploads)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Alternative Cloudinary config
- `NODE_ENV` — Controls cookie security and Vite dev middleware
