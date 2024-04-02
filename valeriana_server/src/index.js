const express = require ('express');
const crypto = require ('node:crypto');
const z = require ('zod'); // Used to validate Request.
const app = express();

app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // midleware to receive json from a POST request

app.get('/', (req, res) => {
    //res.send('<h1>Hola mundo</h1>')
    res.send(crypto.randomUUID());
})

app.use((req, res) => {
    res.status(404).send('Error 404. Page not found')
})

app.listen ( PORT, () => {
    console.log('Server is listening on http://localhost:3000');
})