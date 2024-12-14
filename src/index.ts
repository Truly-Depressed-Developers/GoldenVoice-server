import bodyParser from "body-parser";
import express from "express";
import { DataManager } from "./DataManager/DataManager";
import { SpeechToText } from "./SpeechToText/SpeechToText";

import { migrate } from "./jobs/migrate";
import { config } from "./utils/config";
if (config.MIGRATE) {
  migrate();
}

const app = express();
const port = process.env.PORT || 8000;
const MODEL_PATH = "./vosk-model-small-pl-0.22";

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataManager = new DataManager();
const speechToText = new SpeechToText(MODEL_PATH);
speechToText.recognizeSpeech("barka.wav");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/mp3File", async (req, res) => {
  const mp3File = await dataManager.getDataFromUrlAndEncodeToMp3(req);
  if (!mp3File) {
    res.status(404).send("No data in request");
    return;
  }
});

app.listen(port, () => console.info(`start serwera na porcie ${port}`))