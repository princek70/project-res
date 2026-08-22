import { z } from "zod";

export const menuItemSchema = z.object({
  id: z.number(),
  category: z.enum(["Starters", "Main Course", "Desserts", "Beverages", "Breads", "Rice & Biryani"]),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  image: z.string().url(),
});

export const insertMenuItemSchema = menuItemSchema.omit({ id: true });

export type MenuItem = z.infer<typeof menuItemSchema>;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export const contactInfoSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  instagram: z.string().url(),
  facebook: z.string().url(),
  twitter: z.string().url(),
  mapEmbed: z.string(),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const categories = ["Starters", "Main Course", "Desserts", "Beverages", "Breads", "Rice & Biryani"] as const;
export type Category = typeof categories[number];

export const restaurantInfoSchema = z.object({
  name: z.string().min(1),
  tagline: z.string(),
  description: z.string(),
  heroImage: z.string().url(),
  aboutImage: z.string().url(),
});

export type RestaurantInfo = z.infer<typeof restaurantInfoSchema>;
