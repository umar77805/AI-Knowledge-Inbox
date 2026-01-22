import type { Request, Response } from "express";
import ai from "../services/model.ts";
import { cosineSimilarity } from "../utils/common.utils.ts";
import vectorStore from "../services/vector-store.ts";

const queryController = async (req: Request, res: Response) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        // 1️⃣ Embed the query (NO chunking)
        const embedResult = await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: query
        });

        const queryEmbedding = embedResult.embeddings?.[0]?.values;

        if (!queryEmbedding) {
            throw new Error("Failed to generate query embedding");
        }

        // 2️⃣ Vector similarity search
        const matches = vectorStore.getAllStoreEntries().map(entry => ({
            chunk: entry.chunk,
            source: entry.source,
            score: cosineSimilarity(queryEmbedding, entry.embedding)
        }));

        const topMatches = matches
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        // 3️⃣ Build context
        const context = topMatches
            .map((m, i) => `Source ${i + 1}:\n${m.chunk}`)
            .join("\n\n");

        const prompt = `
You are a helpful assistant.
Answer ONLY using the sources below.
If the answer is not present, say you don't know.

${context}

Question:
${query}
`;

        // 4️⃣ Generate answer
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });

        res.json({
            answer: response.text,
            sources: topMatches.map((m, i) => ({
                ref: i + 1,
                snippet: m.chunk.slice(0, 200),
                source: m.source,
                score: m.score
            }))
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default queryController;
