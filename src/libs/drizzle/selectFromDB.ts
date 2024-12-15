import { eq } from "drizzle-orm";
import db from "./DB";
import * as schema from "./schema";

export async function selectAllGivenPrompts() {
    const allPrompts = await db.select({
        pytanie: schema.useCasesSteps.pytanie,
    }).from(schema.useCasesSteps);
    return allPrompts;
}

export async function selectGivenInstructions(prompt: string) {
    const givenPrompt = await db.select({
        pytanie: schema.useCasesSteps.pytanie,
        instrukcje: schema.useCasesSteps.instrukcje,
    }).from(schema.useCasesSteps).where(eq(schema.useCasesSteps.pytanie, prompt));
    return givenPrompt;
}