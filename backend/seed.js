require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/product.model");

const cdn = (path) => `https://cdn.dummyjson.com/product-images/${path}/thumbnail.webp`;
const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const products = [
  // Electronics
  {
    name: "Apple AirPods Max Silver",
    description: "Over-ear headphones with active noise cancellation, spatial audio and 20 hours of battery life.",
    price: 59900,
    category: "Electronics",
    image: cdn("mobile-accessories/apple-airpods-max-silver"),
    stock: 12,
  },
  {
    name: "Apple MacBook Pro 14 Inch Space Grey",
    description: "14-inch Liquid Retina XDR display, Apple silicon and all-day battery life for pro workflows.",
    price: 169900,
    category: "Electronics",
    image: cdn("laptops/apple-macbook-pro-14-inch-space-grey"),
    stock: 6,
  },
  {
    name: "iPhone 13 Pro",
    description: "Pro camera system with 3x telephoto, ProMotion display and A15 Bionic chip.",
    price: 119900,
    category: "Electronics",
    image: cdn("smartphones/iphone-13-pro"),
    stock: 9,
  },
  {
    name: "Apple Watch Series 4 Gold",
    description: "Gold aluminium case with ECG, fall detection and a larger edge-to-edge display.",
    price: 29900,
    category: "Electronics",
    image: cdn("mobile-accessories/apple-watch-series-4-gold"),
    stock: 15,
  },
  {
    name: "Beats Flex Wireless Earphones",
    description: "All-day wireless earphones with magnetic earbuds and 12 hours of listening time.",
    price: 4999,
    category: "Electronics",
    image: cdn("mobile-accessories/beats-flex-wireless-earphones"),
    stock: 40,
  },
  {
    name: "Samsung Galaxy Tab S8 Plus Grey",
    description: "12.4-inch sAMOLED display tablet with S Pen included for notes and sketches.",
    price: 74999,
    category: "Electronics",
    image: cdn("tablets/samsung-galaxy-tab-s8-plus-grey"),
    stock: 7,
  },
  {
    name: "Apple MagSafe Battery Pack",
    description: "Snaps onto your iPhone and charges it on the go with MagSafe alignment.",
    price: 10900,
    category: "Electronics",
    image: cdn("mobile-accessories/apple-magsafe-battery-pack"),
    stock: 3,
  },

  // Fashion
  {
    name: "Nike Air Jordan 1 Red And Black",
    description: "The iconic high-top in the classic red and black colourway with premium leather upper.",
    price: 16995,
    category: "Fashion",
    image: cdn("mens-shoes/nike-air-jordan-1-red-and-black"),
    stock: 8,
  },
  {
    name: "Rolex Submariner Watch",
    description: "Legendary steel diver's watch with a unidirectional rotatable bezel and Oystersteel bracelet.",
    price: 895000,
    category: "Fashion",
    image: cdn("mens-watches/rolex-submariner-watch"),
    stock: 2,
  },
  {
    name: "Prada Women Bag",
    description: "Structured Saffiano leather handbag with gold-tone hardware and detachable strap.",
    price: 185000,
    category: "Fashion",
    image: cdn("womens-bags/prada-women-bag"),
    stock: 4,
  },
  {
    name: "Classic Sun Glasses",
    description: "Timeless frame with UV400 polarised lenses for everyday wear.",
    price: 2499,
    category: "Fashion",
    image: cdn("sunglasses/classic-sun-glasses"),
    stock: 25,
  },
  {
    name: "Men Check Shirt",
    description: "Regular-fit cotton shirt with a classic check pattern and button-down collar.",
    price: 1799,
    category: "Fashion",
    image: cdn("mens-shirts/men-check-shirt"),
    stock: 30,
  },
  {
    name: "Puma Future Rider Trainers",
    description: "Retro-inspired runners with a lightweight sole and soft suede overlays.",
    price: 6999,
    category: "Fashion",
    image: cdn("mens-shoes/puma-future-rider-trainers"),
    stock: 0,
  },

  // Books
  {
    name: "Atomic Habits",
    description: "James Clear's proven framework for building good habits and breaking bad ones.",
    price: 499,
    category: "Books",
    image: cover("9780735211292"),
    stock: 50,
  },
  {
    name: "Clean Code",
    description: "Robert C. Martin's handbook of agile software craftsmanship.",
    price: 1299,
    category: "Books",
    image: cover("9780132350884"),
    stock: 12,
  },
  {
    name: "The Psychology of Money",
    description: "Morgan Housel's timeless lessons on wealth, greed and happiness.",
    price: 399,
    category: "Books",
    image: cover("9780857197689"),
    stock: 35,
  },
  {
    name: "Deep Work",
    description: "Cal Newport's rules for focused success in a distracted world.",
    price: 549,
    category: "Books",
    image: cover("9781455586691"),
    stock: 5,
  },

  // Home
  {
    name: "Annibale Colombo Sofa",
    description: "Hand-crafted Italian sofa upholstered in premium fabric with solid wood frame.",
    price: 149999,
    category: "Home",
    image: cdn("furniture/annibale-colombo-sofa"),
    stock: 3,
  },
  {
    name: "Knoll Saarinen Executive Chair",
    description: "Mid-century executive conference chair with a sculpted shell and plush seat.",
    price: 34999,
    category: "Home",
    image: cdn("furniture/knoll-saarinen-executive-conference-chair"),
    stock: 10,
  },
  {
    name: "Table Lamp",
    description: "Minimal table lamp with a fabric shade and warm ambient glow.",
    price: 2499,
    category: "Home",
    image: cdn("home-decoration/table-lamp"),
    stock: 18,
  },
  {
    name: "Plant Pot",
    description: "Ceramic indoor plant pot with drainage tray, perfect for desks and shelves.",
    price: 899,
    category: "Home",
    image: cdn("home-decoration/plant-pot"),
    stock: 45,
  },
  {
    name: "Family Tree Photo Frame",
    description: "Decorative family-tree frame that holds multiple photos of your loved ones.",
    price: 1299,
    category: "Home",
    image: cdn("home-decoration/family-tree-photo-frame"),
    stock: 20,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
