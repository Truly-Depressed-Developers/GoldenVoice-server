import fs from 'fs';
import vosk from 'vosk';

export class SpeechToText {
    private MODEL_PATH;
    private files: string[];
    private model: vosk.Model | null;
    constructor(MODEL_PATH: string) {
        this.MODEL_PATH = MODEL_PATH;
        if (!fs.existsSync(this.MODEL_PATH)) {
            console.log("Please download the model from https://alphacephei.com/vosk/models and unpack as " + this.MODEL_PATH + " in the current folder.")
            process.exit()
        }
        this.files = [];
        this.model = null;
    }
    public async recognizeSpeech(file_name: string): Promise<void> {
        this.files = Array(10).fill(file_name);
        this.model = new vosk.Model(this.MODEL_PATH);
        const recognizer = new vosk.Recognizer({ model: this.model, sampleRate: 16000 });

        for (const file of this.files) {
            const data = fs.readFileSync(file);
            if (!recognizer.acceptWaveform(data)) {
                console.log("Error with file: " + file);
                break;
            }
        }

        console.log(recognizer.result());
    }
}