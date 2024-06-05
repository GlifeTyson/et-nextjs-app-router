import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      amount
      category
      description
      date
      location
      paymentType
      userId
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;

export const getTransactions: string = `
query Query($filter: FilterTransaction, $first: Int, $orderBy: TransactionOrder, $skip: Int) {
  myTransactions(filter: $filter, first: $first, orderBy: $orderBy, skip: $skip) {
    id
    userId
    amount
    description
    category
    paymentType
    date
    location
  }
}
`;

export const getTransactionStatistics: string = `
  query CategoryStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;
export const getTransactionQuery: string = `
query Query($transactionId: ID!) {
  transaction(id: $transactionId) {
    id
    userId
    amount
    description
    category
    paymentType
    date
    location
  }
}
`;
export const getAllTransactions: string = `
query AllTransactions($filter: FilterTransaction, $first: Int, $skip: Int, $orderBy: TransactionOrder, $include: String) {
  allTransactions(filter: $filter, first: $first, skip: $skip, orderBy: $orderBy, include: $include) {
    id
    amount
    category
    description
    paymentType
    date
    location
    userId
    user {
      username
    }
  }
}
`;
