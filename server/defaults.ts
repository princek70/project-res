import type { MenuItem, ContactInfo, RestaurantInfo } from "@shared/schema";

export const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    category: "Starters",
    name: "Samosa",
    description: "Authentic Indian Samosa prepared with traditional spices and fresh ingredients.",
    price: 150,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Samosachutney.jpg/500px-Samosachutney.jpg"
  },
  {
    id: 2,
    category: "Starters",
    name: "Paneer Tikka",
    description: "Authentic Indian Paneer Tikka prepared with traditional spices and fresh ingredients.",
    price: 170,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Paneer_tikka_marinated.jpg/500px-Paneer_tikka_marinated.jpg"
  },
  {
    id: 3,
    category: "Starters",
    name: "Chicken Tikka",
    description: "Authentic Indian Chicken Tikka prepared with traditional spices and fresh ingredients.",
    price: 190,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Chicken_Tikka_on_skewers.jpg/500px-Chicken_Tikka_on_skewers.jpg"
  },
  {
    id: 4,
    category: "Starters",
    name: "Hara Bhara Kebab",
    description: "Authentic Indian Hara Bhara Kebab prepared with traditional spices and fresh ingredients.",
    price: 210,
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=500"
  },
  {
    id: 5,
    category: "Starters",
    name: "Aloo Tikki",
    description: "Authentic Indian Aloo Tikki prepared with traditional spices and fresh ingredients.",
    price: 230,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Aloo_Tikki_Chaat_-_New_Delhi_2012-05-10_4057.JPG/500px-Aloo_Tikki_Chaat_-_New_Delhi_2012-05-10_4057.JPG"
  },
  {
    id: 6,
    category: "Starters",
    name: "Veg Pakora",
    description: "Authentic Indian Veg Pakora prepared with traditional spices and fresh ingredients.",
    price: 150,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pakora_vegetable.jpg/500px-Pakora_vegetable.jpg"
  },
  {
    id: 7,
    category: "Starters",
    name: "Chicken 65",
    description: "Authentic Indian Chicken 65 prepared with traditional spices and fresh ingredients.",
    price: 170,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Chicken_65_%28Dish%29.jpg/500px-Chicken_65_%28Dish%29.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tandoori_chicken_in_a_restaurant.jpg/500px-Tandoori_chicken_in_a_restaurant.jpg"
  },
  {
    id: 10,
    category: "Starters",
    name: "Papdi Chaat",
    description: "Authentic Indian Papdi Chaat prepared with traditional spices and fresh ingredients.",
    price: 230,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Papri_Chaat.JPG/500px-Papri_Chaat.JPG"
  },
  {
    id: 11,
    category: "Main Course",
    name: "Butter Chicken",
    description: "Authentic Indian Butter Chicken prepared with traditional spices and fresh ingredients.",
    price: 350,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/500px-Chicken_makhani.jpg"
  },
  {
    id: 12,
    category: "Main Course",
    name: "Paneer Butter Masala",
    description: "Authentic Indian Paneer Butter Masala prepared with traditional spices and fresh ingredients.",
    price: 370,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Paneer_butter_masala.JPG/500px-Paneer_butter_masala.JPG"
  },
  {
    id: 13,
    category: "Main Course",
    name: "Chicken Tikka Masala",
    description: "Authentic Indian Chicken Tikka Masala prepared with traditional spices and fresh ingredients.",
    price: 390,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Chicken_Tikka_Masala_Curry.png/500px-Chicken_Tikka_Masala_Curry.png"
  },
  {
    id: 14,
    category: "Main Course",
    name: "Dal Makhani",
    description: "Authentic Indian Dal Makhani prepared with traditional spices and fresh ingredients.",
    price: 410,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Dal_Makhani.jpg/500px-Dal_Makhani.jpg"
  },
  {
    id: 15,
    category: "Main Course",
    name: "Chole Bhature",
    description: "Authentic Indian Chole Bhature prepared with traditional spices and fresh ingredients.",
    price: 430,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Chole_Bhature_-_A_North_Indian_Dish.jpg/500px-Chole_Bhature_-_A_North_Indian_Dish.jpg"
  },
  {
    id: 16,
    category: "Main Course",
    name: "Rajma Masala",
    description: "Authentic Indian Rajma Masala prepared with traditional spices and fresh ingredients.",
    price: 350,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rajma_chawal_with_salad.JPG/500px-Rajma_chawal_with_salad.JPG"
  },
  {
    id: 17,
    category: "Main Course",
    name: "Kadai Paneer",
    description: "Authentic Indian Kadai Paneer prepared with traditional spices and fresh ingredients.",
    price: 370,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kadai_Paneer_with_Roti.jpg/500px-Kadai_Paneer_with_Roti.jpg"
  },
  {
    id: 18,
    category: "Main Course",
    name: "Palak Paneer",
    description: "Authentic Indian Palak Paneer prepared with traditional spices and fresh ingredients.",
    price: 390,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Palak_Paneer.JPG/500px-Palak_Paneer.JPG"
  },
  {
    id: 19,
    category: "Main Course",
    name: "Malai Kofta",
    description: "Authentic Indian Malai Kofta prepared with traditional spices and fresh ingredients.",
    price: 410,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Malai_kofta.jpg/500px-Malai_kofta.jpg"
  },
  {
    id: 20,
    category: "Main Course",
    name: "Chana Masala",
    description: "Authentic Indian Chana Masala prepared with traditional spices and fresh ingredients.",
    price: 430,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Chana_masala.jpg/500px-Chana_masala.jpg"
  },
  {
    id: 21,
    category: "Main Course",
    name: "Rogan Josh",
    description: "Authentic Indian Rogan Josh prepared with traditional spices and fresh ingredients.",
    price: 350,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rogan_Josh.jpg/500px-Rogan_Josh.jpg"
  },
  {
    id: 22,
    category: "Main Course",
    name: "Chicken Chettinad",
    description: "Authentic Indian Chicken Chettinad prepared with traditional spices and fresh ingredients.",
    price: 370,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500"
  },
  {
    id: 23,
    category: "Main Course",
    name: "Veg Biryani",
    description: "Authentic Indian Veg Biryani prepared with traditional spices and fresh ingredients.",
    price: 390,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Vegetable_Biryani.jpg/500px-Vegetable_Biryani.jpg"
  },
  {
    id: 24,
    category: "Main Course",
    name: "Chicken Biryani",
    description: "Authentic Indian Chicken Biryani prepared with traditional spices and fresh ingredients.",
    price: 410,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Chicken_Biryani_in_Chennai.jpg/500px-Chicken_Biryani_in_Chennai.jpg"
  },
  {
    id: 25,
    category: "Main Course",
    name: "Dal Tadka",
    description: "Authentic Indian Dal Tadka prepared with traditional spices and fresh ingredients.",
    price: 430,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
  },
  {
    id: 26,
    category: "Desserts",
    name: "Gulab Jamun",
    description: "Authentic Indian Gulab Jamun prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Gulab_jamun_%28Dessert%29.jpg/500px-Gulab_jamun_%28Dessert%29.jpg"
  },
  {
    id: 27,
    category: "Desserts",
    name: "Rasmalai",
    description: "Authentic Indian Rasmalai prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Rasmalai_Indian_Sweet.jpg/500px-Rasmalai_Indian_Sweet.jpg"
  },
  {
    id: 28,
    category: "Desserts",
    name: "Jalebi",
    description: "Authentic Indian Jalebi prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Jalebi_-_Indian_sweet.JPG/500px-Jalebi_-_Indian_sweet.JPG"
  },
  {
    id: 29,
    category: "Desserts",
    name: "Gajar Ka Halwa",
    description: "Authentic Indian Gajar Ka Halwa prepared with traditional spices and fresh ingredients.",
    price: 180,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Gajar_Halwa.JPG/500px-Gajar_Halwa.JPG"
  },
  {
    id: 30,
    category: "Desserts",
    name: "Kheer",
    description: "Authentic Indian Kheer prepared with traditional spices and fresh ingredients.",
    price: 200,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kheer_-_A_Traditional_Indian_Sweet.jpg/500px-Kheer_-_A_Traditional_Indian_Sweet.jpg"
  },
  {
    id: 31,
    category: "Desserts",
    name: "Kulfi",
    description: "Authentic Indian Kulfi prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kulfi_in_Matka.jpg/500px-Kulfi_in_Matka.jpg"
  },
  {
    id: 32,
    category: "Desserts",
    name: "Rasgulla",
    description: "Authentic Indian Rasgulla prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Rasgulla_-_A_Bengali_sweet.jpg/500px-Rasgulla_-_A_Bengali_sweet.jpg"
  },
  {
    id: 33,
    category: "Desserts",
    name: "Motichoor Ladoo",
    description: "Authentic Indian Motichoor Ladoo prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Motichoor_Laddoo.jpg/500px-Motichoor_Laddoo.jpg"
  },
  {
    id: 34,
    category: "Desserts",
    name: "Shahi Tukda",
    description: "Authentic Indian Shahi Tukda prepared with traditional spices and fresh ingredients.",
    price: 180,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Shahi_Tukda.jpg/500px-Shahi_Tukda.jpg"
  },
  {
    id: 35,
    category: "Desserts",
    name: "Moong Dal Halwa",
    description: "Authentic Indian Moong Dal Halwa prepared with traditional spices and fresh ingredients.",
    price: 200,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Moong_Dal_Halwa.jpg/500px-Moong_Dal_Halwa.jpg"
  },
  {
    id: 36,
    category: "Beverages",
    name: "Masala Chai",
    description: "Authentic Indian Masala Chai prepared with traditional spices and fresh ingredients.",
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Masala_Chai.JPG/500px-Masala_Chai.JPG"
  },
  {
    id: 37,
    category: "Beverages",
    name: "Mango Lassi",
    description: "Authentic Indian Mango Lassi prepared with traditional spices and fresh ingredients.",
    price: 100,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mango_Lassi.jpg/500px-Mango_Lassi.jpg"
  },
  {
    id: 38,
    category: "Beverages",
    name: "Sweet Lassi",
    description: "Authentic Indian Sweet Lassi prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Lassi.jpg/500px-Lassi.jpg"
  },
  {
    id: 39,
    category: "Beverages",
    name: "Salted Lassi",
    description: "Authentic Indian Salted Lassi prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Salted_Lassi.jpg/500px-Salted_Lassi.jpg"
  },
  {
    id: 40,
    category: "Beverages",
    name: "Masala Chaas",
    description: "Authentic Indian Masala Chaas prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Chaas_in_clay_cup.jpg/500px-Chaas_in_clay_cup.jpg"
  },
  {
    id: 41,
    category: "Beverages",
    name: "Jaljeera",
    description: "Authentic Indian Jaljeera prepared with traditional spices and fresh ingredients.",
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Jaljeera.jpg/500px-Jaljeera.jpg"
  },
  {
    id: 42,
    category: "Beverages",
    name: "Aam Panna",
    description: "Authentic Indian Aam Panna prepared with traditional spices and fresh ingredients.",
    price: 100,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Aam_Panna.JPG/500px-Aam_Panna.JPG"
  },
  {
    id: 43,
    category: "Beverages",
    name: "Fresh Lime Soda",
    description: "Authentic Indian Fresh Lime Soda prepared with traditional spices and fresh ingredients.",
    price: 120,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500"
  },
  {
    id: 44,
    category: "Beverages",
    name: "Rose Sharbat",
    description: "Authentic Indian Rose Sharbat prepared with traditional spices and fresh ingredients.",
    price: 140,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Rooh_Afza.jpg/500px-Rooh_Afza.jpg"
  },
  {
    id: 45,
    category: "Beverages",
    name: "Badam Milk",
    description: "Authentic Indian Badam Milk prepared with traditional spices and fresh ingredients.",
    price: 160,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Badam_Milk.JPG/500px-Badam_Milk.JPG"
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
