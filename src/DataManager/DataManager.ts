import fs from 'fs';
import { Request } from "express";
export class DataManager {
    public async getDataFromUrlAndEncodeToMp3(req: Request): Promise<Buffer | null> {
        let mp3File: Buffer | null = null;
        const body = req.body;
        if (!body) {
            mp3File = null;
            return mp3File;
        }
        const buffer = Buffer.from(body.toString(), 'binary');
        fs.writeFileSync('text.mp3', buffer);
        mp3File = fs.readFileSync('text.mp3');
        return mp3File;
    }
}