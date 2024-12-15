// import { pipeline } from "@huggingface/transformers";

// interface MatchResult {
//     action: "use_existing" | "create_custom";
//     prompt: string;
//     similarity: number;
//     message?: string;
// }

// class PromptManager {
//     private promptList: string[];

//     constructor(promptList: string[]) {
//         this.promptList = promptList;
//     }

//     // Calculate cosine similarity between two vectors
//     public cosineSimilarity(vectorA: number[], vectorB: number[]): number {
//         const dotProduct = vectorA.reduce((sum, ai, i) => sum + ai * vectorB[i], 0);
//         const magnitude = (vector: number[]) =>
//             Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
//         return dotProduct / (magnitude(vectorA) * magnitude(vectorB));
//     }

//     // Match a new prompt to the most similar existing prompt
//     public async matchToSimiliarPrompt(
//         newPrompt: string,
//         threshold: number = 0.8
//     ): Promise<MatchResult> {
//         // Load the Hugging Face pipeline for embeddings
//         const embeddings = await pipeline("feature-extraction", "sentence-transformers/all-MiniLM-L6-v2");

//         // Get the embedding for the new prompt
//         const targetEmbeddingTensor = await embeddings(newPrompt);
//         const targetEmbedding: number[] = targetEmbeddingTensor[0].arraySync();

//         // Get embeddings for all existing prompts
//         const promptEmbeddings = await Promise.all(
//             this.promptList.map(async (prompt) => {
//                 const result = await embeddings(prompt);
//                 return result[0];
//             })
//         );

//         // Calculate similarities
//         const similarities = promptEmbeddings.map((embedding, index) => ({
//             prompt: this.promptList[index],
//             similarity: this.cosineSimilarity(targetEmbedding, embedding),
//         }));

//         // Find the most similar prompt
//         similarities.sort((a, b) => b.similarity - a.similarity);
//         const bestMatch = similarities[0];

//         if (bestMatch.similarity >= threshold) {
//             return {
//                 action: "use_existing",
//                 prompt: bestMatch.prompt,
//                 similarity: bestMatch.similarity,
//             };
//         } else {
//             return {
//                 action: "create_custom",
//                 prompt: newPrompt,
//                 similarity: bestMatch.similarity,
//                 message: "No similar prompt found. Creating custom instruction.",
//             };
//         }
//     }
// }
