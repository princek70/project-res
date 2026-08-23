import type { MenuItem, ContactInfo, RestaurantInfo } from "@shared/schema";

export const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    category: "Starters",
    name: "Samosa",
    description: "Authentic Indian Samosa prepared with traditional spices and fresh ingredients.",
    price: 150,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 2,
    category: "Starters",
    name: "Paneer Tikka",
    description: "Authentic Indian Paneer Tikka prepared with traditional spices and fresh ingredients.",
    price: 170,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 3,
    category: "Starters",
    name: "Chicken Tikka",
    description: "Authentic Indian Chicken Tikka prepared with traditional spices and fresh ingredients.",
    price: 190,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 4,
    category: "Starters",
    name: "Hara Bhara Kebab",
    description: "Authentic Indian Hara Bhara Kebab prepared with traditional spices and fresh ingredients.",
    price: 210,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 5,
    category: "Starters",
    name: "Aloo Tikki",
    description: "Authentic Indian Aloo Tikki prepared with traditional spices and fresh ingredients.",
    price: 230,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 6,
    category: "Starters",
    name: "Veg Pakora",
    description: "Authentic Indian Veg Pakora prepared with traditional spices and fresh ingredients.",
    price: 150,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 7,
    category: "Starters",
    name: "Chicken 65",
    description: "Authentic Indian Chicken 65 prepared with traditional spices and fresh ingredients.",
    price: 170,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 8,
    category: "Starters",
    name: "Dahi Ke Kebab",
    description: "Authentic Indian Dahi Ke Kebab prepared with traditional spices and fresh ingredients.",
    price: 190,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 9,
    category: "Starters",
    name: "Tandoori Chicken",
    description: "Authentic Indian Tandoori Chicken prepared with traditional spices and fresh ingredients.",
    price: 210,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 10,
    category: "Starters",
    name: "Papdi Chaat",
    description: "Authentic Indian Papdi Chaat prepared with traditional spices and fresh ingredients.",
    price: 230,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
  },
  {
    id: 11,
    category: "Main Course",
    name: "Butter Chicken",
    description: "Authentic Indian Butter Chicken prepared with traditional spices and fresh ingredients.",
    price: 350,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 12,
    category: "Main Course",
    name: "Paneer Butter Masala",
    description: "Authentic Indian Paneer Butter Masala prepared with traditional spices and fresh ingredients.",
    price: 370,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 13,
    category: "Main Course",
    name: "Chicken Tikka Masala",
    description: "Authentic Indian Chicken Tikka Masala prepared with traditional spices and fresh ingredients.",
    price: 390,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 14,
    category: "Main Course",
    name: "Dal Makhani",
    description: "Authentic Indian Dal Makhani prepared with traditional spices and fresh ingredients.",
    price: 410,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 15,
    category: "Main Course",
    name: "Chole Bhature",
    description: "Authentic Indian Chole Bhature prepared with traditional spices and fresh ingredients.",
    price: 430,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 16,
    category: "Main Course",
    name: "Rajma Masala",
    description: "Authentic Indian Rajma Masala prepared with traditional spices and fresh ingredients.",
    price: 350,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 17,
    category: "Main Course",
    name: "Kadai Paneer",
    description: "Authentic Indian Kadai Paneer prepared with traditional spices and fresh ingredients.",
    price: 370,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 18,
    category: "Main Course",
    name: "Palak Paneer",
    description: "Authentic Indian Palak Paneer prepared with traditional spices and fresh ingredients.",
    price: 390,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 19,
    category: "Main Course",
    name: "Malai Kofta",
    description: "Authentic Indian Malai Kofta prepared with traditional spices and fresh ingredients.",
    price: 410,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 20,
    category: "Main Course",
    name: "Chana Masala",
    description: "Authentic Indian Chana Masala prepared with traditional spices and fresh ingredients.",
    price: 430,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 21,
    category: "Main Course",
    name: "Rogan Josh",
    description: "Authentic Indian Rogan Josh prepared with traditional spices and fresh ingredients.",
    price: 350,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 22,
    category: "Main Course",
    name: "Chicken Chettinad",
    description: "Authentic Indian Chicken Chettinad prepared with traditional spices and fresh ingredients.",
    price: 370,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 23,
    category: "Main Course",
    name: "Veg Biryani",
    description: "Authentic Indian Veg Biryani prepared with traditional spices and fresh ingredients.",
    price: 390,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 24,
    category: "Main Course",
    name: "Chicken Biryani",
    description: "Authentic Indian Chicken Biryani prepared with traditional spices and fresh ingredients.",
    price: 410,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 25,
    category: "Main Course",
    name: "Dal Tadka",
    description: "Authentic Indian Dal Tadka prepared with traditional spices and fresh ingredients.",
    price: 430,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
  },
  {
    id: 26,
    category: "Desserts",
    name: "Gulab Jamun",
    description: "Authentic Indian Gulab Jamun prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 27,
    category: "Desserts",
    name: "Rasmalai",
    description: "Authentic Indian Rasmalai prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 28,
    category: "Desserts",
    name: "Jalebi",
    description: "Authentic Indian Jalebi prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 29,
    category: "Desserts",
    name: "Gajar Ka Halwa",
    description: "Authentic Indian Gajar Ka Halwa prepared with traditional spices and fresh ingredients.",
    price: 180,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 30,
    category: "Desserts",
    name: "Kheer",
    description: "Authentic Indian Kheer prepared with traditional spices and fresh ingredients.",
    price: 200,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 31,
    category: "Desserts",
    name: "Kulfi",
    description: "Authentic Indian Kulfi prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 32,
    category: "Desserts",
    name: "Rasgulla",
    description: "Authentic Indian Rasgulla prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 33,
    category: "Desserts",
    name: "Motichoor Ladoo",
    description: "Authentic Indian Motichoor Ladoo prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 34,
    category: "Desserts",
    name: "Shahi Tukda",
    description: "Authentic Indian Shahi Tukda prepared with traditional spices and fresh ingredients.",
    price: 180,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 35,
    category: "Desserts",
    name: "Moong Dal Halwa",
    description: "Authentic Indian Moong Dal Halwa prepared with traditional spices and fresh ingredients.",
    price: 200,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: 36,
    category: "Beverages",
    name: "Masala Chai",
    description: "Authentic Indian Masala Chai prepared with traditional spices and fresh ingredients.",
    price: 80,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 37,
    category: "Beverages",
    name: "Mango Lassi",
    description: "Authentic Indian Mango Lassi prepared with traditional spices and fresh ingredients.",
    price: 100,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 38,
    category: "Beverages",
    name: "Sweet Lassi",
    description: "Authentic Indian Sweet Lassi prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 39,
    category: "Beverages",
    name: "Salted Lassi",
    description: "Authentic Indian Salted Lassi prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 40,
    category: "Beverages",
    name: "Masala Chaas",
    description: "Authentic Indian Masala Chaas prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 41,
    category: "Beverages",
    name: "Jaljeera",
    description: "Authentic Indian Jaljeera prepared with traditional spices and fresh ingredients.",
    price: 80,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 42,
    category: "Beverages",
    name: "Aam Panna",
    description: "Authentic Indian Aam Panna prepared with traditional spices and fresh ingredients.",
    price: 100,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 43,
    category: "Beverages",
    name: "Fresh Lime Soda",
    description: "Authentic Indian Fresh Lime Soda prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 44,
    category: "Beverages",
    name: "Rose Sharbat",
    description: "Authentic Indian Rose Sharbat prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  },
  {
    id: 45,
    category: "Beverages",
    name: "Badam Milk",
    description: "Authentic Indian Badam Milk prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500"
  }
,
  {
    id: 46,
    category: "Breads",
    name: "Butter Naan",
    description: "Soft and fluffy Indian bread brushed with butter.",
    price: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Naan_with_butter.jpg/500px-Naan_with_butter.jpg"
  },
  {
    id: 47,
    category: "Breads",
    name: "Garlic Naan",
    description: "Indian flatbread topped with minced garlic and cilantro.",
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Garlic_Naan.jpg/500px-Garlic_Naan.jpg"
  },
  {
    id: 48,
    category: "Breads",
    name: "Tandoori Roti",
    description: "Whole wheat bread baked in a traditional clay oven.",
    price: 40,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Tandoori_roti.jpg/500px-Tandoori_roti.jpg"
  },
  {
    id: 49,
    category: "Breads",
    name: "Lachha Paratha",
    description: "Layered, flaky whole wheat flatbread.",
    price: 70,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lachha_Paratha.JPG/500px-Lachha_Paratha.JPG"
  },
  {
    id: 50,
    category: "Breads",
    name: "Aloo Kulcha",
    description: "Stuffed flatbread with spiced mashed potatoes.",
    price: 90,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Amritsari_Kulcha.jpg/500px-Amritsari_Kulcha.jpg"
  },
  {
    id: 51,
    category: "Rice & Biryani",
    name: "Jeera Rice",
    description: "Basmati rice cooked with cumin seeds and mild spices.",
    price: 150,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jeera_Rice.jpg/500px-Jeera_Rice.jpg"
  },
  {
    id: 52,
    category: "Rice & Biryani",
    name: "Mutton Biryani",
    description: "Aromatic basmati rice cooked with tender mutton and authentic spices.",
    price: 450,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/500px-Hyderabadi_Chicken_Biryani.jpg"
  },
  {
    id: 53,
    category: "Rice & Biryani",
    name: "Peas Pulao",
    description: "Fragrant rice cooked with green peas and whole spices.",
    price: 180,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Peas_Pulao.JPG/500px-Peas_Pulao.JPG"
  },
  {
    id: 54,
    category: "Starters",
    name: "Pani Puri",
    description: "Crispy hollow puris filled with tangy, spicy water and potatoes.",
    price: 100,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pani_Puri_with_chutney.jpg/500px-Pani_Puri_with_chutney.jpg"
  },
  {
    id: 55,
    category: "Starters",
    name: "Gobi Manchurian",
    description: "Crispy cauliflower florets tossed in a spicy, sweet, and tangy sauce.",
    price: 180,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gobi_manchurian.jpg/500px-Gobi_manchurian.jpg"
  },
  {
    id: 56,
    category: "Main Course",
    name: "Bhindi Masala",
    description: "Stir-fried okra cooked with onions, tomatoes, and Indian spices.",
    price: 280,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Bhindi_Masala.JPG/500px-Bhindi_Masala.JPG"
  },
  {
    id: 57,
    category: "Main Course",
    name: "Mutton Curry",
    description: "Classic homestyle mutton curry cooked with aromatic spices.",
    price: 480,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mutton_Curry.jpg/500px-Mutton_Curry.jpg"
  },
  {
    id: 58,
    category: "Desserts",
    name: "Phirmi",
    description: "Creamy ground rice pudding flavored with saffron and cardamom.",
    price: 150,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Phirni.jpg/500px-Phirni.jpg"
  },
  {
    id: 59,
    category: "Desserts",
    name: "Mysore Pak",
    description: "Rich, melt-in-your-mouth Indian sweet made from gram flour and ghee.",
    price: 190,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Mysore_Pak.jpg/500px-Mysore_Pak.jpg"
  },
  {
    id: 60,
    category: "Beverages",
    name: "Filter Coffee",
    description: "Traditional South Indian filter coffee brewed to perfection.",
    price: 90,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/South_Indian_Filter_Coffee.jpg/500px-South_Indian_Filter_Coffee.jpg"
  },
  {
    id: 61,
    category: "Beverages",
    name: "Thandai",
    description: "Refreshing milk drink flavored with almonds, fennel seeds, and rose petals.",
    price: 160,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Thandai.jpg/500px-Thandai.jpg"
  }
];

export const defaultRestaurantInfo: RestaurantInfo = {
  name: "Delizioso",
  tagline: "Where Every Meal is a Masterpiece",
  description: "Founded in 2010, Delizioso has been serving exquisite culinary experiences to food lovers from around the world. Our passion for fresh ingredients, innovative recipes, and warm hospitality has made us a beloved destination for memorable dining.",
  heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600",
  aboutImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
};

export const defaultContactInfo: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "info@delizioso.com",
  address: "123 Culinary Street, Foodville, CA 90210",
  instagram: "https://instagram.com/delizioso",
  facebook: "https://facebook.com/delizioso",
  twitter: "https://twitter.com/delizioso",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.4537!2d-118.243683!3d34.052235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA4LjAiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890"
};
