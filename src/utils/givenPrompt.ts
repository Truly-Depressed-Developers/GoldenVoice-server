export const givenPrompt = (problem: string) => {
    return `Stwórz drzewo instrukcji w formie obiektu JavaScript, które przedstawia proces rozwiązywania problemu "${problem}". Struktura drzewa powinna wyglądać następująco: Każdy krok w procesie powinien być numerowany (np. 1, 2, 3, …). Każdy krok zawiera pytanie, które jest zadawane użytkownikowi. Każdy krok ma odpowiedzi: 'tak' (prowadzi do kolejnego kroku lub kończy proces), 'nie' (prowadzi do kolejnego pytania lub kończy proces), {{}} (w takich nawiasach umieszczaj funkcje - tylko zakończ dialog i przejdź do kroku). Po zakończeniu każdego kroku należy określić, czy proces ma się zakończyć (np. „Zakończ dialog”) lub przejść do kolejnego kroku. Przykład struktury drzewa w formacie JavaScript: { "1": { "pytanie": 'Treść pytania', "odpowiedzi": { "tak": 2, "nie": '{{Zakończ dialog}}' } }, "2": { "pytanie": 'Treść pytania', "odpowiedzi": { "tak": 6, "nie": 3 } }, ... } Podaj mi przykładowy proces lub problem, a ja wygeneruję odpowiednią instrukcję w formie drzewa. Generuj rozbudowaną odpowiedź, jeśli jest to konieczne. Jeśli chodzi o technologię i działanie na telefonie, generuj przykład na system Android. Rozpisuj instrukcję jak najbardziej szczegółowo, aby osoba starsza mogła to zrozumieć. Zwracaj odpowiedź zawsze zgodnie z tematem, nawet jeżeli się powtarza, albo jest taka sama jak w przykładzie. To jest przykład: Zniknęła mi ikona telefonu na pasku nawigacyjnym {
    "1": {
      "pytanie": "Czy zauważyłeś, że ikona telefonu zniknęła z paska nawigacyjnego?",
      "odpowiedzi": {
        "tak": 2,
        "nie": "{{Zakończ dialog}}"
      }
    },
    "2": {
      "pytanie": "Czy widzisz ikonę telefonu na ekranie głównym?",
      "odpowiedzi": {
        "tak": 6,
        "nie": 3
      }
    },
    "3": {
      "pytanie": "Przesuń palcem w górę lub w dół na ekranie głównym, aby otworzyć listę aplikacji. Sprawdź, czy ikona telefonu znajduje się na tej liście.",
      "odpowiedzi": {
        "tak": 4,
        "nie": 8
      }
    },
    "4": {
      "pytanie": "Czy wyświetlił się dodatkowy dialog z opcjami po przytrzymaniu na ikonie telefonu?",
      "odpowiedzi": {
        "tak": 5,
        "nie": "{{Zakończ dialog}}Sprawdź, czy przeciągnięcie ikony telefonu działa. Jeśli działa, przeciągnij ikonę na ekran główny."
      }
    },
    "5": {
      "pytanie": "Czy widzisz opcję „Dodaj do ekranu głównego”?",
      "odpowiedzi": {
        "tak": 6,
        "nie": "{{Przejdź do kroku 6}}Przeciągnij ikonę telefonu z listy aplikacji na ekran główny."
      }
    },
    "6": {
      "pytanie": "Czy ikona telefonu została pomyślnie dodana do ekranu głównego?",
      "odpowiedzi": {
        "tak": 7,
        "nie": "{{Przejdź do kroku 7}}Spróbuj ponownie dodać ikonę na ekran główny. Jeśli problem nadal występuje, sprawdź, czy ekran główny nie jest pełny."
      }
    },
    "7": {
      "pytanie": "Czy możesz teraz przeciągnąć ikonę telefonu na pasek nawigacyjny?",
      "odpowiedzi": {
        "tak": "{{Zakończ dialog}}Przeciągnij ikonę telefonu na pasek nawigacyjny.",
        "nie": 7
      }
    },
    "8": {
      "pytanie": "Czy widzisz aplikację „Telefon” na liście aplikacji?",
      "odpowiedzi": {
        "tak": 9,
        "nie": 10
      }
    },
    "9": {
      "pytanie": "Upewnij się, że aplikacja jest włączona. Czy aplikacja jest włączona?",
      "odpowiedzi": {
        "tak": 6,
        "nie": 10
      }
    },
    "10": {
      "pytanie": "Czy udało się zainstalować aplikację „Telefon”?",
      "odpowiedzi": {
        "tak": 4,
        "nie": "Skontaktuj się z pomocą techniczną producenta telefonu"
      }
    },
    "11": {
      "pytanie": "Czy ikona telefonu pojawiła się po restarcie?",
      "odpowiedzi": {
        "tak": "{{Zakończ dialog}}",
        "nie": 12
      }
    },
    "12": {
      "pytanie": "Czy system jest zaktualizowany?",
      "odpowiedzi": {
        "tak": 13,
        "nie": "{{Zakończ dialog}}Zainstaluj najnowsze aktualizacje, uruchom ponownie telefon i sprawdź, czy problem został rozwiązany."
      }
    },
    "13": {
      "pytanie": "Czy problem został rozwiązany po przywróceniu ustawień fabrycznych?",
      "odpowiedzi": {
        "tak": "{{Zakończ dialog}}",
        "nie": "Skontaktuj się z pomocą techniczną producenta telefonu"
      }
    }
  }`;

} 