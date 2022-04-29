import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';
import { editProductValidation } from '../validation';
import { Product } from '../../database';

const editProduct = async (req:Request, res:Response, next:NextFunction) => {
  const {
    id, name, imageUrl, price, details, categoryId,
  } = req.body;
  try {
    await editProductValidation(req);
    await Product.upsert({
      id, name, imageUrl, price, details, categoryId,
    });
    res.status(200).json({ message: 'Product Updated Successfully !' });
  } catch (error:any) {
    if (error.details) {
      res.status(422).json(error.details[0].message);
    } else {
      next(CustomizedError('server error', 500));
    }
  }
};

export default editProduct;
