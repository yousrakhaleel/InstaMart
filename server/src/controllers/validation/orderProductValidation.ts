import { Request } from 'express';
import Joi from 'joi';

const orderValidation = (req: Request) => {
  const schema = Joi.object({
    productArray: Joi.array()
      .items({
        id: Joi.number()
          .required(),
        name: Joi.string()
          .required(),
        imageUrl: Joi.string()
          .required(),
        price: Joi.string()
          .required(),
        quantity: Joi.number()
          .required(),
        isSupplied: Joi.boolean(),
      }),
    date: Joi.date().raw().required(),
    paidPrice: Joi.number().required(),
    mobile: Joi.number().required(),
    address: Joi.string().required(),
  });

  return schema.validateAsync(req.body);
};

export default orderValidation;