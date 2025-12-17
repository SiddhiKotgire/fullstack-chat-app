# Fullstack Chat Application (MERN + Socket.io)

A real-time chat application built using the **MERN stack** with **Socket.io** for instant communication. This project was developed to understand how modern web applications handle authentication, real-time data flow, and scalable frontend–backend architecture.

This repository reflects a hands-on attempt to build something close to how chat systems work in real-world products, focusing on clarity, structure, and practical implementation rather than just features.

---

## Overview

Most basic chat applications rely only on REST APIs, which leads to delays and inefficient polling. This project addresses that limitation by using **WebSockets (Socket.io)** to enable real-time messaging while still maintaining a clean REST-based backend for authentication and data management.

---

## Features

* User authentication using JWT
* One-to-one real-time messaging with Socket.io
* Messages stored in MongoDB for persistence
* Global state management using Zustand
* Protected routes on both frontend and backend
* Clean and modular project structure

---

## Tech Stack

**Frontend**

* React (Vite)
* JavaScript (ES6+)
* Zustand
* Axios
* CSS / Tailwind CSS

**Backend**

* Node.js
* Express.js
* MongoDB with Mongoose
* Socket.io
* JWT for authentication
* Bcrypt for password hashing

---

## Architecture

```
Client (React)
   │
   │  REST APIs (Axios)
   ▼
Server (Node + Express)
   │
   │  JWT Authentication
   ▼
Database (MongoDB)

Real-time messaging:
Client ⇄ Socket.io ⇄ Server
```

---

## How the Application Works

1. A user signs up or logs in
2. The server issues a JWT after successful authentication
3. The client stores the token and accesses protected routes
4. A Socket.io connection is established after login
5. Messages are exchanged in real time
6. Messages are also saved in MongoDB for chat history

---

## Socket Events

| Event             | Purpose                           |
| ----------------- | --------------------------------- |
| `connection`      | Triggered when a user connects    |
| `join_chat`       | Adds user to a chat room          |
| `send_message`    | Sends a message to the server     |
| `receive_message` | Delivers message in real time     |
| `disconnect`      | Triggered on socket disconnection |

---

## Security Considerations

* Passwords are hashed using bcrypt
* JWT is used for authentication and route protection
* Sensitive values are stored in environment variables

---

## Environment Variables

**Backend (.env)**

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

**Frontend (.env)**

```
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Project Locally

**Clone the repository**

```bash
git clone https://github.com/SiddhiKotgire/fullstack-chat-app
cd fullstack-chat-app
```

**Start backend**

```bash
cd backend
npm install
npm run dev
```

**Start frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## Possible Improvements

* Group chat support
* Typing indicators
* Read receipts
* Refresh token based authentication
* Rate limiting and additional security layers

---

## What I Learned from This Project

* Implementing JWT-based authentication in a fullstack app
* Managing real-time communication with Socket.io
* Structuring a scalable backend using MVC principles
* Handling global state effectively using Zustand

---

## Author

**Siddhi Kotgire**
B.Tech Computer Engineering Student
Interested in full-stack development using the MERN stack

---

If you find this project useful or have suggestions, feel free to explore the code or raise an issue.
