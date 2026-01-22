import type { Request, Response } from "express";
import crypto from "crypto";
import { scrapeUrl } from "../utils/scrapeUrl.utils.ts";
import vectorStore from "../services/vector-store.ts";
import ai from "../services/model.ts";
import { chunkText } from "../utils/common.utils.ts";
import documentStore from "../services/document-store.ts";

const ingestController = async (req: Request, res: Response) => {
  const { type, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  if (!["text", "url"].includes(type)) {
    return res.status(400).json({ error: "Type must be 'text' or 'url'" });
  }

  try {
    let rawText = content;

    if (type === "url") {
      console.log(`Scraping URL: ${content}`);
      rawText = await scrapeUrl(content);

      if (!rawText) {
        return res.status(400).json({ error: "Failed to scrape URL" });
      }
    }

    const chunks = chunkText(rawText);

    const embedResponse = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: chunks
    });

    if (!embedResponse.embeddings) {
      throw new Error("Embedding generation failed");
    }

    documentStore.add({
      id: crypto.randomUUID(),
      type,
      value: content,
      createdAt: new Date()
    });

    embedResponse.embeddings.forEach((embeddingObj, index) => {
      vectorStore.addNewStoreEntry({
        id: crypto.randomUUID(),
        createdAt: new Date(),
        chunk: chunks[index],
        embedding: embeddingObj.values ?? [],
        source: {
          type,
          value: content
        }
      });
    });

    res.json({
      message: "Content ingested successfully",
      chunksStored: chunks.length
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default ingestController;
