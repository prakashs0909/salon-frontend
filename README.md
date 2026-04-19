# Salon Booking System 💇‍♂️

## 🚀 Features

* User authentication (JWT)
* Book appointments
* Admin dashboard
* Responsive UI

## 🛠 Tech Stack

React, Node.js, Express, MongoDB, Tailwind CSS

## 📸 Screenshots

<p align="center">
  <img src="./Home.png" width="45%" />
  <img src="./Booking.png" width="45%" />
  <img src="./Appointments.png" width="45%" />
</p>

## 🔗 Live Demo

https://salon-frontend-two.vercel.app/

## ⚙️ Installation & Setup

### 1. Clone the repository

Clone both folder salon-frontend and salon-backend in same folder
```bash 
// frontend folder
git clone https://github.com/prakashs0909/salon-frontend.git
// backend folder
git clone https://github.com/prakashs0909/salon-backend.git
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in backend folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001 
SECRET_KEY=your_secret_key
EMAIL=your_email
EMAIL_PASSWORD=your_email_secret_password
FRONTEND_URL=http://localhost:3000 
```

---

### 4. Run the app

#### Start frontend and backend

```bash
cd frontend
npm run both
```

---

## 📂 Folder Structure

```
Salon-Booking/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── context/
│   └── App.js
```

---



## ⭐ Show your support

If you like this project, please ⭐ the repo!
