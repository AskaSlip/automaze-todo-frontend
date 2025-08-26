# 📝 TODO Web Application

This is a **full-stack TODO application** built with **Next.js (frontend)** and **NestJS (backend)**.  
It implements the required functionality for the test task and includes some extra features.

---

## 🚀 Tech Stack
- **Frontend:** Next.js, TypeScript, TailwindCSS, shadcn/ui
- **Backend:** NestJS, TypeScript, PostgreSQL
- **Cache:** Redis (for fast access to categories)
- **Deployment:** Vercel (frontend) + Render (backend)
- **Containerization:** Docker + Docker Compose

---

## ✅ Features
- Display a list of all tasks
- Add and remove tasks
- Search tasks
- Mark tasks as done/undone
- Filter tasks by status (all / done / undone)
- Assign priority (1–10)
- Sort tasks by priority (ascending/descending)
- Categories (with Redis cache for performance)
- Due dates (bonus)

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/AskaSlip/automaze-todo
cd automaze-todo

2. Install dependencies

Frontend:

cd frontend
npm install


Backend:

cd ../backend
npm install

▶️ Running Locally
Start backend (NestJS)
cd backend
npm run start:dev


Backend will run at http://localhost:5000.

Start frontend (Next.js)
cd frontend
npm run dev


Frontend will run at http://localhost:3000.

🐳 Running with Docker
1. Build and run all services
docker-compose up --build

2. Services

Backend → http://localhost:5000

PostgreSQL (container)

Redis (container)

🌐 Deployment
Frontend (Next.js)

Deploy to Vercel

Set the environment variable:

NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

Backend (NestJS)

Deploy to Render as a Web Service

Use Dockerfile or standard Node.js build

Ensure process.env.PORT is used in main.ts:

const port = process.env.PORT || 5000;
await app.listen(port);


Set environment variables in Render:

DATABASE_URL=postgres://...
REDIS_URL=redis://...

🔑 Environment Variables
Backend (backend/.env)

.env will be added to email
