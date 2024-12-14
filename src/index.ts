import bodyParser from "body-parser";
import express from "express";
import { migrate } from "./jobs/migrate";
import { config } from "./utils/config";

if (config.MIGRATE) {
   migrate();
}

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("Hello World!");
});


app.listen(port, () => console.info(`start serwera na porcie ${port}`))