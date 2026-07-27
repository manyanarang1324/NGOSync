# 🤝 NGOSync - NGO Operations & Social Impact Synchronization Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?logo=vite)

**NGOSync** is a full-stack platform designed to streamline non-profit operations, donor contributions, volunteer coordination, and campaign progress tracking on a unified interface.

---

## 🌟 Key Features

- **🔐 Multi-Role JWT Authentication**: Role-Based Access Control (RBAC) supporting **Donors**, **Volunteers**, and **NGO Administrators**.
- **📢 Campaign Management**: Category filtering (Education, Healthcare, Disaster Relief, Environment), live funding progress bars, and real-time raised target updates.
- **💳 Interactive Donation Portal**: Instant simulated checkout modal updating campaign raised amounts dynamically.
- **🙋 Volunteer Coordination Hub**: Search local drives, track spots remaining, and 1-click volunteer application workflow.
- **📊 Role-Specific Dashboards**:
  - **NGO Admin**: Campaign creation, event scheduling, and financial/volunteer metrics.
  - **Donor**: Contribution history, cause backing, and impact summary.
  - **Volunteer**: Enrolled event schedules and shift hours tracking.
- **🎨 Glassmorphism UI Design System**: Custom HSL color palettes, responsive cards, smooth CSS animations, and Inter/Outfit typography.

---

## 🏗️ Architecture & Tech Stack

```
NGOSync/
 ├── client/               # Frontend (React 18 + Vite + Lucide Icons + Vanilla CSS)
 │    ├── src/
 │    │    ├── components/  # Navbar, Footer, ProtectedRoute
 │    │    ├── context/     # AuthContext (JWT state)
 │    │    ├── pages/       # Home, Campaigns, Volunteers, Dashboard, Login, Register
 │    │    └── services/    # Axios API Client
 └── server/               # Backend (Node.js + Express + Mongoose + JWT + bcrypt)
      ├── config/          # MongoDB Mongoose Connection
      ├── controllers/     # Auth, Campaign, Donation, and Event Controllers
      ├── middleware/      # Protect & Role Authorization Middleware
      ├── models/          # User, Campaign, Donation, Event Schemas
      ├── routes/          # API Route Definitions
      └── seed.js          # Demo Data Seeder Script
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/manyanarang1324/NGOSync.git
cd NGOSync

# Install root, client, and server dependencies
npm run install:all
```

### 2. Configure Environment

Copy `server/.env.example` to `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ngosync
JWT_SECRET=ngosync_super_secret_jwt_key_2026
NODE_ENV=development
```

### 3. Seed Sample Demo Data (Optional but Recommended)

Pre-populate your database with sample NGOs, campaigns, donations, and volunteer drives:

```bash
cd server
node seed.js
```

### 4. Run Development Servers

```bash
# Run both Client (Port 5173) and Server (Port 5000) concurrently
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🌐 API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user with role | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT | ❌ |
| `GET` | `/api/auth/me` | Fetch logged-in user profile | 🔑 Token |
| `GET` | `/api/campaigns` | List all campaigns (Filter/Search) | ❌ |
| `POST` | `/api/campaigns` | Create new campaign | 🔑 NGO Admin |
| `POST` | `/api/donations` | Process contribution & update campaign | 🔑 Token |
| `GET` | `/api/donations/my-donations` | Fetch donor history | 🔑 Token |
| `GET` | `/api/events` | List volunteer opportunities | ❌ |
| `POST` | `/api/events` | Schedule volunteer event | 🔑 NGO Admin |
| `POST` | `/api/events/:id/apply` | Apply as event volunteer | 🔑 Token |

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
