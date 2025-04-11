import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = import.meta.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(join(__dirname, "dist")));

// Initialize the Gemini AI model
const llm = new ChatGoogleGenerativeAI({
  apiKey: import.meta.GOOGLE_API_KEY,
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
  temperature: 0.3,
});

// Create the prompt template
const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful environment researcher assistant, your job is to summarize articles and provide information about the environmental impact of AI.
  Use the information from the article and provide accurate and relevant information.
  Be concise and clear in your response. Summary length should be at least 400 words.`,
  ],
  [
    "human",
    `Please summarize the article and provide information about the environmental impact of AI.
  
    Article: {article}`,
  ],
]);

// API endpoint for summarization
app.post("/api/summarize", async (req, res) => {
  try {
    const { article } = req.body;

    if (!article) {
      return res.status(400).json({ error: "Article text is required" });
    }

    const messages = await promptTemplate.invoke({
      article: article,
    });

    const response = await llm.invoke(messages);

    res.json({ summary: response.content });
  } catch (error) {
    console.error("Error summarizing article:", error);
    res.status(500).json({ error: "Failed to summarize article" });
  }
});

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
