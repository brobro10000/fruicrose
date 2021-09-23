import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      price
      stock
      unit
      categories {
        name
      }
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
