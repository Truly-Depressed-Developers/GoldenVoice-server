import fs from 'fs';
import { Request } from "express";
export class DataManager {
    public async getDataFromUrlAndEncodeToWav(req: Request): Promise<string | null> {
        let wavFile: any = null;
        const rawData = req.body;
        // if (!rawData || !Buffer.isBuffer(rawData)) {
        //     console.error('Invalid data received in the request body');
        //     return null;
        // }
        // const buffer = Buffer.from(body.toString(), 'binary');
        const fileName = 'text.wav';
        fs.writeFileSync('text.wav', rawData);
        return fileName;
        // if (wavFile) {
        //     fs.writeFileSync('text.wav', rawData);
        //     return "success";
        // } else {
        //     return "failure";
        // }
    }
}