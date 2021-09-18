import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import {Provider} from 'react-redux'
import store from './utils/store'
function App() {
  
  return (
    <Login/>
  );
}

export default App;
