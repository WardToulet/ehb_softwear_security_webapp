import { Request, Response, NextFunction } from 'express';

const redirectInsecure = (req: Request, res: Response, next: NextFunction) => {
  if(req.secure) {
    next();
  } else {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
}

export default redirectInsecure; 
