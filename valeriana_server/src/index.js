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

const oauth2Client = new google.auth.OAuth2(
  '214861858156-sor93kn7o4dip11om8r3sv8u79afuf30.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/',
);

app.get("/cal3", async (req, res) => {
  try {
    // generate a url that asks permissions for Blogger and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/calendar.app.created'
    ];
  
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
  
      // If you only need one scope, you can pass it as a string
      scope: scopes
    });
    console.log(url)
    res.status(200).redirect(url)
  } catch (e) {
    console.error(e);
  }
});

/* {
  access_token: 'ya29.a0AXeO80QZZSbnY53OnVHDJ-g07RXCvjU-SDNsnCDQgg3iTQ40APL7Ax_cdowLoREiw029iAh-baJWCCmRqqDVt7XreiCECTZvkbfJg1KkRp7P8m81ANngcZ_K6Spk9bjhugJDtpigV1cqAYWT7VoWs3qhDB8qyKw_QgzJwB94aCgYKAQ0SARESFQHGX2MiZ0MvCWKB3qEttuJDF4onjQ0175',
  refresh_token: '1//0hFcSDCnZ8B5_CgYIARAAGBESNwF-L9IrBU7zIc7smrInz81BHNhuZCwZYL1jKNbbOjg77mCyOmmaHQIA0QH_o4RvELCRtvhhu80',
  scope: 'https://www.googleapis.com/auth/calendar.app.created',
  token_type: 'Bearer',
  expiry_date: 1738992096177
} */


app.get("/oauthcallback", async (req, res) => {
  try {
        console.log('-------')
        /* const data = req.originalUrl.split('?')[1]
        const [code, scope] = [data.split('&')[0].split('=')[1], data.split('&')[1].split('=')[1]]
        console.log(code)
        console.log(scope) */

        /* const {tokens} = await oauth2Client.getToken(code) */

        const tokens = {
          access_token: 'ya29.a0AXeO80QZZSbnY53OnVHDJ-g07RXCvjU-SDNsnCDQgg3iTQ40APL7Ax_cdowLoREiw029iAh-baJWCCmRqqDVt7XreiCECTZvkbfJg1KkRp7P8m81ANngcZ_K6Spk9bjhugJDtpigV1cqAYWT7VoWs3qhDB8qyKw_QgzJwB94aCgYKAQ0SARESFQHGX2MiZ0MvCWKB3qEttuJDF4onjQ0175',
          refresh_token: '1//0hFcSDCnZ8B5_CgYIARAAGBESNwF-L9IrBU7zIc7smrInz81BHNhuZCwZYL1jKNbbOjg77mCyOmmaHQIA0QH_o4RvELCRtvhhu80',
          scope: 'https://www.googleapis.com/auth/calendar.app.created',
          token_type: 'Bearer',
          expiry_date: 1738992096177
        }

        console.log(tokens)

        const oauth = new google.auth.OAuth2(
          '214861858156-sor93kn7o4dip11om8r3sv8u79afuf30.apps.googleusercontent.com',
          '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',
        );

        oauth.setCredentials(tokens);

        const testCalendar = {
          "summary": 'Calendario-Test',
          "description": 'test',
        }

        const result = await calendar.calendars.insert({
          auth: oauth,
          resource: testCalendar,});
      
        console.log(result.data)
        res.status(200).send()
      } catch (e) {
        console.error(e);
      }
});


app.use((req, res) => {
    res.status(404).send("Error 404. Page not found");
  });


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });