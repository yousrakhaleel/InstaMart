import { NextFunction, Request, Response } from 'express';
import { Product, Category } from '../../database';

const getProductByID = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  try {
    const productByID = await Product.findOne({ include: Category, where: { id } });
    if (productByID) {
      return res.json({ success: true, data: productByID });
    }
    return res.status(404).json({ success: false, message: 'No product found!' });
  } catch (err: any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};
export default getProductByID;