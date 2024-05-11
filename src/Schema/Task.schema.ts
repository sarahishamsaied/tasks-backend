import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  content: Joi.string().min(3).max(255).default(''),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').default('MEDIUM'),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').default('PENDING'),
  startDate: Joi.date().greater('now'),
  endDate: Joi.date().greater('now'),
  isCompleted: Joi.boolean(),
});
