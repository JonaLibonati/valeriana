import express from "express";
import crypto from "node:crypto";
import "dotenv/config";
import { corsMiddleware } from "./middlewares/cors.js";
import { usersRouter } from "./routes/v1/users.js";
import cookieParser from "cookie-parser";
import { contactsRouter } from "./routes/v1/contacts.js";
import { meetingsRouter } from "./routes/v1/meetings.js";

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



import { google } from "googleapis";
import {
  beforeUserCreated,
  beforeUserSignedIn
} from "firebase-functions/v2/identity";
const calendar = google.calendar("v3");

app.get("/cal", async (req, res) => {
  const accessToken = req.headers.authorization;

  try {
    const oauth = new google.auth.OAuth2();

    oauth.setCredentials({ 
      access_token: "ya29.a0AXooCgtPBGrEkyX7zVdbfnv_lhsOjCN1qeRsfdcAqrlvC091KIJ2LC5MpWZlIew9PFpV1_bV0ZDpHIN3r71sUYJN24PiibY94YD5GK-SRA26aNvhTIIb7N3Qv5lQ9sTDEElBPYVy5fEU90sFs6FLABNeFeA5tG3j95KPaCgYKARUSARESFQHGX2MikHRKjKR-59ekDLRTjkISBA0171",
      
     })
  
    
  const result = await calendar.events.list({
    auth: oauth,
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  console.log(result.data)
  } catch (e) {
    console.log(e)
  }

  return "hola"
});

app.get("/cal2", async (req, res) => {
  beforeUserCreated((event) => {
    const user = event.data;
    console.log(user)
  })
});

app.use((req, res) => {
    res.status(404).send("Error 404. Page not found");
  });


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });