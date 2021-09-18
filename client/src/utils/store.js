import { createStore } from "redux";
import { reducer } from './reducers'

const initialState = {
  currentBook: false
}

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)