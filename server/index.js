import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Mistral } from '@mistralai/mistralai';
import dotenv from "dotenv";

dotenv.config()

const mistral = new Mistral({
    apiKey: `${process.env.MISTRAL_API_KEY}` ?? "",
  });

const queue = new Queue("file-upload-queue", {
  connection: {
    host: `${process.env.VALKEY_HOST}`,
    port: `${process.env.VALKEY_PORT}`,

  },
});

const app = express();
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.json({ status: "Hello from server !!" });
});

app.post("/api/upload", upload.single("pdf"), async (req, res) => {
  await queue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    })
  );
  return res.json({
    message: "File uploaded successfully",
    file: req.file.filename,
  });
});

app.get("/chat", async (req, res) => {
  const userQuerry = req.query.message;

  const embeddings = new MistralAIEmbeddings({
    model: "mistral-embed",
    apiKey: `${process.env.MISTRAL_API_KEY}` ?? "",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: `${process.env.QDRANT_URL}`,
      checkCompatibility: false,
      collectionName: "PDF-RAG",
    }
  );
  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(`${userQuerry}`);

  const SYSTEM_PROPMPT = `You are a helpful assistant. You will be provided with a question and some context. Answer the question based on the context.
  Context:
  ${JSON.stringify(result)}`;

  const chatResult = await mistral.chat.complete({
    messages: [
      {
        role: "system",
        content: SYSTEM_PROPMPT,
      },
      {
        role: "user",
        content: userQuerry,
      }
    ],
    model: "mistral-small-latest",
  });

  return res.json({
    message: chatResult.choices[0].message.content,
    docs: result
  });
});
app.listen(8000, () => {
  console.log(`Server is running on port ${8000}`);
});
