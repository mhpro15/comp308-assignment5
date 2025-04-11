// article 1: https://www.greenmatch.co.uk/blog/technology-environmental-impact
// article 2: https://blog.google/outreach-initiatives/sustainability/report-ai-sustainability-google-cop28/
// JavaScript code to summarize an article using the Gemini API

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import fs from "fs"; // Requires fs module for file system operations
import "dotenv/config";

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
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

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful environment researcher assistantm your job is to summarize articles and provide information about the environmental impact of AI.
  Use the information from the article and provide accurate and relevant information.
  Be concise and clear in your response. Summary length should be at least 400 words.`,
  ],
  [
    "human",
    `Please summarize the article and provide information about the environmental impact of AI.
  
    Article: {article}`,
  ],
]);

// load the article from txt file
const article1 = fs.readFileSync("article1.txt", "utf8");
const article2 = fs.readFileSync("article2.txt", "utf8");
async function invokeAI(context) {
  try {
    const messages = await promptTemplate.invoke({
      article: context,
    });

    const response = await llm.invoke(messages);

    return { answer: response.content };
  } catch (error) {
    console.error("Error invoking AI:", error);
    return {
      answer: "I'm sorry, I encountered an error processing your request.",
    };
  }
}

// export result to new txt file
async function summarizeAndExport(articleContent, filename) {
  try {
    const summary = await invokeAI(articleContent);
    fs.writeFileSync(filename, summary.answer);
    console.log(`Summary saved to ${filename}`);
  } catch (error) {
    console.error(`Error summarizing and exporting to ${filename}:`, error);
  }
}

// Summarize and export article 1
summarizeAndExport(article1, "summary1.txt");

// Summarize and export article 2
summarizeAndExport(article2, "summary2.txt");
