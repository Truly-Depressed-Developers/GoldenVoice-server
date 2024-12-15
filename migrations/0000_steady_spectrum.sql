CREATE TABLE "useCasesSteps" (
	"id" serial PRIMARY KEY NOT NULL,
	"pytanie" text,
	"instrukcje" json,
	CONSTRAINT "useCasesSteps_pytanie_unique" UNIQUE("pytanie")
);
