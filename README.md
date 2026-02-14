 🏟️ Bibek Futsal Booking System
----------------------------------

A MERN stack web application that allows users to view, book, and manage futsal time slots.

---

## 🚀 Features

- ✅ User authentication (Login/Register)
- 📅 Book available futsal time slots
- ❌ Prevent double-booking with real-time checks
- 🔄 Real-time updates via socket.io
- 👮 Admin access for managing all bookings

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, Socket.io-client  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.io  
- **Auth:** JWT (JSON Web Token)  

---

## 🚀 Run the Project Locally

## 📁 Clone the Repository

```bash or cmd```
- git clone https://github.com/bibek-b/futsal-booking-system.git
- cd futsal-booking-system

---

Project setup(Frontend + Backend)
--------------------------------

### ✅ Prerequisites
- Node.js
- MongoDB Atlas or a local MongoDB instance
- Nodemon (global or dev dependency)

---

# Frontend: (runs at "http://localhost:5173")
In terminal: 
  - cd client
  - npm install or yarn
  - npm run dev or yarn dev

# Backend: (runs at "http://localhost:5000")
In terminal:
   - cd server
   - npm install or yarn

# Create a .env file
  - MONGODB_URL=your_mongo_uri
  - JWT_SECRET_KEY=your_jwt_secret
  - FRONTEND_URL="http://localhost:5173"

# Now start the backend
  In terminal:
   - nodemon index.js
    
