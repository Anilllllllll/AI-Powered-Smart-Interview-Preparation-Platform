# AI-Powered Smart Interview Preparation Platform

## Abstract
This project is an AI-driven web application designed to help students prepare for technical interviews. It provides a platform where users can select domains (DSA, MERN, Java, etc.), practice with AI-generated questions, and receive real-time evaluations on their answers. The system leverages OpenAI/LLM models to analyze responses and offer constructive feedback, highlighting strengths and areas for improvement.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API

## Features
- **User Authentication**: Secure Login & Registration.
- **Domain Selection**: Choose from various interview topics.
- **AI-Powered Questions**: Dynamic question generation.
- **Smart Evaluation**: Instant feedback on answers with scoring.
- **Performance Analytics**: Dashboard to track progress.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URL)
- OpenAI API Key

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server/` with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai_interview_prep
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```

## API Documentation

### Auth
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user

### Interview
- `GET /api/interview/domains`: Get all interview domains
- `POST /api/interview/start`: Start an interview session
- `POST /api/interview/answer`: Submit answer for AI evaluation
- `POST /api/interview/save`: Save attempt history

## Folder Structure
```
/
├── client/     # React Frontend
├── server/     # Express Backend
└── README.md   # Project Documentation
```
