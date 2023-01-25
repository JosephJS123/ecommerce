const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: [
          ...state.cart.filter((product) => product.id !== action.payload.id),
        ],
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default CartReducer;

// 1 agregar productos

// 2 quitar productos

// 3 vacear productos
