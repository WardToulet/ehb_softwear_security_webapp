import { Router, json } from 'express';
import Joi from '@hapi/joi';
import checkSchema from '../middleware/checkSchema';

const authRouter = Router();

authRouter.use(json());

// Login
const loginRequest = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi
    .string()
    .min(7)
    .required(),
});

authRouter.post('/login', json(), checkSchema(loginRequest), (req, res) => res.send(req.body));


// Register
const registerRequest = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi
    .string()
    .required(),
});

authRouter.post('/register', json(), checkSchema(registerRequest), (req, res) => {
  console.log(req.body)
  res.json(req.body)
});

export default authRouter;
