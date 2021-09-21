import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { Provider } from "react-redux";
import { setContext } from "@apollo/client/link/context";
// import {} from "apollo-boost";

import store from "./utils/store";
import Login from "./components/Login";
import Navigation from "./components/Navigation";

const httpLink = createHttpLink({
  uri: "/graphql",
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
  console.log(store);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <Login /> */}
        <Navigation />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
