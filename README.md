# 🏡 NestMate -- Frontend

NestMate is a web application designed to help people find compatible
flatmates and shared apartments. The platform allows users to browse
listings, create profiles, communicate with potential roommates, and
manage their own listings in a simple and intuitive interface.

This repository contains the **frontend application** built with
**React**, which communicates with the NestMate backend API.

------------------------------------------------------------------------

# 🚀 Live Demo

Frontend:\
https://nestmate-eta.vercel.app

Backend API:\
https://nestmate-server.vercel.app

------------------------------------------------------------------------

# 👩‍💻 Authors

Developed during the **Ironhack Web Development Bootcamp** by:

-   Mauricio Rojas Morales
-   Maria Pol Pujol

------------------------------------------------------------------------

# ✨ Features

-   🔐 User authentication (signup / login)
-   👤 User profile creation and editing
-   🏠 Create and manage apartment listings
-   🔍 Browse available listings
-   ❤️ Favorite listings
-   💬 Messaging system between users
-   📍 Filter listings by city
-   📷 Image uploads for listings and profiles
-   📱 Responsive design

------------------------------------------------------------------------

# 🛠 Tech Stack

Frontend: - React - React Router - Axios - CSS - Vite

Backend: - Node.js - Express - MongoDB - Mongoose

Deployment: - Vercel (Frontend) - Vercel / Cloud Hosting (Backend) -
Cloudinary (Image storage)

------------------------------------------------------------------------

# 📂 Project Structure

src/

components/ \# Reusable UI components\
pages/ \# Main pages of the app\
services/ \# API calls\
context/ \# Authentication context\
css/ \# Stylesheets\
App.jsx

------------------------------------------------------------------------

# ⚙️ Installation

Clone the repository:

git clone https://github.com/mariapujolpol/NestMate-frontend.git

Move into the project folder:

cd NestMate-frontend

Install dependencies:

npm install

Run the development server:

npm run dev

The app will start on:

http://localhost:5173

------------------------------------------------------------------------

# 🔗 API Connection

The frontend communicates with the NestMate backend API.

Make sure the backend server is running and update the base URL if
necessary:

src/services/api.service.js

Example:

const API_URL = "https://nestmate-server.vercel.app/api";

------------------------------------------------------------------------

# 🌱 Future Improvements

-   Real-time chat with WebSockets
-   Map integration for listings
-   Advanced filtering system
-   Email notifications
-   Mobile-first UI improvements

------------------------------------------------------------------------

# 📄 License

This project was developed for educational purposes during the Ironhack
Bootcamp.
