# Connecting Delizioso to a Neon PostgreSQL Database

Follow these steps to switch from in-memory storage to a real PostgreSQL database.

---

## Step 1 — Create a Neon Project

1. Go to [https://neon.tech](https://neon.tech) and sign up / log in.
2. Click **"New Project"**.
3. Give it a name (e.g. `delizioso`) and choose your region.
4. Click **"Create Project"**.

---

## Step 2 — Apply the Schema

1. In the Neon dashboard, open your project and click **"SQL Editor"** in the left sidebar.
2. Open the file `schema.sql` from this project (it is in the project root).
3. Copy the **entire contents** and paste them into the Neon SQL editor.
4. Click **"Run"**. You should see success messages for each table and seed data row.

The schema creates these tables:
- `users` — admin login with bcrypt-hashed password
- `restaurant` — restaurant branding info
- `categories` — menu categories
- `menu_items` — all menu items
- `gallery` — photo gallery entries
- `contact_info` — contact details
- `contact_messages` — visitor enquiries

Sample data (menu items, contact info, admin user) is seeded automatically.

> **Default admin login after seeding:**
> - Username: `admin`
> - Password: `admin123`

---

## Step 3 — Get the DATABASE_URL

1. In your Neon project dashboard, click **"Connection Details"** (or **"Connect"**).
2. Select **"Connection string"** format.
3. Copy the full connection string. It looks like:
   ```
   postgresql://user:password@ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

## Step 4 — Add DATABASE_URL to Replit

1. In Replit, click the **lock icon (Secrets)** in the left sidebar, or go to **Tools → Secrets**.
2. Click **"New Secret"**.
3. Set the **Key** to: `DATABASE_URL`
4. Paste your Neon connection string as the **Value**.
5. Click **"Add Secret"**.

---

## Step 5 — Restart the App

1. In Replit, click the **"Stop"** button in the workflow bar, then click **"Run"** (or restart the `Start application` workflow).
2. Check the console — you should see:
   ```
   [storage] Using PostgreSQL storage (Neon)
   ```
3. Your app now reads and writes to the real Neon database. All changes to menu items and contact info will persist across restarts.

---

## Cloudinary Image Uploads (Optional)

To enable image file uploads (instead of only URL input) in the admin panel:

1. Go to [https://cloudinary.com](https://cloudinary.com) and sign up for a free account.
2. From your Cloudinary dashboard, copy your **Cloud Name**, **API Key**, and **API Secret**.
3. Add them as Replit Secrets:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret

   Or alternatively, add a single `CLOUDINARY_URL` secret using the format:
   ```
   cloudinary://API_KEY:API_SECRET@CLOUD_NAME
   ```
4. Restart the app. The `/api/upload` endpoint will become active.

---

## Environment Variables Summary

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | For PostgreSQL | Neon connection string |
| `SESSION_SECRET` | Recommended | Signs session cookies securely |
| `CLOUDINARY_URL` | For image upload | Cloudinary connection string |
| `CLOUDINARY_CLOUD_NAME` | Alternative to CLOUDINARY_URL | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Alternative to CLOUDINARY_URL | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Alternative to CLOUDINARY_URL | Cloudinary API secret |

> Without `DATABASE_URL`, the app runs with in-memory storage (data resets on restart).  
> Without Cloudinary config, image uploads are disabled but URL-based images still work.
