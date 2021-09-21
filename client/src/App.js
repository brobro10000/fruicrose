import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux'
import store from './utils/store'
import Navigation from './components/Navigation';
import Products from './components/Products';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  console.log(store)
  return (
    <ApolloProvider client={client}>
    <Provider store={store}>
      <Navigation />
      <Products />
    </Provider>
    </ApolloProvider>
  );
}

export default App;
