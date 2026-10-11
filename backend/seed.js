require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/product.model");

const image = (seed) => `https://picsum.photos/seed/${seed}/600/450`;

const products = [
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches and aluminium frame.",
    price: 2999,
    category: "Electronics",
    image: image("keyboard"),
    stock: 10,
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Wireless over-ear headphones with active noise cancellation.",
    price: 4999,
    category: "Electronics",
    image: image("headphones"),
    stock: 25,
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic 2.4 GHz wireless mouse with silent clicks.",
    price: 1499,
    category: "Electronics",
    image: image("mouse"),
    stock: 40,
  },
  {
    name: "Smartphone Stand",
    description: "Adjustable aluminium phone stand for desks.",
    price: 599,
    category: "Electronics",
    image: image("phonestand"),
    stock: 3,
  },
  {
    name: "Classic Denim Jacket",
    description: "Regular fit denim jacket with button closure.",
    price: 2499,
    category: "Fashion",
    image: image("denim"),
    stock: 15,
  },
  {
    name: "Running Shoes",
    description: "Lightweight breathable running shoes with cushioned sole.",
    price: 3299,
    category: "Fashion",
    image: image("shoes"),
    stock: 8,
  },
  {
    name: "Leather Wallet",
    description: "Slim genuine leather wallet with RFID protection.",
    price: 899,
    category: "Fashion",
    image: image("wallet"),
    stock: 0,
  },
  {
    name: "Atomic Habits",
    description: "An easy and proven way to build good habits and break bad ones.",
    price: 499,
    category: "Books",
    image: image("atomichabits"),
    stock: 50,
  },
  {
    name: "Clean Code",
    description: "A handbook of agile software craftsmanship by Robert C. Martin.",
    price: 1299,
    category: "Books",
    image: image("cleancode"),
    stock: 12,
  },
  {
    name: "Ceramic Table Lamp",
    description: "Minimal ceramic table lamp with warm white LED bulb.",
    price: 1799,
    category: "Home",
    image: image("lamp"),
    stock: 6,
  },
  {
    name: "Cotton Bedsheet Set",
    description: "King size 300 thread count cotton bedsheet with 2 pillow covers.",
    price: 1199,
    category: "Home",
    image: image("bedsheet"),
    stock: 20,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "1 litre insulated bottle that keeps drinks cold for 24 hours.",
    price: 699,
    category: "Home",
    image: image("bottle"),
    stock: 30,
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
