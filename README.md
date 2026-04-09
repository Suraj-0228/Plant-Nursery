# 🌿 GreenThumb Nursery

A full-stack e-commerce web application for an online plant nursery. Built with **React** on the frontend and **Node.js + Express + MongoDB** on the backend, GreenThumb Nursery allows users to browse, wishlist, and purchase plants — with a dedicated admin panel for managing inventory, users, and orders.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Seeding the Database](#seeding-the-database)
- [API Reference](#api-reference)
- [Pages & Routes](#pages--routes)
- [Admin Panel](#admin-panel)
- [Data Models](#data-models)
- [Environment Variables](#environment-variables)
- [Known Limitations](#known-limitations)

---

## ✨ Features

### User Features
- 🔐 **Authentication** — Register and log in with email & password (with show/hide password toggle)
- 🛍️ **Browse Plants** — View all plants or filter by category (Indoor, Outdoor, Herbs & Vegetables, Flowers)
- 🔍 **Plant Details** — View detailed info including care difficulty and description
- 🛒 **Shopping Cart** — Add/remove items, update quantities (cart persisted in `localStorage`)
- ❤️ **Wishlist** — Save favourite plants for later
- 💳 **Checkout & Payment** — Enter shipping/billing details and choose a payment method (Card, UPI, COD)
- 📦 **Order Tracking** — View past orders and their current status
- 👤 **Account Management** — View and edit personal profile details
- 🌱 **Plant Care Guide** — Dedicated guide page with care tips
- ℹ️ **About & Contact** — Brand story and contact form pages

### Admin Features
- 📊 **Dashboard** — Overview of total plants, users, and revenue
- 🌿 **Manage Plants** — Create, update, and delete plant listings
- 👥 **Manage Users** — View all users, update roles, and delete accounts
- 📋 **Manage Orders** — View all orders, update order status (Confirmed → Processing → Shipped → Delivered) and cancel orders

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router DOM | 7 | Client-side routing |
| Vite | 7 | Build tool & dev server |
| DaisyUI | 5 | Component library |
| Tailwind CSS | 4 (Browser CDN) | Utility-first styling |
| Chart.js + react-chartjs-2 | 4 / 5 | Charts in admin panel |
| Lucide React | 0.542 | Icon set |
| React Icons | 5 | Additional icons |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime |
| Express | 5 | Web framework |
| Mongoose | 8 | MongoDB ODM |
| CORS | 2 | Cross-origin resource sharing |

### Database
- **MongoDB** (local instance at `mongodb://localhost:27017/plant-nursery`)

---

## 📁 Project Structure

```
Plant-Nursery/
├── client/                      # React frontend (Vite)
│   ├── index.html               # App entry HTML (loads DaisyUI & Tailwind CDN)
│   ├── vite.config.js           # Vite config with proxy to backend (:5000)
│   ├── package.json
│   └── src/
│       ├── main.jsx             # React app entry point
│       ├── App.jsx              # Root component — router & route definitions
│       ├── context/
│       │   ├── AuthContext.jsx  # Global auth state (user, login, logout)
│       │   └── CartContext.jsx  # Global cart state (localStorage-backed)
│       ├── components/
│       │   ├── Navbar.jsx       # Top navigation bar
│       │   ├── Footer.jsx       # Site footer
│       │   ├── AdminSidenav.jsx # Admin sidebar navigation
│       │   ├── SalesChart.jsx   # Chart.js sales chart (admin)
│       │   ├── PrivateRoute.jsx # Redirects unauthenticated users
│       │   └── AdminRoute.jsx   # Redirects non-admin users
│       ├── layouts/
│       │   └── AdminLayout.jsx  # Admin panel shell with sidenav
│       └── pages/
│           ├── Home.jsx         # Landing / hero page
│           ├── Category.jsx     # Browse plants by category
│           ├── PlantDetail.jsx  # Single plant detail view
│           ├── Cart.jsx         # Shopping cart
│           ├── Checkout.jsx     # Checkout form (shipping + billing)
│           ├── Payment.jsx      # Payment method selection & order placement
│           ├── Orders.jsx       # User's order history
│           ├── Wishlist.jsx     # User's wishlist
│           ├── Account.jsx      # User profile page
│           ├── Guide.jsx        # Plant care guide
│           ├── About.jsx        # About us page
│           ├── Contact.jsx      # Contact form page
│           ├── Login.jsx        # Login page
│           ├── Register.jsx     # Registration page
│           └── admin/
│               ├── AdminDashboard.jsx  # Stats overview
│               ├── ManagePlants.jsx    # CRUD for plants
│               ├── ManageUsers.jsx     # User management
│               └── ManageOrders.jsx    # Order management
│
├── server/                      # Node.js / Express backend
│   ├── index.js                 # Server entry — Express app, DB connection, routes
│   ├── seeder.js                # CLI script to seed/destroy DB data
│   ├── package.json
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Plant.js             # Plant schema
│   │   ├── Order.js             # Order schema
│   │   └── Wishlist.js          # Wishlist schema
│   ├── controllers/
│   │   ├── authController.js    # Register, login, user CRUD
│   │   ├── plantController.js   # Plant CRUD + category filter
│   │   ├── orderController.js   # Create/get/cancel/update orders
│   │   ├── wishlistController.js # Get/add/remove wishlist items
│   │   └── userController.js    # User profile updates
│   └── routes/
│       ├── auth.js              # /api/auth
│       ├── plants.js            # /api/plants
│       ├── orders.js            # /api/orders
│       ├── wishlist.js          # /api/wishlist
│       └── users.js             # /api/users
│
└── data/                        # Seed data (JSON)
    ├── plants_data.json         # Plant records for seeding
    └── users.json               # User records for seeding
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port 27017)
- npm (bundled with Node.js)

### Installation

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd Plant-Nursery
```

**2. Install server dependencies**
```bash
cd server
npm install
```

**3. Install client dependencies**
```bash
cd ../client
npm install
```

### Running the App

You need to start **both** the backend and frontend servers simultaneously.

**Start the backend server** (from the `server/` directory):
```bash
npm start
```
> Server runs at `http://localhost:5000`

**Start the frontend dev server** (from the `client/` directory):
```bash
npm run dev
```
> App runs at `http://localhost:5173` (or next available port)

The Vite dev server is configured to proxy all `/api` requests to `http://localhost:5000`, so no CORS issues during development.

### Seeding the Database

To populate MongoDB with initial plant and user data:

```bash
# From the server/ directory

# Import seed data
npm run seed

# Destroy all seeded data
npm run seed:destroy
```

---

## 🔌 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login (returns user object) |
| `GET` | `/api/auth` | Get all users |
| `PUT` | `/api/auth/:id` | Update user by ID |
| `DELETE` | `/api/auth/:id` | Delete user by ID |

### Plants — `/api/plants`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/plants` | Get all plants |
| `GET` | `/api/plants/category/:category` | Get plants by category |
| `GET` | `/api/plants/:id` | Get single plant by ID |
| `POST` | `/api/plants` | Create a new plant |
| `PUT` | `/api/plants/:id` | Update plant by ID |
| `DELETE` | `/api/plants/:id` | Delete plant by ID |

### Orders — `/api/orders`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create a new order |
| `GET` | `/api/orders` | Get all orders (admin) |
| `GET` | `/api/orders/:userId` | Get orders by user ID |
| `PUT` | `/api/orders/:id/cancel` | Cancel an order |
| `PUT` | `/api/orders/:id/status` | Update order status (admin) |

### Wishlist — `/api/wishlist`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist/:userId` | Get user's wishlist |
| `POST` | `/api/wishlist` | Add item to wishlist |
| `DELETE` | `/api/wishlist` | Remove item from wishlist |

### Users — `/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/api/users/:id` | Update user profile (phone, address) |

---

## 🗺️ Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/category` | Browse by Category | Public |
| `/plant/:id` | Plant Detail | Authenticated |
| `/cart` | Shopping Cart | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/guide` | Plant Care Guide | Public |
| `/about` | About Us | Public |
| `/contact` | Contact | Public |
| `/account` | My Account / Profile | Authenticated |
| `/wishlist` | My Wishlist | Authenticated |
| `/checkout` | Checkout | Authenticated |
| `/payment` | Payment | Authenticated |
| `/orders` | My Orders | Authenticated |
| `/admin/dashboard` | Admin Dashboard | Admin only |
| `/admin/plants` | Manage Plants | Admin only |
| `/admin/users` | Manage Users | Admin only |
| `/admin/orders` | Manage Orders | Admin only |

---

## 🛡️ Admin Panel

The admin panel lives under `/admin` and uses a separate sidebar layout (`AdminLayout`). The navbar and footer are **hidden** on admin routes.

**Default admin credentials:**
```
Email:    admin@example.com
Password: adminPassword
```

> ⚠️ These are **hardcoded** static credentials in `authController.js`. Change them before any production deployment.

---

## 🗃️ Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| `fullname` | String | Required |
| `email` | String | Required, unique |
| `username` | String | Required, unique |
| `password` | String | Required (stored as plaintext — not production-safe) |
| `phone` | String | Optional |
| `address` | Object | `street, city, state, zip, country` |
| `isAdmin` | Boolean | Default: `false` |

### Plant
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `category` | String | `Indoor`, `Outdoor`, `Herbs & Vegetables`, `Flowers` |
| `price` | Number | Required |
| `image` | String | URL, required |
| `careDifficulty` | String | `Easy`, `Medium`, `Hard` |
| `description` | String | Optional |

### Order
| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId | Ref: `User` |
| `items` | Array | `[{ plant: ObjectId, quantity: Number }]` |
| `totalAmount` | Number | Required |
| `shippingAddress` | Object | Full address fields |
| `billingAddress` | Object | Full address fields |
| `paymentMethod` | String | `Card`, `UPI`, `COD` |
| `paymentStatus` | String | Default: `Pending` |
| `orderStatus` | String | `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled` |
| `orderDate` | Date | Default: `Date.now` |

### Wishlist
Stores a reference to a `User` and an array of `Plant` ObjectIds.

---

## ⚙️ Environment Variables

The server reads the following environment variables (falls back to defaults if not set):

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Port for the Express server |
| `MONGODB_URI` | `mongodb://localhost:27017/plant-nursery` | MongoDB connection string |

Create a `.env` file in the `server/` directory to override defaults:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/plant-nursery
```

---

## ⚠️ Known Limitations

This project is a **learning/portfolio project** and has several areas that would need hardening before a production deployment:

1. **Passwords are stored in plaintext** — Use `bcrypt` to hash passwords before saving.
2. **No JWT authentication** — Sessions rely on `localStorage` only. Implement JWT tokens for secure, stateless auth.
3. **No route protection on the backend** — API endpoints (create/delete plants, manage users, etc.) are publicly accessible. Add auth middleware.
4. **Hardcoded admin credentials** — The admin login is a static check in `authController.js`.
5. **No input validation** — No server-side validation library (e.g., `express-validator`) is used.
6. **Revenue is static** — The dashboard shows a hardcoded revenue figure (₹12,000).

---

## 📄 License

This project is open source and available for educational and personal use.