# 🛒 TrendMart - Full Stack E-Commerce Platform

A modern full-stack e-commerce web application built using **Spring Boot**, **React.js**, and **MySQL**. TrendMart provides a complete online shopping experience with secure authentication, product management, shopping cart, wishlist, reviews, order processing, and an admin dashboard.

---

## 🚀 Project Overview

TrendMart is a mini Amazon/Flipkart-style shopping platform developed as a Java Full Stack internship project. It demonstrates industry-standard backend and frontend development using Spring Boot and React while following REST API architecture and MVC design principles.

The project includes two roles:

- 👤 Customer
- 👨‍💼 Admin

Customers can browse products, manage their cart and wishlist, place orders, and review products.

Administrators can manage products, categories, customers' orders, and monitor sales through an admin dashboard.

---

# ✨ Features

## 👤 Customer Features

- User Registration & Login (JWT Authentication)
- Browse Products
- Search Products
- Category Filter
- Product Details Page
- Product Reviews & Ratings
- Add to Cart
- Quantity Management
- Wishlist
- Checkout
- Place Orders
- Order History
- Order Status Tracking
- Responsive User Interface

---

## 👨‍💼 Admin Features

- Secure Admin Login
- Dashboard
- Product Management (CRUD)
- Category Management (CRUD)
- Product Image Upload
- Order Management
- Update Order Status
- Basic Sales Analytics

---

# 🛠️ Technology Stack

## Backend

- Java 17
- Spring Boot 3.x
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven
- Lombok
- Validation API

## Frontend

- React.js
- React Router
- Axios
- Bootstrap 5
- React Toastify

## Database

- MySQL
- MySQL Workbench

## API Testing

- Swagger UI
- Postman

## Version Control

- Git
- GitHub
- ---

# 📂 Project Structure

```text
trendmart
│
├── src/                     # Spring Boot Backend
│
├── trendmart-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone the Repository

```bash
git clone https://github.com/YasminKalluru/trendmart.git
```

## Backend Setup

```bash
cd trendmart
```

Configure your MySQL database in:

```
src/main/resources/application.properties
```

Run the backend:

```bash
mvn spring-boot:run
```

---

## Frontend Setup

```bash
cd trendmart-frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm run dev
```

---

# 📡 API Documentation

The project includes **Swagger UI** for testing REST APIs.

After running the backend, open:

```
http://localhost:8081/swagger-ui/index.html
```
---

# ⭐ Project Highlights

- 🔐 JWT-based Authentication & Authorization
- 🛍️ Complete E-Commerce Workflow
- 📂 Product & Category Management
- 🖼️ Product Image Upload
- ❤️ Wishlist Functionality
- 🛒 Shopping Cart Management
- ⭐ Product Reviews & Ratings
- 📦 Order Placement & Order Tracking
- 📊 Admin Dashboard
- 🔍 Product Search & Category Filter
- 📄 Pagination
- ✅ Input Validation
- 📚 Swagger API Documentation
- 📱 Responsive User Interface

---

# 🗄️ Database

The project uses **MySQL** as the relational database.

Main Tables:

- Users
- Categories
- Products
- Cart
- Wishlist
- Orders
- Order Items
- Reviews

---

# 🔮 Future Enhancements

- 💳 Razorpay Payment Gateway Integration
- ☁️ Cloudinary Image Storage
- 📧 Email Notifications
- 📈 Advanced Sales Analytics
- 🤖 AI-based Product Recommendations
- 🚚 Live Order Tracking
- 🌐 Deployment on Render & Vercel

---

# 👩‍💻 Author

**Yasmin Kalluru**

B.Tech Computer Science Engineering Student

The Apollo University

GitHub:
https://github.com/YasminKalluru

---

# 📜 License

This project is developed for educational and internship purposes.
