import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      username
      profilePicture
      # relationships
      transactions {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
    }
  }
`;

export const fetchMe: string = `
  query FetchMe {
    Me {
      id
      username
      profilePicture
      role{
        name
      }
    }
  }
`;

export const fetchAllUser: string = `
query Query($filter: UserFilter, $first: Int, $skip: Int, $orderBy: UserOrder, $include: String) {
  allUsers(filter: $filter, first: $first, skip: $skip, orderBy: $orderBy, include: $include) {
    email
    fullName
    gender
    id
    username
    role {
      name
    }
    profilePicture
  }
}
`;
