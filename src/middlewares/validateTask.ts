import { Request, Response, NextFunction } from 'express';
import { taskSchema } from '../Schema/Task.schema';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
