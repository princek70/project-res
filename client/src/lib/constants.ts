import type { MenuItem, ContactInfo } from "@shared/schema";

export const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    category: "Starters",
    name: "Crispy Calamari",
    description: "Tender squid rings, lightly breaded and fried to golden perfection",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500"
  },
  {
    id: 2,
    category: "Starters",
    name: "Bruschetta Trio",
    description: "Three varieties of Italian toasted bread with fresh toppings",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500"
  },
  {
    id: 3,
    category: "Main Course",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500"
  },
  {
    id: 4,
    category: "Main Course",
    name: "Ribeye Steak",
    description: "Premium 12oz ribeye, perfectly grilled with garlic herb butter",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=500"
  },
  {
    id: 5,
    category: "Main Course",
    name: "Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms and parmesan",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1476124369491-c4206de0c1f2?w=500"
  },
  {
    id: 6,
    category: "Desserts",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500"
  },
  {
    id: 7,
    category: "Desserts",
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 8,
    category: "Beverages",
    name: "Fresh Lemonade",
    description: "House-made lemonade with mint and fresh berries",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 9,
    category: "Beverages",
    name: "Espresso Martini",
    description: "Smooth blend of vodka, coffee liqueur, and fresh espresso",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500"
  }
];

export const defaultContactInfo: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "info@delizioso.com",
  address: "123 Culinary Street, Foodville, CA 90210",
  instagram: "https://instagram.com/delizioso",
  facebook: "https://facebook.com/delizioso",
  twitter: "https://twitter.com/delizioso",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.4537!2d-118.243683!3d34.052235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA4LjAiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890"
};

export const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600"
];
