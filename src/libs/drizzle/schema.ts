import { relations, sum, eq } from "drizzle-orm";
import {
   serial,
   text,
   timestamp,
   pgTable,
   uuid,
   integer,
   primaryKey,
   boolean,
   json,
} from "drizzle-orm/pg-core";


export const useCasesSteps = pgTable("useCasesSteps", {
   id: serial("id").primaryKey(),
   pytanie: text("pytanie").unique(),
   instrukcje: json("instrukcje").$type<{
      [key: string]: {
         pytanie: string;
         odpowiedzi: {
            tak: string | number;
            nie: string | number;
         };
      };
   }>(),
});

// step: {wyzwalacz: string, text:string}

// step[] -> step[] -> step[]