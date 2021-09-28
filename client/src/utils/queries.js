import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      stock
      unit
      categories {
        name
      }
    }
  }
`;

export const QUERY_ONE_PRODUCT = gql`
query Query($productId: ID) {
  product(_id: $productId) {
    _id
    name
    price
    stock
    unit
  }
}
`;

export const QUERY_ALL_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      username
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          price
          unit
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!, $quantity: [Int]!) {
    checkout(products: $products, quantity: $quantity) {
      session
    }
  }
`;
