## 🚀 Puplic User Dashboard React 19 + TypeScript + Authentication (Register/Login) + Docker
This project is a React 19 + TypeScript web application with JWT authentication (Register/Login) using an Auth folder for cleaner structure. The app is containerized using Docker and Nginx for efficient deployment.


<img width="960" alt="Image" src="https://github.com/user-attachments/assets/4f46fbb2-e788-4fb0-8b09-1b14f6ae2b6c" />

<img width="960" alt="Image" src="https://github.com/user-attachments/assets/600ddb4b-0a88-4e19-884a-757b65e0e5ba" />

<img width="960" alt="Image" src="https://github.com/user-attachments/assets/6a2fe095-5b1a-408d-81db-568510a645ff" />

<img width="960" alt="Image" src="https://github.com/user-attachments/assets/3a19d798-97d2-4399-a3fa-d774827acfe1" />







## 📌 Features
✅ React 19 + TypeScript for a modern frontend
✅ User Authentication (Register/Login/Logout) with JWT stored in localStorage
✅ Protected Routes for Authenticated Users
✅ Auth logic inside src/Auth/ folder for better structure
✅ Dockerized for easy deployment
✅ Uses Nginx for fast static file serving
✅ Multi-stage build for a smaller Docker image size

## 📌 Getting Started
🔹 Prerequisites
Docker (Install from Docker)
Docker Compose

## 📌  Installation & Setup

🔹 Clone the Repository

git clone https://github.com/GHAZI-ALANZI/puplic-user-dashboard-with-auth-web-frontend.git
cd react-auth-docker

## 🔹 Install Dependencies
npm install
              
## 🔹 Start Development Server
npm start

## 📌 Authentication Setup
This app includes:

User Registration
User Login
JWT Token Storage
Protected Routes

## Authentication logic inside src/Auth/ folder

## 📍 Updated Project Structure


puplic-user-dashboard-with-auth-web-frontend/
│── src/                   
│   │── Auth/             # Authentication logic
│   │   │── auth.ts  # Handles API calls (Login/Register/Logout)
│   │  
│   │── components/        # Reusable UI components
│   │── pages/             # Login/Register pages
│   │── App.tsx            # Main app entry
│── public/                # Static assets
│── Dockerfile             # Docker setup for React
│── docker-compose.yml     # Docker Compose config
│── nginx.conf             # Nginx configuration
│── package.json           # Project dependencies
│── .dockerignore          # Files ignored in Docker build
│── README.md              # Project documentation



## 📌Running with Docker
Start the Container
docker-compose up --build -d

## Check Running Containers
docker ps

## Stop the Container

docker-compose down
            
## Rebuild the Image

docker-compose up --build -d
