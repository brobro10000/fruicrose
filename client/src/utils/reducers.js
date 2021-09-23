import { useReducer } from "react";
import { UPDATE_LOGIN, UPDATE_PRODUCTS, UPDATE_USER, ADD_TO_CART, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return {
        ...state,
        currentForm: action.currentForm,
        formType: action.formType,
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product]
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.product]
      };

    case REMOVE_FROM_CART:
        let newState = state.cart.filter((product) => {
          return product._id !== action._id;
        });

        return {
          ...state,
          cart: newState
        };

      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cart: state.cart.map((product) => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
          }),
        };
      

    default:
      return state;
  }
};

export function useFruitReducer(initialState) {
  return useReducer(reducer, initialState);
}
