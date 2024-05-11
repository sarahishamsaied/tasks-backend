import { Task } from '@prisma/client';
import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(255),
  dueDate: Joi.date().greater('now'),
  isCompleted: Joi.boolean(),
});

export function validateTask(task: Task) {
  const result = taskSchema.validate(task);
  return result;
}
