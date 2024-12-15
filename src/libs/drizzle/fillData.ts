import { eq } from "drizzle-orm";
import db from "./DB";
import * as schema from "./schema";

export default async function fillData() { // do zrobienia
   await db.insert(schema.useCasesSteps).values({
      release: "",
      instruction: "Wprowadź dane do systemu",
      prev_id: null,
   });

   const aaa = db.query.useCasesSteps.findMany({
      with: {
         prev: true
      }
   });
}