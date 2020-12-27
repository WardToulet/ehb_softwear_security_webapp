import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Check if the request body ctonfims to a schema
const validateJWT = (secret: string) => (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);
  const refreshToken = req.cookies['refresh-token'];
  if(!refreshToken) {
    res.status(401).json({ error: 'No refresh-token cookie supplied' });
    return;
  }

  try {
    // TODO: encode the permissions in the request
    jwt.verify(refreshToken, secret);
    next();
  } catch {
    // TODO: catch why invalid (age, issuer, wrong secret
    res.status(401).json({ error: 'Invalid refresh-token cookie supplied' });
    return;
  }
}

export default validateJWT; 
