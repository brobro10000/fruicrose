import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import { Provider } from 'react-redux'
import store from './utils/store'
function App() {
  console.log(store)
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
