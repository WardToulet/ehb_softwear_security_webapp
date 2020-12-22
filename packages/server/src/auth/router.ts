import { Router, json } from 'express';

const authRouter = Router();

authRouter.post('/login', json(), (_req, res) => res.sendStatus(200));

authRouter.post('/register', json(),(req, res) => {
  console.log(req.body)
  res.json(req.body)
});

// Register handler



export default authRouter;
