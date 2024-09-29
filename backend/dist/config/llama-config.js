import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();
export const config = new Groq({
    apiKey: process.env.AI_SECRET
});
//# sourceMappingURL=llama-config.js.map