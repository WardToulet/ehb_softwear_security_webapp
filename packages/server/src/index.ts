import express from 'express';
import Auth from './auth';

import { User } from '@ss/common';

const {
  PORT = 8080
} = process.env;;

app.use('/auth', Auth.router);

app.listen(PORT, () => console.log(`[server]: Server started on port: ${PORT}`));
