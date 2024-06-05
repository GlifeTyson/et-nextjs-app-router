"use client";
import React from "react";
import { Card, Space } from "antd";
interface monthLyTotals {
  month: string;
  categories: { [category: string]: number };
}
const monthColors: { [key: string]: string } = {
  January: "bg-red-100",
  February: "bg-yellow-100",
  March: "bg-green-100",
  April: "bg-blue-100",
  May: "bg-indigo-100",
  June: "bg-purple-100",
  July: "bg-pink-100",
  August: "bg-teal-100",
  September: "bg-gray-100",
  October: "bg-orange-100",
  November: "bg-amber-100",
  December: "bg-lime-100",
};
const CardMonth = ({ month }: { month: monthLyTotals }) => {
  const bgColor = monthColors[month.month] || "bg-white";

  return (
    <Card
      className={`w-full md:w-72 mb-4 shadow-lg rounded-lg ${bgColor}`}
      onClick={() => {
        console.log("month.categories", month.categories);
      }}
    >
      <p className="text-lg font-bold mb-2">{month.month}</p>
      <Space direction="vertical">
        {Object.entries(month.categories).map(([category, amount]) => (
          <p key={category} className="text-base">
            {category}: {amount}
          </p>
        ))}
      </Space>
    </Card>
  );
};

export default CardMonth;
