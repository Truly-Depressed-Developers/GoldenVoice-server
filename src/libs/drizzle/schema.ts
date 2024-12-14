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


export const users = pgTable("users", {
   id: serial("id").primaryKey(),
   name: text("name"),
   email: text("email"),
   created_at: timestamp("created_at").defaultNow(),
   updated_at: timestamp("updated_at"),
});