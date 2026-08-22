import type { MenuItem, InsertMenuItem, ContactInfo, RestaurantInfo } from "@shared/schema";
import { defaultMenuItems, defaultContactInfo, defaultRestaurantInfo } from "./defaults";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: InsertMenuItem): Promise<MenuItem | undefined>;
  deleteMenuItem(id: number): Promise<boolean>;
  getContactInfo(): Promise<ContactInfo>;
  updateContactInfo(info: ContactInfo): Promise<ContactInfo>;
  getRestaurantInfo(): Promise<RestaurantInfo>;
  updateRestaurantInfo(info: RestaurantInfo): Promise<RestaurantInfo>;
  validateAdminCredentials(username: string, password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<number, MenuItem>;
  private contactInfo: ContactInfo;
  private restaurantInfo: RestaurantInfo;
  private nextMenuItemId: number;

  constructor() {
    this.menuItems = new Map();
    this.contactInfo = { ...defaultContactInfo };
    this.restaurantInfo = { ...defaultRestaurantInfo };
    this.nextMenuItemId = 1;

    for (const item of defaultMenuItems) {
      this.menuItems.set(item.id, item);
      if (item.id >= this.nextMenuItemId) {
        this.nextMenuItemId = item.id + 1;
      }
    }
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const id = this.nextMenuItemId++;
    const menuItem: MenuItem = { ...item, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async updateMenuItem(id: number, item: InsertMenuItem): Promise<MenuItem | undefined> {
    if (!this.menuItems.has(id)) return undefined;
    const updatedItem: MenuItem = { ...item, id };
    this.menuItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    return this.menuItems.delete(id);
  }

  async getContactInfo(): Promise<ContactInfo> {
    return { ...this.contactInfo };
  }

  async updateContactInfo(info: ContactInfo): Promise<ContactInfo> {
    this.contactInfo = { ...info };
    return this.contactInfo;
  }

  async getRestaurantInfo(): Promise<RestaurantInfo> {
    return { ...this.restaurantInfo };
  }

  async updateRestaurantInfo(info: RestaurantInfo): Promise<RestaurantInfo> {
    this.restaurantInfo = { ...info };
    return this.restaurantInfo;
  }

  async validateAdminCredentials(username: string, password: string): Promise<boolean> {
    return username === "admin" && password === "admin123";
  }
}

async function createStorage(): Promise<IStorage> {
  if (process.env.DATABASE_URL) {
    try {
      const { PgStorage } = await import("./pgStorage");
      const pg = new PgStorage();
      await pg.initialize();
      console.log("[storage] Using PostgreSQL storage (Neon)");
      return pg;
    } catch (err) {
      console.error("[storage] PostgreSQL failed, falling back to in-memory storage:", err);
    }
  } else {
    console.log("[storage] DATABASE_URL not set — using in-memory storage");
  }
  return new MemStorage();
}

export const storagePromise = createStorage();
export let storage: IStorage = new MemStorage();

storagePromise.then((s) => {
  storage = s;
});
