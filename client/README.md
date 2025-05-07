# PDF-RAG-AI: Client Application

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC)

The client application for PDF-RAG-AI, built with Next.js 15.3 and React 19, providing a simplistic user interface for PDF document upload and AI-powered question answering.

## 🔧 Tech Stack

### Core Technologies
- **Next.js 15.3.1**: React framework with App Router for server-side rendering and routing
- **React 19.0.0**: Latest version of the React library for UI components
- **TypeScript**: Type-safe JavaScript for better developer experience
- **TailwindCSS 4**: Utility-first CSS framework for styling

### UI Components
- **ShadCN UI**: Component library built on Radix primitives
- **Embla Carousel**: Carousel component used for authentication flow
- **Clerk Authentication**: User authentication and management
- **React Toastify**: Toast notifications for user feedback

## 📁 Project Structure

```
client/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with auth wrapper
│   └── page.tsx          # Home page with file upload and chat
│
├── components/           # React components
│   ├── Authenticating.tsx   # Authentication UI with Clerk
│   ├── chat.tsx          # Chat interface for querying PDFs
│   ├── file-upload.tsx   # PDF upload component
│   └── ui/               # UI component library
│
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions for UI
│
└── public/               # Static assets
```

## 🌐 Key Features

1. **Secure Authentication**: User login and registration via Clerk
2. **PDF Upload**: Upload interface with drag-and-drop functionality
3. **Interactive Chat**: Question-answering interface for document queries
4. **Toast Notifications**: Real-time feedback for user actions
5. **Dark Mode**: Enhanced visual experience

## 🚀 Getting Started

### Environment Setup

Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Development

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔄 API Integration

The client communicates with the backend server through two main endpoints:

1. **PDF Upload**: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`
   - POST request with FormData containing the PDF file

2. **Chat Query**: `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat?message=${message}`
   - GET request with the user's question as a URL parameter
   - Returns AI-generated answers based on the document content

## 🧠 Component Architecture

### Authentication Flow

Authentication is handled by Clerk, with a custom UI that provides:
- User registration
- Login functionality
- Session management

### Main Application

The main application consists of two primary components:
- **FileUpload**: Handles PDF document selection and upload
- **Chat**: Manages the conversation interface between user and AI

## 🔍 Implementation Details

- **App Router**: Next.js App Router for optimized page loading
- **CSS Variables**: Theme customization with CSS variables
- **Radix Primitives**: Accessible UI components
- **TypeScript**: Full type safety across the codebase

## 📦 Docker Integration

The client is containerized using Docker for consistent deployment:
```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
