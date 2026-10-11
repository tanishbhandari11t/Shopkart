# 🛒 ShopKart

A full-stack MERN e-commerce app built across Engineering Labs 01–05.

- **Auth** – register, login, logout, change password (JWT in an HttpOnly cookie, bcrypt hashes)
- **Products** – catalog with search, category filter and price sorting
- **Wishlist** – save products (MongoDB references + `populate()`), toggle, navbar count
- **Cart** – quantities, stock validation, global cart state with React Context, derived subtotal

## Tech Stack

| Layer    | Tech                                                   |
| -------- | ------------------------------------------------------ |
| Frontend | React, React Router, Axios, Tailwind CSS, Vite         |
| Backend  | Node.js, Express, Mongoose, bcrypt, jsonwebtoken, cookie-parser, cors |
| Database | MongoDB                                                |

## Getting Started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # then put your MongoDB connection string in MONGO_URI
npm run seed             # optional: adds 12 sample products
npm run dev              # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev              # http://localhost:5173
```

## API

| Method | Endpoint                      | Auth | Purpose                     |
| ------ | ----------------------------- | ---- | --------------------------- |
| POST   | `/customers/register`         | ❌   | Register a customer         |
| POST   | `/customers/login`            | ❌   | Log in (sets cookie)        |
| GET    | `/customers/me`               | ✅   | Current customer            |
| POST   | `/customers/logout`           | ✅   | Clear auth cookie           |
| PATCH  | `/customers/change-password`  | ✅   | Change password             |
| POST   | `/products`                   | ❌   | Create product              |
| GET    | `/products?search=&category=&sort=` | ❌ | List / search / filter / sort |
| GET    | `/products/:id`               | ❌   | Single product              |
| GET    | `/wishlist`                   | ✅   | Current user's wishlist     |
| POST   | `/wishlist/:productId`        | ✅   | Add to wishlist             |
| DELETE | `/wishlist/:productId`        | ✅   | Remove from wishlist        |
| PATCH  | `/wishlist/:productId/toggle` | ✅   | Toggle wishlist             |
| GET    | `/cart`                       | ✅   | Current user's cart         |
| POST   | `/cart/:productId`            | ✅   | Add / increment             |
| PATCH  | `/cart/:productId`            | ✅   | Update quantity             |
| DELETE | `/cart/:productId`            | ✅   | Remove item                 |
