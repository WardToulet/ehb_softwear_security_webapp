import Joi from '@hapi/joi';

import { Request, Response, NextFunction } from 'express';

// Check if the request body confims to a schema
const checkSchema = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error }  = schema.validate(req.body);
  if(error) {
    res.status(400);
    res.json(error);
  }

  next();
}

export default checkSchema; 
