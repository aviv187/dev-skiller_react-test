export const products = (state: any = [], action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.products;

    case 'ADD_PRODUCT':
      state.push(action.product);
      return state;

    case 'REMOVE_PRODUCT':
      state.splice(action.int, 1)
      return state;

    default:
      return state;
  }
}

export const setProducts = (products: any) => {
  return {
    type: 'SET_PRODUCTS',
    products
  }
}

export const addProduct = (product: any) => {
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