import fs from 'fs';
import { Request } from "express";
import OpenAI from "openai";
import { config } from "../utils/config";
import db from '../libs/drizzle/DB';

require('dotenv').config();
export class DataManager {
    private openai;
    constructor() {
        if (config.OPENAI_API_KEY !== "") {
            this.openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });
        }
    }
    public async getDataFromUrlAndEncodeToWav(req: Request): Promise<string | null> {
        let wavFile: any = null;
        const rawData = req.body;
        console.log(rawData);
        const fileName = 'text.wav';
        fs.writeFileSync('text.wav', rawData);
        return fileName;
    }
    public async sendDataToUser(matchedText: string): Promise<{
        id: number,
        step: number,
        text: string
    }> {
        const textString = 'Czy widzisz ją na ekranie głównym?';
        const id: number = 1;
        const step: number = 1;
        const data = {
            id: id,
            step: step,
            text: textString
        };
        return data;
    }
    public async getOpenAIPrompt(content: string) {
        if (!this.openai) {
            throw new Error("OpenAI API key is missing");
        }
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { "role": "user", "content": content }
            ]
        });

        return completion.choices[0].message.content ?? "";
    }
    public decodeOpenAIResponse(response: string) {
        const decodedResponse = response;
        const regex = /\`\`javascript([\s\S]*?)\`\`\`/;
        const matches = response.match(regex);

        if (matches) {
            const javascriptContent = matches[1];
            // console.log(javascriptContent);
            // return javascriptContent;
            // console.log(matches[1])
            try {
                return JSON.parse(javascriptContent);
            } catch (error) {
                console.log(error);
                return null;
            }
        } else {
            return null;
        }
    }
}