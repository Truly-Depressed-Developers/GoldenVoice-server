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

app.post("/mock", async (req, res) => {
  const text = req.body.request;
  // const matchedText = "Zniknęła mi ikona telefonu na pasku nawigacyjnym";
  const tab = [
    { "request": "Zniknęła mi ikona telefonu na pasku nawigacyjnym.", "response": "Czy widzisz ją na ekranie głównym?" },
    { "request": "Nie", "response": "Przesuń palcem w dół na ekranie głównym, aby otworzyć listę aplikacji. Czy widzisz ikonę telefonu na liście aplikacji?" },
    { "request": "Tak", "response": "Przytrzymaj palcem na ikonie telefonu Czy wyświetlił się dodatkowy dialog?" },
    { "request": "No tak", "response": "Czy widzisz napis Add to Home?" },
    { "request": "Mhm", "response": "Kliknij w ten napis. Czy widzisz ikonę telefonu na ekranie głównym?" },
    { "request": "Widzę", "response": "Przytrzymaj palcem na ikonie telefonu i przeciągnij ikonę na pasek nawigacyjny. Udało się?" },
    { "request": "Tak, dzięki", "response": "Czy problem został rozwiązany?" }
  ];
  const matched = tab.find(element => element.request === text);
  if (!matched) {
    res.status(404).send("No data in request");
    return;
  }
  res.send({ response: matched.response });
});

app.use(
  raw({
    type: "audio/wave",
    limit: "50mb",
  })
);
app.post("/wavFile", async (req, res) => {
  // const wavFile = await dataManager.getDataFromUrlAndEncodeToWav(req);
  // if (!wavFile) {
  //   res.status(404).send("No data in request");
  //   return;
  // }
  // const text = await speechToText.recognizeSpeech(wavFile);
  const matchedText = "Zniknęła mi ikona telefonu na pasku na dole ekranu";
  // console.log(text);
  const problem = "Chciałbym zalogować się do poczty e-mail";
  const prompt = `Stwórz drzewo instrukcji w formie obiektu JavaScript, które przedstawia proces rozwiązywania problemu ${problem}. Struktura drzewa powinna wyglądać następująco: Każdy krok w procesie powinien być numerowany (np. 1, 2, 3, …). Każdy krok zawiera pytanie, które jest zadawane użytkownikowi. Każdy krok ma odpowiedzi: 'tak' (prowadzi do kolejnego kroku lub kończy proces), 'nie' (prowadzi do kolejnego pytania lub kończy proces), {{}} (w takich nawiasach umieszczaj funkcje - tylko zakończ dialog i przejdź do kroku). Po zakończeniu każdego kroku należy określić, czy proces ma się zakończyć (np. „Zakończ dialog”) lub przejść do kolejnego kroku. Przykład struktury drzewa w formacie JavaScript: { 1: { pytanie: 'Treść pytania', odpowiedzi: { tak: 2, nie: '{{Zakończ dialog}}' } }, 2: { pytanie: 'Treść pytania', odpowiedzi: { tak: 6, nie: 3 } }, ... } Podaj mi przykładowy proces lub problem, a ja wygeneruję odpowiednią instrukcję w formie drzewa. Generuj rozbudowaną odpowiedź, jeśli jest to konieczne. Jeśli chodzi o technologię i np. działanie na telefonie generuj przykład na system Android. Rozpisuj instrukcję jak najbardziej szczegółowo, aby osoba starsza mogła to zrozumieć. To jest przykład: Zniknęła mi ikona telefonu na pasku nawigacyjnym {
  1: {
    pytanie: "Czy zauważyłeś, że ikona telefonu zniknęła z paska nawigacyjnego?",
    odpowiedzi: {
      tak: 2,
      nie: "{{Zakończ dialog}}"
    }
  },
  2: {
    pytanie: "Czy widzisz ikonę telefonu na ekranie głównym?",
    odpowiedzi: {
      tak: 6,
      nie: 3
    }
  },
  3: {
    pytanie: "Przesuń palcem w górę lub w dół na ekranie głównym, aby otworzyć listę aplikacji. Sprawdź, czy ikona telefonu znajduje się na tej liście.",
    odpowiedzi: {
      tak: 4,
      nie: 8
    }
  },
  4: {
    pytanie: "Czy wyświetlił się dodatkowy dialog z opcjami po przytrzymaniu na ikonie telefonu?",
    odpowiedzi: {
      tak: 5,
      nie: "{{Zakończ dialog}}Sprawdź, czy przeciągnięcie ikony telefonu działa. Jeśli działa, przeciągnij ikonę na ekran główny."
    }
  },
  5: {
    pytanie: "Czy widzisz opcję „Dodaj do ekranu głównego”?",
    odpowiedzi: {
      tak: 6,
      nie: "{{Przejdź do kroku 6}}Przeciągnij ikonę telefonu z listy aplikacji na ekran główny."
    }
  },
  6: {
    pytanie: "Czy ikona telefonu została pomyślnie dodana do ekranu głównego?",
    odpowiedzi: {
      tak: 7,
      nie: "{{Przejdź do kroku 7}}Spróbuj ponownie dodać ikonę na ekran główny. Jeśli problem nadal występuje, sprawdź, czy ekran główny nie jest pełny."
    }
  },
  7: {
    pytanie: "Czy możesz teraz przeciągnąć ikonę telefonu na pasek nawigacyjny?",
    odpowiedzi: {
      tak: "{{Zakończ dialog}}Przeciągnij ikonę telefonu na pasek nawigacyjny.",
      nie: 7
    }
  },
  8: {
    pytanie: "Czy widzisz aplikację „Telefon” na liście aplikacji?",
    odpowiedzi: {
      tak: 9,
      nie: 10
    }
  },
  9: {
    pytanie: "Upewnij się, że aplikacja jest włączona. Czy aplikacja jest włączona?",
    odpowiedzi: {
      tak: 6,
      nie: 10
    }
  },
  10: {
    pytanie: "Czy udało się zainstalować aplikację „Telefon”?",
    odpowiedzi: {
      tak: 4,
      nie: "Skontaktuj się z pomocą techniczną producenta telefonu"
    }
  },
  11: {
    pytanie: "Czy ikona telefonu pojawiła się po restarcie?",
    odpowiedzi: {
      tak: "{{Zakończ dialog}}",
      nie: 12
    }
  },
  12: {
    pytanie: "Czy system jest zaktualizowany?",
    odpowiedzi: {
      tak: 13,
      nie: "{{Zakończ dialog}}Zainstaluj najnowsze aktualizacje, uruchom ponownie telefon i sprawdź, czy problem został rozwiązany."
    }
  },
  13: {
    pytanie: "Czy problem został rozwiązany po przywróceniu ustawień fabrycznych?",
    odpowiedzi: {
      tak: "{{Zakończ dialog}}",
      nie: "Skontaktuj się z pomocą techniczną producenta telefonu"
    }
  }
}`;
  const response = await dataManager.getOpenAIPrompt(prompt);
  console.log(response);
  res.send(response);
});



app.listen(port, () => console.info(`start serwera na porcie ${port}`))