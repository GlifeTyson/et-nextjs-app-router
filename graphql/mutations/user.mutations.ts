import { gql } from "@apollo/client";

// Define mutation
export const SIGN_UP = gql`
  # Increments a back-end counter and gets its resulting value
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;
export const SIGN_OUT = gql`
  mutation SignOut {
    logout {
      message
    }
  }
`;
export const LOG_IN = gql`
  mutation LogIn($input: LoginInput!) {
    login(input: $input) {
      _id
      name
      username
    }
  }
`;
export const loginQuery: string = `
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        message
        success
        token
    }
}
`;
export const signupQuery: string = `mutation CreateUser($input: NewUserInput!) {
  createUser(input: $input) {
    message
    success
  }
}`;

export const deleteUserQuery: string = `
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    message
    success
    errors {
      message
    }
  }
}`;
