"use client";
import { getAllTransactions } from "@/graphql/queries/transaction.queries";
import { fetcher } from "@/services/fetcher";
import React, { createContext, useState, useEffect } from "react";
import useSWR from "swr";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  location: string;
  paymentType: string;
  userId: string;
  user: {
    username: string;
  };
}

interface TransactionContextType {
  transactions: Transaction[] | [];
}

const defaultContextValue: TransactionContextType = {
  transactions: [],
};

const TransactionContext =
  createContext<TransactionContextType>(defaultContextValue);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const transactionParams = {
    filter: {},
    first: 50,
    skip: 0,
    orderBy: "createdAt_DESC",
    include: "user",
  };
  const { data, error } = useSWR(
    [getAllTransactions, transactionParams],
    fetcher
  );
  const transactions = data?.allTransactions;

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext };
