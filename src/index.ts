import bodyParser, { raw } from "body-parser";
import express from "express";
import { DataManager } from "./DataManager/DataManager";
import { SpeechToText } from "./SpeechToText/SpeechToText";

import { migrate } from "./jobs/migrate";
import { config } from "./utils/config";
import fs from "fs";
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
// speechToText.recognizeSpeech("barka.wav");
// Example usage
// const filePath = 'barka.wav';
// speechToText.wavToByteArray(filePath).then(byteArray => {
//   if (byteArray) {
//     console.log(byteArray);
//     fs.writeFileSync('barka.mp3', byteArray);
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  raw({
    type: "audio/wave",
    limit: "50mb",
  })
);
app.post("/wavFile", async (req, res) => {
  const wavFile = await dataManager.getDataFromUrlAndEncodeToWav(req);
  if (!wavFile) {
    res.status(404).send("No data in request");
    return;
  }
  const text = await speechToText.recognizeSpeech(wavFile);
  res.send(text);
});

app.listen(port, () => console.info(`start serwera na porcie ${port}`))