"use client";
import React, { useEffect, useState } from "react";
import CardMonth from "./CardMonth";
interface TransactionType {
  // key: React.Key;
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
interface monthLyTotals {
  month: string;
  categories: { [category: string]: number };
}
const SumByMonth = ({ transactions }: { transactions: TransactionType[] }) => {
  const [monthLyTotals, setMonthlyTotals] = useState<monthLyTotals[]>([]);
  const countMonthLyTotals = (
    transactions: TransactionType[]
  ): monthLyTotals[] => {
    const result: { [month: string]: { [category: string]: number } } = {};
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthIndex = date.getUTCMonth(); // Lấy tháng (dạng số)
      const month = months[monthIndex];

      if (!result[month]) {
        result[month] = {};
      }
      if (!result[month][transaction.category]) {
        result[month][transaction.category] = 0;
      }
      result[month][transaction.category] += transaction.amount;
    });
    const monthLyTotals: monthLyTotals[] = months.map((month) => {
      const categories = result[month] || {};
      const allCategories: string[] = ["expense", "saving", "investment"];
      allCategories.forEach((category) => {
        if (!categories[category]) {
          categories[category] = 0;
        }
      });
      return { month, categories };
    });

    return monthLyTotals;
  };
  useEffect(() => {
    if (transactions) {
      const monthLyTotals = countMonthLyTotals(transactions);
      // console.log("monthLyTotals", monthLyTotals);
      // console.log("typeof mothlyTotals", typeof monthLyTotals);
      setMonthlyTotals(monthLyTotals);
    }
  }, [transactions]);
  return (
    <div className="text-black flex flex-wrap justify-center items-center gap-5">
      {monthLyTotals?.map((month) => (
        <CardMonth key={month.month} month={month} />
      ))}
    </div>
  );
};

export default SumByMonth;
