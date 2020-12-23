import express from 'express';
import Auth from './auth';
import redirectInsecure from './middleware/redirectInsecure';

import https from 'https';
import http from 'http';

import fs from 'fs';

const {
  HTTPS_PORT = 443,
  HTTP_PORT = 80,
} = process.env;

const app = express();

app.use(redirectInsecure);

app.get('/', (_req, res) => res.send('Landing page'));
app.use('/auth', Auth.router);

const httpsServerOptions: https.ServerOptions = {
  key: fs.readFileSync(`${__dirname}/ssl/server.key`),
  cert: fs.readFileSync(`${__dirname}/ssl/server.cert`),
};

http.createServer(app).listen(HTTP_PORT, () => 
  console.log(`[server/http]: Server started on port: ${HTTP_PORT}`)
);

https.createServer(httpsServerOptions, app).listen(HTTPS_PORT, () =>
  console.log(`[server/https]: Server started on port: ${HTTPS_PORT}`)
);
