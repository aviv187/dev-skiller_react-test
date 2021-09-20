import { Product } from "../modules/product";

export const products = (state: any = [], action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.products;

    case 'ADD_PRODUCT':
      const newState1 = [...state];
      newState1.push(action.product);
      return newState1;

    case 'REMOVE_PRODUCT':
      const newState = [...state];
      newState.splice(action.int, 1)
      return newState;

    default:
      return state;
  }
}

export const setProducts = (products: Product[]) => {
  return {
    type: 'SET_PRODUCTS',
    products
  }
}

export const addProduct = (product: Product) => {
  return {
    type: 'ADD_PRODUCT',
    product
  }
}

export const removeProduct = (int: number) => {
  return {
    type: 'REMOVE_PRODUCT',
    int
  }
}