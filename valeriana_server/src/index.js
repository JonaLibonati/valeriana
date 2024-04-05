import express from 'express';
import crypto from 'node:crypto';
import z from 'zod'; // Used to validate Request.
import { corsMiddleware } from './middlewares/cors.js';
import { usersRouter } from './routes/v1/users.js';

// Reading a JSON with ESM.
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const json = require('./<path>.json');

const app = express();

app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // midleware to receive json from a POST request
app.use(corsMiddleware());

app.get('/', (req, res) => {
    //res.send('<h1>Hola mundo</h1>')
    res.send(crypto.randomUUID());
})

app.use('/v1/users', usersRouter);

app.use((req, res) => {
    res.status(404).send('Error 404. Page not found');
})

app.listen ( PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})