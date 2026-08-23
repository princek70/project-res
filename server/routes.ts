import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { storagePromise } from "./storage";
import { insertMenuItemSchema, contactInfoSchema, loginSchema, restaurantInfoSchema, contactMessageSchema } from "@shared/schema";

const upload = multer({ storage: multer.memoryStorage() });

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
} else if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: "Unauthorized - Admin access required" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const storage = await storagePromise;

  // ── Image Upload (Cloudinary) ──────────────────────────────────────────────
  app.post(
    "/api/upload",
    requireAdmin,
    upload.single("image"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file provided" });
        }

        const cloudinaryConfigured =
          process.env.CLOUDINARY_URL ||
          (process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET);

        if (!cloudinaryConfigured) {
          return res
            .status(503)
            .json({
              error:
                "Image upload unavailable: Cloudinary is not configured. Add CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET to environment variables.",
            });
        }

        const base64 = req.file.buffer.toString("base64");
        const dataUri = `data:${req.file.mimetype};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "delizioso/menu",
          transformation: [{ width: 800, crop: "limit" }],
        });

        res.json({ url: result.secure_url });
      } catch (error) {
        console.error("[upload] Cloudinary error:", error);
        res.status(500).json({ error: "Image upload failed" });
      }
    }
  );

  // ── Restaurant ────────────────────────────────────────────────────────────
  app.get("/api/restaurant", async (_req, res) => {
    try {
      const info = await storage.getRestaurantInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurant info" });
    }
  });

  app.put("/api/restaurant", requireAdmin, async (req, res) => {
    try {
      const result = restaurantInfoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid restaurant info", details: result.error.issues });
      }
      const info = await storage.updateRestaurantInfo(result.data);
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to update restaurant info" });
    }
  });

  // ── Menu ──────────────────────────────────────────────────────────────────
  app.get("/api/menu", async (_req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const item = await storage.getMenuItem(id);
      if (!item) return res.status(404).json({ error: "Menu item not found" });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu item" });
    }
  });

  app.post("/api/menu", requireAdmin, async (req, res) => {
    try {
      const result = insertMenuItemSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid menu item data", details: result.error.issues });
      }
      const item = await storage.createMenuItem(result.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to create menu item" });
    }
  });

  app.put("/api/menu/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const result = insertMenuItemSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid menu item data", details: result.error.issues });
      }
      const item = await storage.updateMenuItem(id, result.data);
      if (!item) return res.status(404).json({ error: "Menu item not found" });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update menu item" });
    }
  });

  app.delete("/api/menu/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const success = await storage.deleteMenuItem(id);
      if (!success) return res.status(404).json({ error: "Menu item not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete menu item" });
    }
  });

  // ── Contact ───────────────────────────────────────────────────────────────
  app.post("/api/contact/message", async (req, res) => {
    try {
      const result = contactMessageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid message data", details: result.error.issues });
      }
  
      const { name, email, message } = result.data;
  
      const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
      const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;
      const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : undefined);
      const smtpPort = process.env.SMTP_PORT || (process.env.GMAIL_USER ? "465" : undefined);
  
      let smtpSent = false;
      if (smtpUser && smtpPass && smtpHost && smtpPort) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(smtpPort),
            secure: Number(smtpPort) === 465,
            auth: { user: smtpUser, pass: smtpPass },
          });
  
          const mailOptions = {
            from: smtpUser,
            to: process.env.CONTACT_EMAIL || smtpUser,
            replyTo: email,
            subject: `New Contact Message from ${name}`,
            text: `${message}\n\nFrom: ${name} <${email}>`,
          };
  
          await transporter.sendMail(mailOptions);
          smtpSent = true;
        } catch (error) {
          console.error("SMTP delivery failed, falling back to Web3Forms:", error);
        }
      }

      if (smtpSent) {
        return res.json({ success: true, message: "Message sent via SMTP" });
      }
  
      // ---------- Web3Forms ----------
      if (!process.env.WEB3FORMS_ACCESS_KEY) {
        console.warn(
          "WEB3FORMS_ACCESS_KEY missing – message will be logged only.",
          { name, email, message }
        );
        return res.json({ success: true, message: "Message logged (no Web3Forms key)" });
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            subject: `New Contact Message from ${name}`,
            from_name: "Delizioso Website",
          }),
        });

        // Non‑200 status → log & treat as logged message
        if (!response.ok) {
          const errBody = await response.text();
          console.error("Web3Forms request failed", {
            status: response.status,
            statusText: response.statusText,
            body: errBody,
          });
          return res.json({ success: true, message: "Message logged (Web3Forms request failed)" });
        }

        // Ensure JSON response
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const rawBody = await response.text();
          console.error("Web3Forms returned non‑JSON", {
            status: response.status,
            contentType,
            body: rawBody,
          });
          return res.json({ success: true, message: "Message logged (non‑JSON response)" });
        }

        // Parse JSON safely
        let data;
        try {
          data = await response.json();
        } catch (jsonErr) {
          const raw = await response.text();
          console.error("Failed to parse Web3Forms JSON", {
            error: jsonErr,
            rawBody: raw,
          });
          return res.json({ success: true, message: "Message logged (invalid JSON)" });
        }

        // Web3Forms reported failure?
        if (!data.success) {
          console.warn("Web3Forms reported failure", data);
          return res.json({ success: true, message: "Message logged (Web3Forms reported failure)" });
        }

        // SUCCESS
        return res.json({ success: true, message: "Message sent successfully via Web3Forms" });
      } catch (e) {
        console.error("Unexpected error during Web3Forms request", e);
        return res.json({ success: true, message: "Message logged (unexpected error)" });
      }

  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const info = await storage.getContactInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  app.put("/api/contact", requireAdmin, async (req, res) => {
    try {
      const result = contactInfoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid contact info", details: result.error.issues });
      }
      const info = await storage.updateContactInfo(result.data);
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact info" });
    }
  });

  // ── Auth ──────────────────────────────────────────────────────────────────
  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ success: false, message: "Invalid credentials format" });
      }
      const { username, password } = result.data;
      const isValid = await storage.validateAdminCredentials(username, password);
      if (isValid) {
        req.session.isAdmin = true;
        res.json({ success: true, role: "admin" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ success: false, message: "Logout failed" });
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  app.get("/api/auth/check", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  return httpServer;
}
