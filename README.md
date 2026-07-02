# 🌿 GreenThumb Nursery

A production-ready full-stack e-commerce web application for an online plant nursery. Built with **React** on the frontend and **Node.js + Express + MongoDB** on the backend, GreenThumb Nursery allows users to browse, wishlist, and purchase plants — with a dedicated admin panel for managing inventory, users, orders, and dynamic tax regulations.

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
- 🔐 **Secure Authentication** — Register and log in with email & password (secured with bcrypt hashing and password visibility toggle)
- 🛍️ **Browse Plants** — View all plants or filter by category (Indoor, Outdoor, Herbs & Vegetables, Flowers)
- 🔍 **Plant Details** — View detailed specifications including dynamic care difficulty, description tabs, and live stock warnings
- 🛒 **Shopping Cart** — Add/remove items, update quantities (cart persisted in `localStorage` with checkout limits checked against database inventory)
- ❤️ **Wishlist** — Save favourite plants for later (with automatic header badge count polling)
- 💳 **Checkout & Payment** — Enter shipping/billing details and choose a payment method (Card, UPI, COD) with dynamic invoice summaries
- 📦 **Order Tracking** — View past orders and their status (Pending, Confirmed, Shipped, Delivered, Cancelled)
- 👤 **Account Management** — View and edit profile information
- 🌱 **Plant Care Guide** — Dedicated guide page with care instructions
- ℹ️ **Legal & Support** — Complete support portal including animated FAQ accordions, Privacy Policy, and Terms of Service agreements

### Admin Features
- 📊 **Dashboard** — Overview of total plants, users, and realized revenue (calculated dynamically from delivered orders)
- 🌿 **Manage Plants** — Create, update, delete, and restock plant listings with inventory quantity tracking
- 📋 **Manage Orders** — View orders, update statuses (Confirmed → Processing → Shipped → Delivered), with user cancellation blocks
- 👥 **Manage Users** — View users, update roles, and delete profiles
- ⚙️ **GST Settings** — Configure and save the global Goods and Services Tax (GST) percentage applied dynamically at checkout

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework with route-level lazy loading |
| React Router DOM | 7 | Client-side routing & viewport scroll resets |
| Vite | 7 | Build tool & dev server |
| DaisyUI | 5 | Component library |
| Tailwind CSS | 4 | Styling framework |
| Chart.js + react-chartjs-2 | 4 / 5 | Analytics charts in admin dashboard |
| Lucide React | 0.542 | Icon set |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime environment |
| Express | 5 | Web framework |
| Mongoose | 8 | MongoDB ODM |
| Bcryptjs | 3 | Password hashing security |
| CORS | 2 | Cross-origin resource sharing |

### Database
- **MongoDB** (local instance at `mongodb://localhost:27017/plant-nursery`)

---

## 📁 Project Structure

```
Plant-Nursery/
├── client/                      # React frontend (Vite)
│   ├── index.html               # App entry HTML
│   ├── vite.config.js           # Vite config with proxy to backend (:5000)
│   ├── package.json
│   └── src/
│       ├── main.jsx             # React app entry point
│       ├── App.jsx              # Root component & lazy-loaded routes
│       ├── index.css            # Custom CSS overrides & scrollbar hides
│       ├── context/
│       │   ├── AuthContext.jsx  # Global auth state
│       │   ├── CartContext.jsx  # Global cart state
│       │   └── ModalContext.jsx # Global custom popup modal triggers
│       ├── components/
│       │   ├── Navbar.jsx       # Navigation bar with opaque dropdowns
│       │   ├── Footer.jsx       # Site footer with legal links
│       │   ├── AdminSidenav.jsx # Admin sidebar navigation with confirm logout
│       │   ├── SalesChart.jsx   # Chart.js analytics chart
│       │   ├── ScrollToTop.jsx  # Resets window scroll position on navigation
│       │   ├── PrivateRoute.jsx # Redirects unauthenticated users
│       │   └── AdminRoute.jsx   # Redirects non-admin users
│       └── pages/
│           ├── Home.jsx         # Hero page with featured plant stock checks
│           ├── Category.jsx     # Browse category with horizontal filters
│           ├── PlantDetail.jsx  # Single plant detail view with stock status
│           ├── Cart.jsx         # Shopping cart
│           ├── Checkout.jsx     # Checkout form with dynamic GST
│           ├── Payment.jsx      # Payment selection & order placement
│           ├── Orders.jsx       # User's order history
│           ├── Wishlist.jsx     # User's wishlist
│           ├── Account.jsx      # User profile page
│           ├── Guide.jsx        # Plant care guide
│           ├── About.jsx        # About us page
│           ├── Contact.jsx      # Contact form page
│           ├── Login.jsx        # Login page
│           ├── Register.jsx     # Registration page
│           ├── PrivacyPolicy.jsx # Expanded privacy policy
│           ├── TermsConditions.jsx # Expanded terms of service
│           ├── FAQ.jsx          # Animated support FAQ accordion
│           └── admin/
│               ├── AdminDashboard.jsx  # Analytics overview with alert bell
│               ├── ManagePlants.jsx    # Internal-scroll plant CRUD modal
│               ├── ManageUsers.jsx     # User role management
│               ├── ManageOrders.jsx    # Order tracking & invoice details
│               └── ManageTax.jsx       # GST percentage configuration
│
│── server/                      # Node.js / Express backend
│   ├── index.js                 # Server entry — express, DB connection, routes
│   ├── seeder.js                # CLI script to seed plants database
│   ├── package.json
│   ├── models/
│   │   ├── User.js              # User schema with hashed passwords
│   │   ├── Plant.js             # Plant schema with stock attribute
│   │   ├── Order.js             # Order schema
│   │   ├── Tax.js               # GST configuration schema
│   │   └── Wishlist.js          # Wishlist schema
│   ├── controllers/
│   │   ├── authController.js    # Bcrypt authentication
│   │   ├── plantController.js   # Plant CRUD with stock parameters
│   │   ├── orderController.js   # Two-pass stock check order creation
│   │   ├── wishlistController.js # Wishlist updates
│   │   ├── userController.js    # User updates
│   │   └── taxController.js     # GST rate controllers
│   └── routes/
│       ├── auth.js              # /api/auth
│       ├── plants.js            # /api/plants
│       ├── orders.js            # /api/orders
│       ├── wishlist.js          # /api/wishlist
│       ├── users.js             # /api/users
│       └── tax.js               # /api/tax
│
└── data/                        # Seed data (JSON)
    ├── plants.json              # Seed data containing stock counts
    └── users.json               # Seed users containing admin role
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

Vite is configured to proxy all `/api` requests to `http://localhost:5000`, bypassing CORS.

