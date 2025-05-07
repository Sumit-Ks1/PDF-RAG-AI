import { Worker } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import dotenv from "dotenv";

dotenv.config()

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    const data = JSON.parse(job.data);  
    const loader = new PDFLoader(data.path);
    const docs = await loader.load({});

    const embeddings = new MistralAIEmbeddings({
        model: "mistral-embed",
        apiKey: process.env.MISTRAL_API_KEY ?? "",
      });
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        checkCompatibility: false,
        collectionName: "PDF-RAG",
      }
    );
    await vectorStore.addDocuments(docs);
  },
  {
    concurrency: 100,
    connection: {
      host: process.env.VALKEY_HOST,
      port: process.env.VALKEY_PORT,
      // password: process.env.VALKEY_PASSWORD,
      checkCompatibility: false
    },
  }
);
