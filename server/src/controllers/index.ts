import notFound from './notFound';
import serverError from './serverError';
import serveRoot from './serveRootIndex';
import {
  authUser, login, logout, signUp,
} from './users';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getCategories,
  getCategoryProduct,
  getProductByID,
  getProducts,
  getTop5ProductsSales,
  uploadImage,
} from './products';

import {
  getOrders, addOrder, deleteOrder, editOrder, getUsersBalances,
} from './orders';

export {
  addOrder,
  deleteOrder,
  serveRoot,
  notFound,
  serverError,
  logout,
  login,
  signUp,
  authUser,
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getProductByID,
  uploadImage,
  getCategories,
  getCategoryProduct,
  getOrders,
  editOrder,
  getUsersBalances,
  getTop5ProductsSales,
};
