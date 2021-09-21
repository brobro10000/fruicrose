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
mutution createUser($username: String!, $email: String!, $password: String!) {
    createUser(
        username: $username
        email: $email
        password: $password
    ) {
        token
        user {
            _id
        }
    }
}`;
