import { createStore } from "redux";
import { reducer } from './reducers'

const initialState = {
  products: [],
  categories: [],
  cart: [],
  currentForm: false,
  formType: 0
}

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)