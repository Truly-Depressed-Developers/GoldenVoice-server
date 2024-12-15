import bodyParser, { raw } from "body-parser";
import express from "express";
import session from "express-session";
import { DataManager } from "./DataManager/DataManager";
import { SpeechToText } from "./SpeechToText/SpeechToText";

import { migrate } from "./jobs/migrate";
import { config } from "./utils/config";
import fs from "fs";
import { givenPrompt } from "./utils/givenPrompt";
import insertDataToDB from "./libs/drizzle/insertDataToDB";
import { selectAllGivenPrompts, selectGivenInstructions } from "./libs/drizzle/selectFromDB";
if (config.MIGRATE) {
  migrate();
}

const app = express();
const port = process.env.PORT || 8000;
const MODEL_PATH = "./vosk-model-small-pl-0.22";
let i = 0;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'gfg-key',
  resave: false,
  saveUninitialized: true
}));

declare module 'express-session' {
  interface SessionData {
    // id: number,
    data: {
      pytanie: string | null;
      instrukcje: {
        [key: string]: {
          pytanie: string;
          odpowiedzi: {
            tak: string | number;
            nie: string | number;
          };
        };
      } | null;
    }

    iter: number,
  }
}

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

app.post("/mock", async (req, res) => {
  const text = req.body.request;
  // const matchedText = "Zniknęła mi ikona telefonu na pasku nawigacyjnym";
  const tab = [
    { "request": "Zniknął mi telefon", "response": "Czy widzisz go na  ekranie głównym?" },
    { "request": "Nie", "response": "Przesuń palcem w dół na ekranie głównym, aby otworzyć listę aplikacji. Czy widzisz ikonę telefonu na liście aplikacji?" },
    { "request": "Tak", "response": "Przytrzymaj palcem na ikonie telefonu Czy wyświetlił się dodatkowy dialog?" },
    { "request": "No tak", "response": "Czy widzisz napis 'Dodaj do ekr. st.'?" },
    { "request": "Mhm", "response": "Kliknij w ten napis. Czy widzisz ikonę telefonu na ekranie głównym?" },
    { "request": "Tak, dzięki", "response": "Czy problem został rozwiązany?" }
  ];

  if (i === tab.length) {
    i = 0;
  }
  res.send(tab[i++]);
});



app.post("/saveIntoDB", async (req, res) => {
  const problem = "Chciałbym zalogować się na pocztę";
  const response = await dataManager.getOpenAIPrompt(givenPrompt(problem));
  const decodedResponse = dataManager.decodeOpenAIResponse(response);
  await insertDataToDB(problem, decodedResponse);
  res.send(decodedResponse);
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
  console.log(text.text);
  res.send(text.text);
  // const finalText = "Zniknęła mi ikona telefonu na pasku na dole ekranu";
  // const matchedText = finalText;
  // const allPrompts = await selectAllGivenPrompts();
  // const matchedPrompt = allPrompts.find((element) => element.pytanie === matchedText);
  // if (!matchedPrompt?.pytanie || matchedPrompt?.pytanie === "") {
  //   console.log("not matched");
  //   const response = await dataManager.getOpenAIPrompt(givenPrompt(matchedText));
  //   const decodedResponse = dataManager.decodeOpenAIResponse(response);
  //   res.send({ pytanie: matchedText, instrukcje: decodedResponse });
  // } else {
  //   const instructions = await selectGivenInstructions(matchedPrompt.pytanie);
  //   res.send({ pytanie: matchedPrompt.pytanie, instrukcje: instructions });
  // }
});

app.post("/wavFileTest", async (req, res) => {
  if (req.session.iter === undefined) {
    req.session.iter = 1;
  }

  // const wavFile = await dataManager.getDataFromUrlAndEncodeToWav(req);
  // if (!wavFile) {
  //   res.status(404).send("No data in request");
  //   return;
  // }
  // const text = await speechToText.recognizeSpeech(wavFile);
  // console.log(text.text);
  const finalText = "Jak zadzwonić do wnuczka?";
  const matchedText = finalText;
  const allPrompts = await selectAllGivenPrompts();
  const matchedPrompt = allPrompts.find((element) => element.pytanie === matchedText);
  if (!matchedPrompt?.pytanie || matchedPrompt?.pytanie === "") {
    console.log("not matched");
    const response = await dataManager.getOpenAIPrompt(givenPrompt(matchedText));
    const decodedResponse = dataManager.decodeOpenAIResponse(response);
    res.send({ pytanie: matchedText, instrukcje: decodedResponse });
  } else {
    const response = await selectGivenInstructions(matchedPrompt.pytanie);
    if (response && response.length > 0) {
      const instructions = response[0].instrukcje;
      req.session.data = { pytanie: matchedPrompt.pytanie, instrukcje: instructions };
      res.send({ pytanie: matchedPrompt.pytanie, instrukcje: instructions });
    } else {
      res.status(404).send("No instructions found");
    }
    //   
  }

  // }
});



app.listen(port, () => console.info(`start serwera na porcie ${port}`))

