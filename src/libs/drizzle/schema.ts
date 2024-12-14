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
} from "drizzle-orm/pg-core";


export const useCasesSteps = pgTable("useCasesSteps", {
   id: serial("id").primaryKey(),
   release: text("release"),
   instruction: text("text"),
   prev_id: integer("id_kroku"),
});

export const useCasesStepsRelations = relations(useCasesSteps, ({one}) => ({
   prev: one(useCasesSteps, {
      fields: [useCasesSteps.prev_id],
      references: [useCasesSteps.id],
   })
}))

// step: {wyzwalacz: string, text:string}

// step[] -> step[] -> step[]