### Seeding the Database

To populate MongoDB with initial plant and user data (now with configured starting stock):

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
| `POST` | `/api/auth/register` | Register a new user (with Bcrypt hashing) |
| `POST` | `/api/auth/login` | Login (password comparison check) |
| `GET` | `/api/auth` | Get all users |
| `PUT` | `/api/auth/:id` | Update user by ID |
| `DELETE` | `/api/auth/:id` | Delete user by ID |

### Plants — `/api/plants`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/plants` | Get all plants |
| `GET` | `/api/plants/category/:category` | Get plants by category |
| `GET` | `/api/plants/:id` | Get single plant by ID |
| `POST` | `/api/plants` | Create a new plant with stock parameters |
| `PUT` | `/api/plants/:id` | Update plant properties (including stock adjustments) |
| `DELETE` | `/api/plants/:id` | Delete plant by ID |

### Orders — `/api/orders`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create order (with stock validations and deductions) |
| `GET` | `/api/orders` | Get all orders (admin console) |
| `GET` | `/api/orders/:userId` | Get orders by user ID |
| `PUT` | `/api/orders/:id/cancel` | Cancel order (restores plant stock levels) |
| `PUT` | `/api/orders/:id/status` | Update order status (locks on Delivered/Cancelled) |

### GST Settings — `/api/tax`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tax` | Fetch current active GST tax rate |
| `PUT` | `/api/tax` | Update global GST tax rate settings |

---

## 🛡️ Admin Panel

The admin panel lives under `/admin` and uses a separate sidebar layout (`AdminLayout`). The navbar and footer are hidden on admin routes.

**Default admin credentials:**
```
Email:    admin@example.com
Password: adminPassword
```

---

## 🗃️ Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| `fullname` | String | Required |
| `email` | String | Required, unique |
| `username` | String | Required, unique |
| `password` | String | Required (hased securely using bcryptjs) |
| `phone` | String | Optional |
| `address` | Object | `street, city, state, zip, country` |
| `isAdmin` | Boolean | Default: `false` |

### Plant
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `category` | String | `Indoor`, `Outdoor`, `Herbs & Vegetables`, `Flowers` |
| `price` | Number | Required |
| `stock` | Number | Inventory count (default: 50) |
| `image` | String | URL, required |
| `careDifficulty` | String | `Easy`, `Medium`, `Hard` |
| `description` | String | Optional |

### GST Tax Settings
| Field | Type | Notes |
|-------|------|-------|
| `rate` | Number | Percentage value (default: 5) |

---

## ⚙️ Environment Variables

The server reads the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Port for the Express server |
| `MONGODB_URI` | `mongodb://localhost:27017/plant-nursery` | MongoDB connection string |

---

## ⚠️ Known Limitations & Disclaimers

1. **No JWT authentication** — Sessions rely on `localStorage` only. For production, transition to secure HTTP-only cookies and JWT tokens.
2. **Hardcoded admin credentials** — The admin account bypasses database storage in `authController.js`. It should be stored as a hashed seed record in the database instead.
3. **No input validation library** — Validation is checked manually in controller bodies. Use a library like `express-validator` or `zod` for robustness.