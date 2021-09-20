export const products = (state: any = [], action: any) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      state.push(action.product);
      return state;
    default:
      return state;
  }
}

export const addProduct = (product: any) => {
  return {
    type: 'ADD_PRODUCT',
    product
  }
}