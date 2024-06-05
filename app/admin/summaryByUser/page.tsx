"use client";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import Chart from "chart.js/auto";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/contexts/TransactionProvider";

Chart.register(ArcElement, Tooltip, Legend);
type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    borderRadius: number;
    spacing: number;
    cutout: number;
    hoverOffset: number;
  }[];
};
interface TransactionType {
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

interface UserCategoryTotals {
  [userId: string]: {
    [category: string]: number;
  };
}
interface CategoryTotals {
  userId: string;
  categories: {
    category: string;
    totalAmount: number;
  }[];
}
const SumByUser = () => {
  const { transactions } = useContext(TransactionContext);
  const optionsForPieChart: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const [key, setKey] = useState<string[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotals[]>([]);

  const calculateTotalAmountByUserAndCategory = (
    transactions: TransactionType[]
  ): UserCategoryTotals => {
    const result: UserCategoryTotals = {};

    // Sử dụng phương pháp reduce để tính tổng số lượng cho mỗi userId và category
    transactions.forEach((transaction) => {
      const { userId, category, amount } = transaction;

      // Tạo hoặc cập nhật giá trị số lượng cho userId và category tương ứng
      if (!result[userId]) {
        result[userId] = {};
      }

      if (!result[userId][category]) {
        result[userId][category] = 0;
      }

      result[userId][category] += amount;
    });

    return result;
  };
  const convertToArray = (
    userCategoryTotals: UserCategoryTotals
  ): CategoryTotals[] => {
    const result: CategoryTotals[] = [];
    for (const userId in userCategoryTotals) {
      if (userCategoryTotals.hasOwnProperty(userId)) {
        const categories = userCategoryTotals[userId];
        const categoryArray: { category: string; totalAmount: number }[] = [];

        for (const category in categories) {
          if (categories.hasOwnProperty(category)) {
            const totalAmount = categories[category];
            categoryArray.push({ category, totalAmount });
          }
        }
        result.push({ userId, categories: categoryArray });
      }
    }
    return result;
  };

  useEffect(() => {
    if (transactions) {
      // const transactions = data.allTransactions;
      const calculate = calculateTotalAmountByUserAndCategory(transactions);
      const keys = Object.keys(calculate);
      setKey(keys);
      const arrayTotal = convertToArray(calculate);
      setCategoryTotals(arrayTotal);
    }
  }, [transactions]);

  const borderColorMap: { [key: string]: string } = {
    expense: "rgba(255, 99, 132)",
    saving: "rgba(63, 195, 128)",
    investment: "rgba(45, 85, 255)",
  };

  return (
    <div className="w-[500px] max-h-[70vh] overflow-y-auto mx-auto">
      {categoryTotals.map((category) => (
        <div key={category.userId} className="gap-y-6 py-10">
          <Pie
            data={{
              labels: category.categories.map((category) => category.category),
              datasets: [
                {
                  label: "$",
                  data: category.categories.map(
                    (category) => category.totalAmount
                  ),
                  backgroundColor: category.categories.map(
                    (category) => borderColorMap[category.category]
                  ),
                  borderColor: category.categories.map(
                    (category) => borderColorMap[category.category]
                  ),
                  borderWidth: 1,
                  borderRadius: 10,
                  spacing: 10,
                  hoverOffset: 15,
                },
              ],
            }}
            options={optionsForPieChart}
          />
          <p className="text-black text-center">
            <b>By UserId: </b>
            {category.userId}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SumByUser;
