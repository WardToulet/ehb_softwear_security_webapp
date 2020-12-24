import { Router, json } from 'express';

import { NewAccount, Account } from '@ss/types';

import Joi from '@hapi/joi';
import checkSchema from '../middleware/checkSchema';
import Logic from '../../../logic';

import jwt from 'jsonwebtoken';

const authRouter = (logic: Logic, secret: string) => {
  const router = Router();

  const createJWT = (account: Account): string => {
    return jwt.sign({
      sub: account.id
    }, secret, {
      expiresIn: '1h',
    });
  };

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
      res.cookie('refresh-token', createJWT(account), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }).json({ email: account.email });
    } catch(err) {
      switch(err.name) {
        case 'AccountDoesNotExist':
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
        case 'AccountTaken':
        case 'PasswordCommonlyUsed':
        case 'PasswordInvalidCharacters':
        case 'PasswordInsufficientLength': {
          res.status(400).json({ error: err.message })
        } break;
        default: {
          res.status(500).json({ error: err.message });
        } break;
      }
    }
  });

  return router;
}

export default authRouter;
