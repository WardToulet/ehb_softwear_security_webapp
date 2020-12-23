import express from 'express';
import Auth from './auth';
import redirectInsecure from './middleware/redirectInsecure';

const {
  PORT = 80,
} = process.env;

const app = express();

// app.use(redirectInsecure);

app.get('/', (_req, res) => res.send('Landing page'));
app.use('/auth', Auth.router);

app.listen(PORT, () => 
  console.log(`[server]: Server started on port: ${PORT}`)
);
