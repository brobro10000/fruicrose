import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'animate.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import store from "./utils/store";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Success from "./pages/Success";
import SimpleSlider from "./components/SimpleSlider";
import Products from "./components/Products";
// import Loading from "./components/Loading";
const httpLink = createHttpLink({
  uri: "graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <div className="wrapper">
        <ApolloProvider client={client}>
          <Router>
            <Provider store={store}>
              <div className='marginBottom'>
                <Navigation />
              </div>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/slider" component={SimpleSlider} />
            </Provider>
          </Router>
        </ApolloProvider>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
