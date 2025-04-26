import express from "express";
import crypto from "node:crypto";
import "dotenv/config";
import { corsMiddleware } from "./middlewares/cors.js";
import { usersRouter } from "./routes/v1/users.js";
import cookieParser from "cookie-parser";
import { contactsRouter } from "./routes/v1/contacts.js";
import { meetingsRouter } from "./routes/v1/meetings.js";
import { googleRouter } from "./routes/v1/apiGoogle.js";
import { configRouter } from "./routes/v1/config.js";

// Reading a JSON with ESM.
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const json = require('./<path>.json');

const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT;

app.use(express.json()); // midleware to receive json from a POST request
app.use(corsMiddleware());
app.use(cookieParser());

app.get("/", (req, res) => {
  //res.send('<h1>Hola mundo</h1>')
  res.send(crypto.randomUUID());
});

app.use("/v1/users", usersRouter);
app.use("/v1/contacts", contactsRouter);
app.use("/v1/meeting", meetingsRouter);
app.use("/v1/google", googleRouter);
app.use("/v1/config", configRouter);

app.use((req, res) => {
    res.status(404).send("Error 404. Page not found");
  });


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });