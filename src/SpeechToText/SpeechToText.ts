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
    public async recognizeSpeech(file_name: string): Promise<vosk.RecognitionResults> {
        return new Promise((resolve, reject) => {
            // this.files = Array(10).fill(file_name);
            this.model = new vosk.Model(this.MODEL_PATH);
            const recognizer = new vosk.Recognizer({ model: this.model, sampleRate: 44100 });

            // for (const file of this.files) {
            const data = fs.readFileSync(file_name);
            recognizer.acceptWaveform(data);
            resolve(recognizer.result() as vosk.RecognitionResults);
        });
        // this.files = Array(10).fill(file_name);
        // this.model = new vosk.Model(this.MODEL_PATH);
        // const recognizer = new vosk.Recognizer({ model: this.model, sampleRate: 16000 });

        // // for (const file of this.files) {
        // const data = fs.readFileSync(file_name);
        // recognizer.acceptWaveform(data);

        // console.log(recognizer.result());
    }
    public async wavToByteArray(filePath: string): Promise<Uint8Array | null> {
        try {
            // Read the WAV file as a Buffer
            const buffer = fs.readFileSync(filePath);

            // Convert the Buffer to a ByteArray
            const byteArray = Uint8Array.from(buffer);

            return byteArray;
        } catch (error) {
            console.error('Error reading the file:', error);
            return null;
        }
    }


}