import { ADD_TO_CART, UPDATE_QUANTITY,REMOVE_PRODUCT } from "./cartActionTypes";

export const addToCart = ({product}) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const updateQuantity = (productId, newQuantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, newQuantity },
});
export const removeProduct = ({productId}) => ({
  type: REMOVE_PRODUCT,
  payload:productId,
});
