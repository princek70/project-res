import bcrypt from "bcrypt";
import { query } from "./db";
import type { IStorage } from "./storage";
import type { MenuItem, InsertMenuItem, ContactInfo, RestaurantInfo } from "@shared/schema";
import { defaultMenuItems, defaultContactInfo, defaultRestaurantInfo } from "./defaults";

export class PgStorage implements IStorage {
  async initialize(): Promise<void> {
    // Only seed default items if the table is completely empty
    const menuCount = await query("SELECT COUNT(*) FROM menu_items");
    if (parseInt(menuCount.rows[0].count) === 0) {
      for (const item of defaultMenuItems) {
        await query(
          "INSERT INTO menu_items (category, name, description, price, image) VALUES ($1, $2, $3, $4, $5)",
          [item.category, item.name, item.description, item.price, item.image]
        );
      }
    }

    const contactCount = await query("SELECT COUNT(*) FROM contact_info");
    if (parseInt(contactCount.rows[0].count) === 0) {
      const c = defaultContactInfo;
      await query(
        `INSERT INTO contact_info (phone, email, address, instagram, facebook, twitter, map_embed)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c.phone, c.email, c.address, c.instagram, c.facebook, c.twitter, c.mapEmbed]
      );
    }

    const userCount = await query("SELECT COUNT(*) FROM users");
    if (parseInt(userCount.rows[0].count) === 0) {
      const hash = await bcrypt.hash("admin123", 10);
      await query(
        "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        ["admin", hash, "admin"]
      );
    }

    // Ensure restaurant table has image columns (safe migration)
    try {
      await query(`ALTER TABLE restaurant ADD COLUMN IF NOT EXISTS hero_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600'`);
      await query(`ALTER TABLE restaurant ADD COLUMN IF NOT EXISTS about_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'`);
    } catch (_) { /* columns may already exist */ }
  }

  async getMenuItems(): Promise<MenuItem[]> {
    const result = await query(
      "SELECT id, category, name, description, price::float AS price, image FROM menu_items ORDER BY id"
    );
    return result.rows as MenuItem[];
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    const result = await query(
      "SELECT id, category, name, description, price::float AS price, image FROM menu_items WHERE id = $1",
      [id]
    );
    return result.rows[0] as MenuItem | undefined;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const result = await query(
      `INSERT INTO menu_items (category, name, description, price, image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, category, name, description, price::float AS price, image`,
      [item.category, item.name, item.description, item.price, item.image]
    );
    return result.rows[0] as MenuItem;
  }

  async updateMenuItem(id: number, item: InsertMenuItem): Promise<MenuItem | undefined> {
    const result = await query(
      `UPDATE menu_items
       SET category = $1, name = $2, description = $3, price = $4, image = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING id, category, name, description, price::float AS price, image`,
      [item.category, item.name, item.description, item.price, item.image, id]
    );
    return result.rows[0] as MenuItem | undefined;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    const result = await query("DELETE FROM menu_items WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async getContactInfo(): Promise<ContactInfo> {
    const result = await query(
      "SELECT phone, email, address, instagram, facebook, twitter, map_embed AS \"mapEmbed\" FROM contact_info LIMIT 1"
    );
    return result.rows[0] as ContactInfo;
  }

  async updateContactInfo(info: ContactInfo): Promise<ContactInfo> {
    const existing = await query("SELECT id FROM contact_info LIMIT 1");
    if (existing.rows.length === 0) {
      await query(
        `INSERT INTO contact_info (phone, email, address, instagram, facebook, twitter, map_embed)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [info.phone, info.email, info.address, info.instagram, info.facebook, info.twitter, info.mapEmbed]
      );
    } else {
      await query(
        `UPDATE contact_info
         SET phone = $1, email = $2, address = $3, instagram = $4, facebook = $5, twitter = $6,
             map_embed = $7, updated_at = NOW()
         WHERE id = $8`,
        [info.phone, info.email, info.address, info.instagram, info.facebook, info.twitter, info.mapEmbed, existing.rows[0].id]
      );
    }
    return info;
  }

  async getRestaurantInfo(): Promise<RestaurantInfo> {
    const result = await query(
      `SELECT name, tagline, description,
              hero_image AS "heroImage", about_image AS "aboutImage"
       FROM restaurant LIMIT 1`
    );
    if (result.rows.length === 0) return { ...defaultRestaurantInfo };
    return result.rows[0] as RestaurantInfo;
  }

  async updateRestaurantInfo(info: RestaurantInfo): Promise<RestaurantInfo> {
    const existing = await query("SELECT id FROM restaurant LIMIT 1");
    if (existing.rows.length === 0) {
      await query(
        `INSERT INTO restaurant (name, tagline, description, hero_image, about_image)
         VALUES ($1, $2, $3, $4, $5)`,
        [info.name, info.tagline, info.description, info.heroImage, info.aboutImage]
      );
    } else {
      await query(
        `UPDATE restaurant
         SET name = $1, tagline = $2, description = $3,
             hero_image = $4, about_image = $5, updated_at = NOW()
         WHERE id = $6`,
        [info.name, info.tagline, info.description, info.heroImage, info.aboutImage, existing.rows[0].id]
      );
    }
    return info;
  }

  async validateAdminCredentials(username: string, password: string): Promise<boolean> {
    const result = await query(
      "SELECT password_hash FROM users WHERE username = $1 AND role = 'admin'",
      [username]
    );
    if (result.rows.length === 0) return false;
    return bcrypt.compare(password, result.rows[0].password_hash);
  }
}
