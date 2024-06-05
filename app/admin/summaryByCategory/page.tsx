"use client";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import Chart from "chart.js/auto";
import { TransactionContext } from "@/contexts/TransactionProvider";
Chart.register(ArcElement, Tooltip, Legend);
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
const SumByCategory = () => {
  const { transactions } = useContext(TransactionContext);
  console.log("transactions", transactions);
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 10,
        spacing: 10,
        cutout: 130,
        hoverOffset: 15,
      },
    ],
  });
  const optionsForBarChart: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bar Chart",
        position: "bottom" as const,
        font: {
          size: 20,
        },
      },
    },
  };

  const totalAmountByCategory = (transactions: TransactionType[]) => {
    const totalAmountByCategory: { [key: string]: number } = {};
    transactions?.forEach((transaction) => {
      if (!totalAmountByCategory[transaction.category]) {
        totalAmountByCategory[transaction.category] = 0;
      }
      totalAmountByCategory[transaction.category] += transaction.amount;
    });
    return totalAmountByCategory;
  };
  useEffect(() => {
    if (transactions) {
      const res = totalAmountByCategory(transactions);
      const borderColorMap: { [key: string]: string } = {
        expense: "rgba(255, 99, 132)",
        saving: "rgba(63, 195, 128)",
        investment: "rgba(45, 85, 255)",
      };
      if (res) {
        const newData = {
          labels: Object.keys(res),
          datasets: [
            {
              label: "$",
              data: Object.values(res),
              backgroundColor: Object.keys(res)?.map(
                (key) => borderColorMap[key]
              ),
              borderColor: Object.keys(res)?.map((key) => borderColorMap[key]),
              borderWidth: 1,
              borderRadius: 10,
              spacing: 10,
              cutout: 130,
              hoverOffset: 15,
            },
          ],
        };

        setData(newData);
      }
    }
  }, [transactions]);
  return (
    <div className="w-[600px] h-[500px] mx-auto">
      <p className="text-black text-center text-3xl pt-10">
        Summarize by Category
      </p>
      <Bar data={data} options={optionsForBarChart} />
    </div>
  );
};

export default SumByCategory;
