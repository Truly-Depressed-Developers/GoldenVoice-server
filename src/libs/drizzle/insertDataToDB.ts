import { eq } from "drizzle-orm";
import db from "./DB";
import * as schema from "./schema";

export default async function insertDataToDB(prompt: string, data: {
   [key: string]: {
      pytanie: string;
      odpowiedzi: {
         tak: string | number;
         nie: string | number;
      };
   };
}) {
   await db.insert(schema.useCasesSteps).values({
      pytanie: prompt,
      instrukcje: data
   }).onConflictDoUpdate({
      target: schema.useCasesSteps.pytanie,
      set: {
         instrukcje: data
      }
   });
}