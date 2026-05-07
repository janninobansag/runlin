# 🍔 PokeShop — Kiosk Ordering System

A full-stack MERN kiosk ordering web app with a landing page, product menu (25 items), shopping cart, and checkout — backed by a MongoDB Atlas database and a Node.js/Express REST API.

---

## 📁 Project Structure

```
kiosk/
├── backend/           ← Express + Mongoose API
│   ├── models/
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js
│   │   └── orders.js
│   ├── seed/
│   │   └── seed.js    ← Populates 20 products into MongoDB
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/          ← React app
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── context/
    │   │   └── CartContext.js
    │   ├── components/
    │   │   ├── ProductCard.js / .css
    │   │   └── CartBar.js / .css
    │   ├── pages/
    │   │   ├── Landing.js / .css
    │   │   ├── Menu.js / .css
    │   │   └── Checkout.js / .css
    │   ├── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    └── package.json
```

---

## ✅ Prerequisites

Make sure you have these installed before starting:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18 or later | https://nodejs.org |
| npm | comes with Node | — |
| MongoDB Atlas account | free tier works | https://cloud.mongodb.com |

---

## 🍃 Step 1 — Set Up MongoDB Atlas

1. Go to **https://cloud.mongodb.com** and log in (or create a free account).
2. Click **"Build a Database"** → choose the **free M0 tier** → pick any cloud region → click **Create**.
3. Create a **database user**:
   - Username: e.g. `kioskuser`
   - Password: choose a strong password — save it!
4. Under **Network Access**, click **"Add IP Address"** → choose **"Allow access from anywhere"** (`0.0.0.0/0`) for development.
5. Go back to your cluster and click **"Connect"** → **"Drivers"** → copy the connection string. It looks like:
   ```
   mongodb+srv://kioskuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password.

---

## 🛠️ Step 2 — Set Up the Backend

### 2a. Navigate to the backend folder

```bash
cd kiosk/backend
```

### 2b. Install dependencies

```bash
npm install
```

### 2c. Create your `.env` file

```bash
cp .env.example .env
```

Open `.env` in any text editor and fill it in:

```env
MONGO_URI=mongodb+srv://kioskuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kioskDB?retryWrites=true&w=majority
PORT=5000
```

> ⚠️ Make sure to add `/kioskDB` before the `?` in the connection string — this is your database name.

### 2d. Seed the database with 20 products

```bash
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
🌱 Seeded 20 products successfully!
   • [Burgers] Classic Smash Burger — $8.99 (stock: 50)
   • [Burgers] BBQ Bacon Burger — $10.99 (stock: 40)
   ...
🔌 Disconnected from MongoDB
```

### 2e. Start the backend server

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

> **Keep this terminal open.** The backend must be running for the frontend to work.

---

## ⚛️ Step 3 — Set Up the Frontend

Open a **new terminal window/tab**, then:

### 3a. Navigate to the frontend folder

```bash
cd kiosk/frontend
```

### 3b. Install dependencies

```bash
npm install
```

> This may take 1–2 minutes.

### 3c. Create your `.env` file

```bash
cp .env.example .env
```

The default `.env` contents work out of the box if your backend is on port 5000:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3d. Start the React app

```bash
npm start
```

Your browser should automatically open to **http://localhost:3000** 🎉

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=Burgers` | Filter by category |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| PATCH | `/api/products/:id/stock` | Adjust stock |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Place a new order |
| PATCH | `/api/orders/:id/status` | Update order status |

---

## 🗂️ Product Categories

The 20 seeded products are organized into 5 categories:

| Category | Count |
|----------|-------|
| 🍔 Burgers | 5 |
| 🍗 Chicken | 4 |
| 🍟 Sides | 4 |
| 🥤 Drinks | 4 |
| 🍰 Desserts | 3 |

---

## 🛒 App Features

- **Landing Page** — Animated welcome screen with a Start Order button
- **Menu Page** — Browse all 20 products with category filters
- **Product Cards** — 500×500 food images, price, stock indicator, and Add to Cart button
- **Cart Bar** — Sticky bottom bar showing item count and total, appears when cart has items
- **Checkout Page** — Full cart management with quantity controls and remove buttons
- **Add More Items** — Expand a full product grid directly on the checkout page to add more
- **Order Summary** — Subtotal, 8% tax, and grand total
- **Place Order** — Submits order to MongoDB, deducts stock, shows confirmation with order number

---

## 🐛 Troubleshooting

**"Could not load products. Is the backend running?"**
→ Make sure the backend terminal is running (`npm run dev` in `/backend`).

**MongoDB connection error**
→ Double-check your `MONGO_URI` in `/backend/.env`. Make sure your IP is whitelisted in Atlas.

**Port 3000 or 5000 already in use**
→ Change `PORT=5001` in `/backend/.env` and update `REACT_APP_API_URL=http://localhost:5001/api` in `/frontend/.env`.

**Images not loading**
→ Images come from Unsplash CDN and require an internet connection. A fallback placeholder is shown if they fail.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas, Mongoose 8 |
| Styling | Pure CSS with CSS variables |
| Fonts | Bebas Neue, DM Sans, DM Mono (Google Fonts) |
