import { Router, json } from 'express';

import { NewAccount } from '@ss/types';

import Joi from '@hapi/joi';
import checkSchema from '../middleware/checkSchema';
import Logic from '../../../logic';

const authRouter = (logic: Logic) => {
  const router = Router();
  router.use(json());

  // Login
  const loginRequest = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  });

  router.post('/login', json(), checkSchema(loginRequest), (req, res) => {
    try {
      const account = logic.login(req.body.email, req.body.password);
      res.json(account);
    } catch(err) {
      switch(err.name) {
        case 'AccountDoesNotExist': {
          res.status(401).json({ error: err.message });
        } break;
        case 'WrongCredentials': {
          res.status(401).json({ error: err.message });
        } break;
        default: {
          res.status(500).json({ error: err.message });
        } break;
      }
    }
  });

  // Register
  const registerRequest = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  });

  router.post('/register', json(), checkSchema(registerRequest), (req, res) => {
    try {
      const account = logic.registerAccount(req.body as NewAccount);
      res.json(account);
    } catch(err) {
      switch(err.name) {
        case 'AccountTaken': {
          res.status(400).json({ 'error': err.message })
        } break;
      }
    }
  });

  return router;
}

export default authRouter;
