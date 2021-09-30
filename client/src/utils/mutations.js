import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        price
        unit
        categories {
          name
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($products: [ID]!, $stock: [Int]!) {
    updateProduct(products: $products, stock: $stock) {
      _id
      name
      description
      price
      stock
      unit
    }
  }
`;

