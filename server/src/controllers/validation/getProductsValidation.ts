import { Request } from 'express';
import Joi from 'joi';

const getProductsSchema = Joi.object({
  q: Joi.string().allow(''), // allow empty string which is not a string in joi
  categoryId: Joi.number(),
  sort: Joi.string().pattern(/^(DESC|ASC)$/),
});

const getProductsValidation = (req:Request) => getProductsSchema.validateAsync(req.query);
export default getProductsValidation;
