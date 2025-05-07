# PDF-RAG-AI: AI-Powered Document Question Answering

![PDF-RAG-AI](https://img.shields.io/badge/PDF--RAG--AI-Document%20QA-blue)
![License](https://img.shields.io/badge/license-ISC-green)

A modern web application that enables intelligent document analysis and question answering for PDF documents using RAG (Retrieval-Augmented Generation) technology.

## 🌟 Features

- **PDF Upload & Processing**: Upload PDFs for AI analysis and indexing
- **Intelligent Question Answering**: Ask natural language questions about your documents
- **Context-Aware Responses**: AI generates answers based specifically on your document content
- **Secure Authentication**: User authentication with Clerk
- **Simple UI**: Clean, responsive design with dark mode support

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   Client    │────▶│   Server    │────▶│   Worker    │
│  (Next.js)  │     │  (Express)  │     │ (Background)│
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                  │                   │
       │                  │                   │
       │                  ▼                   │
       │           ┌─────────────┐            │
       │           │             │            │
       └──────────▶│   Valkey    │◀──────────┘
                   │  (Redis)    │
                   │             │
                   └─────────────┘
                         │
                         │
                         ▼
                   ┌─────────────┐
                   │             │
                   │   Qdrant    │
                   │(Vector DB)  │
                   │             │
                   └─────────────┘
```

- **Client**: Next.js React application for the user interface
- **Server**: Express.js backend API handling PDF uploads and queries
- **Worker**: Background processing for PDF ingestion and vector embedding
- **Valkey**: Redis-compatible message broker for job queue
- **Qdrant**: Vector database for storing document embeddings

## 🔧 Tech Stack

### Frontend (Client)
- **Next.js 15.3** with App Router
- **React 19**
- **TypeScript**
- **TailwindCSS 4**
- **ShadCN UI** components
- **Clerk Authentication**
- **React Toastify** for notifications
- **Embla Carousel** for UI components

### Backend (Server)
- **Express.js 5**
- **LangChain** for LLM operations
- **Mistral AI** for embeddings and chat completions
- **BullMQ** for background processing
- **Multer** for file uploads
- **PM2** for process management

### Databases & Services
- **Qdrant** vector database for semantic search
- **Valkey** Redis-compatible message broker
- **Docker** containerization

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Docker and Docker Compose

### Running Locally

1. Clone the repository
```bash
git clone https://github.com/Sumit-Ks1/PDF-RAG-AI.git
cd PDF-RAG-AI
```

2. Set up environment variables:
   - Create `server/.env` with Mistral API key and connection details
   - Create `client/.env.local` with backend URL and Clerk keys

3. Start with Docker Compose:
```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📁 Project Structure

```
├── client/              # Next.js frontend application
├── server/              # Express backend application
└── docker-compose.yml   # Docker Compose configuration
```

See individual README files in client/ and server/ directories for more details.

## 🧩 How It Works

1. **Authentication**: Users sign in through Clerk authentication
2. **PDF Upload**: Documents are uploaded to the server
3. **Processing**: Worker processes PDFs and creates vector embeddings
4. **Storage**: Embeddings stored in Qdrant vector database
5. **Query**: Users ask questions about their documents
6. **Retrieval**: System retrieves relevant document sections
7. **Response**: AI generates answers based on retrieved content

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Mistral AI](https://mistral.ai/) for the LLM model
- [LangChain](https://langchain.com/) for the RAG framework
- [Qdrant](https://qdrant.tech/) for vector search capabilities
- [Clerk](https://clerk.dev/) for authentication