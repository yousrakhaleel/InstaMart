import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';
import { Order } from '../../database';
import { editOrderValidation } from '../validation';

const editOrder = async (req:Request, res:Response, next:NextFunction) => {
  const { status, id }:{status:string, id: number} = req.body;
  try {
    await editOrderValidation(req);
    const result = await Order.update({ status }, { where: { id } });
    if (!result[0]) {
      res.status(404).json({ success: false, message: 'Order Not found !' });
    } else {
      res.status(200).json({ message: 'Order Updated Successfully !' });
    }
  } catch (error:any) {
    if (error.details) {
      res.status(422).json(error.details[0].message);
    } else {
      next(CustomizedError('server error', 500));
    }
  }
};

export default editOrder;