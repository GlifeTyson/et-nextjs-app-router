import {
  createTransactionQuery,
  deleteTransactionQuery,
  updateTransactionQuery,
} from "../graphql/mutations/transaction.mutations.ts";
import { getTransactionQuery } from "../graphql/queries/transaction.queries.ts";
import { createAxios } from "../lib/axios.ts";

interface createTransactionType {
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: string;
}

interface updateTransactionType {
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: string;
}
export async function getTransaction({
  transactionId,
}: {
  transactionId: string;
}) {
  try {
    const res = await createAxios().post("http://localhost:3001/graphql", {
      query: getTransactionQuery,
      variables: {
        transactionId: transactionId,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
export async function createTransaction({
  input,
}: {
  input: createTransactionType;
}) {
  try {
    const res = await createAxios().post("http://localhost:3001/graphql", {
      query: createTransactionQuery,
      variables: {
        input: input,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
export function updateTransaction({
  id,
  input,
}: {
  id: string;
  input: updateTransactionType;
}) {
  try {
    const res = createAxios().post("http://localhost:3001/graphql", {
      query: updateTransactionQuery,
      variables: {
        updateTransactionId: id,
        input: input,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export function deleteTransaction(transactionId: string) {
  try {
    const res = createAxios().post("http://localhost:3001/graphql", {
      query: deleteTransactionQuery,
      variables: {
        deleteTransactionId: transactionId,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
