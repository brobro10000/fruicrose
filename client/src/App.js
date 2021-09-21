import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './utils/store'
import Navigation from './components/Navigation';
function App() {
  console.log(store)
  return (
    <Provider store={store}>
      {/* <Login /> */}
      <Navigation />
    </Provider>
  );
}

export default App;
