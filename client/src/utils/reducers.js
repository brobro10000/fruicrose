import { useReducer } from "react";
import { UPDATE_LOGIN, UPDATE_PRODUCTS } from "./actions";

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

    default:
      return state;
  }
};

export function useFruitReducer(initialState) {
  return useReducer(reducer, initialState);
}
