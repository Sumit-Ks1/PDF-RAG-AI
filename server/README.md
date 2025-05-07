# PDF-RAG-AI: Server Application

![Express](https://img.shields.io/badge/Express-5.1.0-green)
![LangChain](https://img.shields.io/badge/LangChain-0.3.24-orange)
![BullMQ](https://img.shields.io/badge/BullMQ-5.52.1-red)
![Qdrant](https://img.shields.io/badge/Qdrant-Vector%20DB-blue)

The server component of PDF-RAG-AI, providing the backend API and processing capabilities for PDF document analysis and AI-powered question answering using **RAG** (Retrieval-Augmented Generation) technology.

## 🔧 Tech Stack

### Core Technologies
- **Express.js 5**: Fast, unopinionated web framework for Node.js
- **LangChain**: Framework for building LLM applications with RAG capabilities
- **BullMQ**: Redis-based queue for background processing
- **PM2**: Process manager for Node.js applications
- **valkey**: high-performance, key-value datastore

### AI & Machine Learning
- **Mistral AI**: Embeddings and chat completions provider
- **Qdrant**: Vector database for storing and querying document embeddings
- **PDF-Parse**: Library for extracting text from PDF documents

### Data Management
- **Valkey**: Redis-compatible message broker for queue management
- **Multer**: Middleware for handling file uploads

## 📁 Project Structure

```
server/
├── index.js             # Main Express server entry point
├── worker.js            # Background processing worker for PDF processing
├── index-wrapper.cjs    # CommonJS wrapper for ESM module
├── worker-wrapper.cjs   # CommonJS wrapper for ESM module
├── pm2.config.cjs       # PM2 process manager configuration
├── uploads/             # Directory for uploaded PDF files
└── Dockerfile           # Docker configuration for containerization
```

## 🌐 API Endpoints

### `GET /`
- Simple health check endpoint
- Returns: `{ status: "Hello from server !!" }`

### `POST /api/upload`
- Uploads a PDF file for processing
- Request: `multipart/form-data` with a PDF file
- Response: `{ message: "File uploaded successfully", file: filename }`
- Adds job to the processing queue

### `GET /chat?message=<query>`
- Queries the AI about uploaded document content
- Request: Query parameter with user question
- Response: `{ message: "AI response", docs: [relevant_documents] }`
- Performs RAG to generate contextually relevant answers

## 🧠 Architecture

The server follows a job-queue architecture with three main components:

1. **API Server (index.js)**
   - Handles HTTP requests
   - Manages file uploads
   - Adds jobs to the queue
   - Processes chat queries

2. **Worker (worker.js)**
   - Processes PDF documents in the background
   - Extracts text with PDF-Parse
   - Creates embeddings with Mistral AI
   - Stores vectors in Qdrant

3. **Vector Store (Qdrant)**
   - Stores document embeddings for semantic search
   - Enables efficient retrieval for RAG

## 🔄 Data Flow

1. **PDF Upload Flow**:
   ```
   Client → POST /api/upload → BullMQ Queue → Worker → 
   PDF Processing → Vector Embeddings → Qdrant Storage
   ```

2. **Query Flow**:
   ```
   Client → GET /chat → Mistral Embeddings → Qdrant Vector Search → 
   Context Retrieval → Mistral AI Chat Completion → Response
   ```

## 🚀 Getting Started

### Environment Setup

Create a `.env` file with the following variables:
```
VALKEY_HOST=valkey
VALKEY_PORT=6379
CLIENT_URL=http://localhost:3000
MISTRAL_API_KEY=your_mistral_api_key
QDRANT_URL=http://localhost:6333
```

### Development

```bash
# Install dependencies
npm install

# Run with PM2 in development mode (watch for changes)
npm run dev

# Stop server with PM2 in development mode (watch for changes)
npx pm2 stop all

# Run in production mode
npm start
```

## 📦 Docker Integration

The server is containerized using Docker for consistent deployment:
```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npx", "pm2-runtime", "pm2.config.cjs"]
```

## ⚙️ PM2 Configuration

The server uses PM2 to manage multiple processes:
- **Express App**: Main API server
- **Worker**: Background processing worker

```javascript
// pm2.config.cjs
module.exports = {
  apps: [
    {
      name: "express-app",
      script: "index-wrapper.cjs",
      watch: false,
      env: {
        PORT: 8000
      }
    },
    {
      name: "worker",
      script: "worker-wrapper.cjs",
      watch: false
    }
  ]
};
```

## 🔒 Security Considerations

- Store API keys and sensitive information in environment variables
- Ensure `.env` files are in `.gitignore`
- Validate file uploads (size, type, etc.)
- Implement proper error handling and validation