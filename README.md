# 📝 AI Blog

> A modern full-stack blog platform built with **Next.js**, focused on scalable architecture, authentication, performance, and a production-oriented development approach.

\


### 🔗 [Live Demo](https://my-blog-blond-eight-92.vercel.app/)

Admin aacount info: {username: 'admin', password: 'A123456b'},
User account info: {username: 'user', password: 'A123456b'},

---

## ✨ Features

- 📰 Blog browsing with **search, filtering & sorting**
- 📖 Dynamic article pages with **related posts**
- 💬 Comments
- 🔐 **JWT Authentication** with HTTP-only cookies
- 🛡️ **Role-Based Authorization**
- 👨‍💼 Admin dashboard
- 🗂️ Blog & category management
- 👥 User management
- ⚡ **Server Actions**
- 🚀 **ISR & server-side caching**
- 🔎 Dynamic metadata & SEO-friendly pages
- 📱 Fully responsive UI
- ✅ Advanced forms with **React Hook Form + Zod**

---

## 🛠️ Tech Stack

| Category       | Technologies                     |
| -------------- | -------------------------------- |
| Frontend       | Next.js 16, React 19, JavaScript |
| Styling        | Tailwind CSS 4                   |
| Forms          | React Hook Form, Zod             |
| Authentication | HTTP-only Cookies                |
| Deployment     | Vercel                           |

---

## 🏗️ Architecture

The project follows a modular architecture with clear separation of concerns.

```text
app/
├── (site)/
├── admin/
└── ...

components/
├── admin/
├── site/
└── shared/

hooks/
services/
context/
utils/
```

### Key Concepts

- Server & Client Components
- Server Actions
- Custom Hooks
- Service Layer
- Reusable Components
- Public & Authenticated Data Fetching
- ISR & Caching
- Role-Based Authorization

---

## 🎯 Project Goals

This project was built to practice and demonstrate:

- Modern **Next.js App Router**
- Server Actions
- Authentication & Authorization
- ISR & performance optimization
- Advanced forms & validation
- SEO
- Clean and scalable frontend architecture
- Building a production-oriented front-end application

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ai_blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

---

## 📸 Screenshots

### Home

<img width="1100" height="1725" alt="Home" src="https://github.com/user-attachments/assets/10af5864-41df-42c6-93b8-7f5b0fd0ab71" />


### Article

<img width="1100" height="2345" alt="Article" src="https://github.com/user-attachments/assets/00b2f319-2680-4de2-9943-54e517e71e9c" />


### Admin Dashboard

<img width="1100" height="939" alt="Dashboard" src="https://github.com/user-attachments/assets/c253b79e-2a92-400a-89e3-9c90e72ed1d6" />


---

## 👨‍💻 About

This project was built as a **Frontend / Next.js portfolio project** to explore modern application architecture, authentication, server-side rendering strategies, performance optimization, and scalable component design.

---

### 📄 License

This project is created for educational and portfolio purposes.
