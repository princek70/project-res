-- Delizioso Restaurant - PostgreSQL Schema for Neon
-- Paste this entire file into the Neon SQL editor and run it

-- ============================================================
-- TABLES
-- ============================================================

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant info / branding
CREATE TABLE IF NOT EXISTS restaurant (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT 'Delizioso',
  tagline TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL REFERENCES categories(name) ON UPDATE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery images
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact information (single row)
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  instagram TEXT NOT NULL,
  facebook TEXT NOT NULL,
  twitter TEXT NOT NULL,
  map_embed TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages from visitors
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin user (password: admin123)
-- Hash generated with bcrypt rounds=10
INSERT INTO users (username, password_hash, role)
VALUES ('admin', '$2b$10$ZTS1lDvJmE8HtIa7u2MiaOoh/uUzcPbJM2ICgs.5R5KXGe5bONMRG', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Restaurant info
INSERT INTO restaurant (name, tagline, description)
VALUES (
  'Delizioso',
  'A Culinary Journey',
  'Experience the finest Italian-Mediterranean cuisine crafted with passion and the freshest ingredients.'
)
ON CONFLICT DO NOTHING;

-- Categories
INSERT INTO categories (name, display_order) VALUES
  ('Starters', 1),
  ('Main Course', 2),
  ('Desserts', 3),
  ('Beverages', 4),
  ('Breads', 5),
  ('Rice & Biryani', 6)
,
  ('Breads', 'Butter Naan', 'Soft and fluffy Indian bread brushed with butter.', 60, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500'),
  ('Breads', 'Garlic Naan', 'Indian flatbread topped with minced garlic and cilantro.', 80, 'https://images.unsplash.com/photo-1605493725776-dfbd24d9c836?w=500'),
  ('Breads', 'Tandoori Roti', 'Whole wheat bread baked in a traditional clay oven.', 40, 'https://images.unsplash.com/photo-1625458021008-01768c227318?w=500'),
  ('Breads', 'Lachha Paratha', 'Layered, flaky whole wheat flatbread.', 70, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500'),
  ('Breads', 'Aloo Kulcha', 'Stuffed flatbread with spiced mashed potatoes.', 90, 'https://images.unsplash.com/photo-1605493725776-dfbd24d9c836?w=500'),
  ('Rice & Biryani', 'Jeera Rice', 'Basmati rice cooked with cumin seeds and mild spices.', 150, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'),
  ('Rice & Biryani', 'Mutton Biryani', 'Aromatic basmati rice cooked with tender mutton and authentic spices.', 450, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500'),
  ('Rice & Biryani', 'Peas Pulao', 'Fragrant rice cooked with green peas and whole spices.', 180, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500'),
  ('Starters', 'Pani Puri', 'Crispy hollow puris filled with tangy, spicy water and potatoes.', 100, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500'),
  ('Starters', 'Gobi Manchurian', 'Crispy cauliflower florets tossed in a spicy, sweet, and tangy sauce.', 180, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=500'),
  ('Main Course', 'Bhindi Masala', 'Stir-fried okra cooked with onions, tomatoes, and Indian spices.', 280, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'),
  ('Main Course', 'Mutton Curry', 'Classic homestyle mutton curry cooked with aromatic spices.', 480, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500'),
  ('Desserts', 'Phirmi', 'Creamy ground rice pudding flavored with saffron and cardamom.', 150, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'),
  ('Desserts', 'Mysore Pak', 'Rich, melt-in-your-mouth Indian sweet made from gram flour and ghee.', 190, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'),
  ('Beverages', 'Filter Coffee', 'Traditional South Indian filter coffee brewed to perfection.', 90, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500'),
  ('Beverages', 'Thandai', 'Refreshing milk drink flavored with almonds, fennel seeds, and rose petals.', 160, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500')
ON CONFLICT (name) DO NOTHING;

-- Menu items
INSERT INTO menu_items (category, name, description, price, image) VALUES
  ('Starters', 'Punjabi Samosa', 'Crispy pastry filled with spiced potatoes and peas, served with mint chutney', 150, 'https://images.unsplash.com/photo-1599487405270-81598fdb53c9?w=500'),
  ('Starters', 'Paneer Tikka', 'Cubes of paneer marinated in yogurt and spices, grilled in a tandoor', 350, 'https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?w=500'),
  ('Main Course', 'Butter Chicken', 'Tender chicken pieces in a rich, creamy tomato gravy', 550, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500'),
  ('Main Course', 'Palak Paneer', 'Cottage cheese cubes in a smooth spinach puree spiced with cumin and garlic', 450, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500'),
  ('Breads', 'Garlic Naan', 'Soft Indian flatbread topped with minced garlic and butter', 90, 'https://images.unsplash.com/photo-1625458021008-01768c227318?w=500'),
  ('Breads', 'Tandoori Roti', 'Whole wheat bread baked in a traditional clay oven', 50, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500'),
  ('Rice & Biryani', 'Chicken Dum Biryani', 'Aromatic basmati rice cooked with marinated chicken and traditional spices', 450, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'),
  ('Desserts', 'Gulab Jamun', 'Deep-fried milk dumplings soaked in a sugar syrup', 120, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500'),
  ('Beverages', 'Mango Lassi', 'Refreshing sweet yogurt drink blended with fresh mango pulp', 150, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500');

INSERT INTO menu_items (category, name, description, price, image) VALUES
  ('Starters', 'Samosa', 'Authentic Indian Samosa prepared with traditional spices and fresh ingredients.', 150, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500'),
  ('Starters', 'Paneer Tikka', 'Authentic Indian Paneer Tikka prepared with traditional spices and fresh ingredients.', 170, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500'),
  ('Starters', 'Chicken Tikka', 'Authentic Indian Chicken Tikka prepared with traditional spices and fresh ingredients.', 190, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=500'),
  ('Starters', 'Hara Bhara Kebab', 'Authentic Indian Hara Bhara Kebab prepared with traditional spices and fresh ingredients.', 210, 'https://images.unsplash.com/photo-1599487405270-81598fdb53c9?w=500'),
  ('Starters', 'Aloo Tikki', 'Authentic Indian Aloo Tikki prepared with traditional spices and fresh ingredients.', 230, 'https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?w=500'),
  ('Starters', 'Veg Pakora', 'Authentic Indian Veg Pakora prepared with traditional spices and fresh ingredients.', 150, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500'),
  ('Starters', 'Chicken 65', 'Authentic Indian Chicken 65 prepared with traditional spices and fresh ingredients.', 170, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500'),
  ('Starters', 'Dahi Ke Kebab', 'Authentic Indian Dahi Ke Kebab prepared with traditional spices and fresh ingredients.', 190, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=500'),
  ('Starters', 'Tandoori Chicken', 'Authentic Indian Tandoori Chicken prepared with traditional spices and fresh ingredients.', 210, 'https://images.unsplash.com/photo-1599487405270-81598fdb53c9?w=500'),
  ('Starters', 'Papdi Chaat', 'Authentic Indian Papdi Chaat prepared with traditional spices and fresh ingredients.', 230, 'https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?w=500'),
  ('Main Course', 'Butter Chicken', 'Authentic Indian Butter Chicken prepared with traditional spices and fresh ingredients.', 350, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=500'),
  ('Main Course', 'Paneer Butter Masala', 'Authentic Indian Paneer Butter Masala prepared with traditional spices and fresh ingredients.', 370, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'),
  ('Main Course', 'Chicken Tikka Masala', 'Authentic Indian Chicken Tikka Masala prepared with traditional spices and fresh ingredients.', 390, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500'),
  ('Main Course', 'Dal Makhani', 'Authentic Indian Dal Makhani prepared with traditional spices and fresh ingredients.', 410, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500'),
  ('Main Course', 'Chole Bhature', 'Authentic Indian Chole Bhature prepared with traditional spices and fresh ingredients.', 430, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500'),
  ('Main Course', 'Rajma Masala', 'Authentic Indian Rajma Masala prepared with traditional spices and fresh ingredients.', 350, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=500'),
  ('Main Course', 'Kadai Paneer', 'Authentic Indian Kadai Paneer prepared with traditional spices and fresh ingredients.', 370, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'),
  ('Main Course', 'Palak Paneer', 'Authentic Indian Palak Paneer prepared with traditional spices and fresh ingredients.', 390, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500'),
  ('Main Course', 'Malai Kofta', 'Authentic Indian Malai Kofta prepared with traditional spices and fresh ingredients.', 410, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500'),
  ('Main Course', 'Chana Masala', 'Authentic Indian Chana Masala prepared with traditional spices and fresh ingredients.', 430, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500'),
  ('Main Course', 'Rogan Josh', 'Authentic Indian Rogan Josh prepared with traditional spices and fresh ingredients.', 350, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=500'),
  ('Main Course', 'Chicken Chettinad', 'Authentic Indian Chicken Chettinad prepared with traditional spices and fresh ingredients.', 370, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'),
  ('Main Course', 'Veg Biryani', 'Authentic Indian Veg Biryani prepared with traditional spices and fresh ingredients.', 390, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500'),
  ('Main Course', 'Chicken Biryani', 'Authentic Indian Chicken Biryani prepared with traditional spices and fresh ingredients.', 410, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500'),
  ('Main Course', 'Dal Tadka', 'Authentic Indian Dal Tadka prepared with traditional spices and fresh ingredients.', 430, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500'),
  ('Desserts', 'Gulab Jamun', 'Authentic Indian Gulab Jamun prepared with traditional spices and fresh ingredients.', 120, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'),
  ('Desserts', 'Rasmalai', 'Authentic Indian Rasmalai prepared with traditional spices and fresh ingredients.', 140, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'),
  ('Desserts', 'Jalebi', 'Authentic Indian Jalebi prepared with traditional spices and fresh ingredients.', 160, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500'),
  ('Desserts', 'Gajar Ka Halwa', 'Authentic Indian Gajar Ka Halwa prepared with traditional spices and fresh ingredients.', 180, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'),
  ('Desserts', 'Kheer', 'Authentic Indian Kheer prepared with traditional spices and fresh ingredients.', 200, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'),
  ('Desserts', 'Kulfi', 'Authentic Indian Kulfi prepared with traditional spices and fresh ingredients.', 120, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500'),
  ('Desserts', 'Rasgulla', 'Authentic Indian Rasgulla prepared with traditional spices and fresh ingredients.', 140, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'),
  ('Desserts', 'Motichoor Ladoo', 'Authentic Indian Motichoor Ladoo prepared with traditional spices and fresh ingredients.', 160, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'),
  ('Desserts', 'Shahi Tukda', 'Authentic Indian Shahi Tukda prepared with traditional spices and fresh ingredients.', 180, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500'),
  ('Desserts', 'Moong Dal Halwa', 'Authentic Indian Moong Dal Halwa prepared with traditional spices and fresh ingredients.', 200, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'),
  ('Beverages', 'Masala Chai', 'Authentic Indian Masala Chai prepared with traditional spices and fresh ingredients.', 80, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500'),
  ('Beverages', 'Mango Lassi', 'Authentic Indian Mango Lassi prepared with traditional spices and fresh ingredients.', 100, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500'),
  ('Beverages', 'Sweet Lassi', 'Authentic Indian Sweet Lassi prepared with traditional spices and fresh ingredients.', 120, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500'),
  ('Beverages', 'Salted Lassi', 'Authentic Indian Salted Lassi prepared with traditional spices and fresh ingredients.', 140, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500'),
  ('Beverages', 'Masala Chaas', 'Authentic Indian Masala Chaas prepared with traditional spices and fresh ingredients.', 160, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500'),
  ('Beverages', 'Jaljeera', 'Authentic Indian Jaljeera prepared with traditional spices and fresh ingredients.', 80, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500'),
  ('Beverages', 'Aam Panna', 'Authentic Indian Aam Panna prepared with traditional spices and fresh ingredients.', 100, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500'),
  ('Beverages', 'Fresh Lime Soda', 'Authentic Indian Fresh Lime Soda prepared with traditional spices and fresh ingredients.', 120, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500'),
  ('Beverages', 'Rose Sharbat', 'Authentic Indian Rose Sharbat prepared with traditional spices and fresh ingredients.', 140, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500'),
  ('Beverages', 'Badam Milk', 'Authentic Indian Badam Milk prepared with traditional spices and fresh ingredients.', 160, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500');

-- Contact info
INSERT INTO contact_info (phone, email, address, instagram, facebook, twitter, map_embed)
VALUES (
  '+1 (555) 123-4567',
  'info@delizioso.com',
  '123 Culinary Street, Foodville, CA 90210',
  'https://instagram.com/delizioso',
  'https://facebook.com/delizioso',
  'https://twitter.com/delizioso',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.4537!2d-118.243683!3d34.052235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA4LjAiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890'
);
