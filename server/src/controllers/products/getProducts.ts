import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { getProductsValidation } from '../validation';
import { Product } from '../../database';

const getProducts = async (req:Request, res:Response, next:NextFunction) => {
  const {
    q, categoryId, sort, page = 1, limit = 6,
  } = req.query;
  try {
    await getProductsValidation(req);

    const dbFilterdProducts = await Promise.all([Product.findAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      where:
       ((categoryId && q) ? {
         [Op.and]: [{ categoryId: +categoryId }, { name: { [Op.like]: `%${q}%` } }],
       } : undefined)
       || (categoryId ? { categoryId: +categoryId } : undefined)
       || (q ? { name: { [Op.like]: `%${q}%` } } : undefined),
      order: sort ? [['price', `${sort}`]] : undefined,
    }),
    Product.count({
      where:
       ((categoryId && q) ? {
         [Op.and]: [{ categoryId: +categoryId }, { name: { [Op.like]: `%${q}%` } }],
       } : undefined)
       || (categoryId ? { categoryId: +categoryId } : undefined)
       || (q ? { name: { [Op.like]: `%${q}%` } } : undefined),
    }),
    ]);

    res.json({ status: 200, totalCount: dbFilterdProducts[1], data: dbFilterdProducts[0] });
  } catch (err:any) {
    if (err.details) {
      res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    next(err);
  }
};

export default getProducts;