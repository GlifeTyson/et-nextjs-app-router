"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import {
  LogoutOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserContext } from "@/contexts/UserProvider";
import useSortColumn from "@/hooks/useSortColumn";
import useSWR from "swr";
import { getAllTransactions } from "@/graphql/queries/transaction.queries";
import { fetcher } from "@/services/fetcher";
import { Button, Layout, Menu, MenuProps } from "antd";
import TableTransaction from "@/components/TableTransaction";
import TableUser from "@/components/TableUser";
import SumByUser from "@/components/summary/SumByUser";
import SumByCategory from "@/components/summary/SumByCategory";
import SumByMonth from "@/components/summary/SumByMonth";
import SumByYear from "@/components/summary/SumByYear";
import ModalUser from "@/components/ui/Modal/ModalUser";

const { Sider } = Layout;
interface UserType {
  key: React.Key;
  id: string;
  username: string;
  role: {
    name: string;
  };
  profilePicture: string;
  password: string;
  confirmPassword: string;
  email: string;
}
interface TransactionType {
  key: React.Key;
  id: string;
  amount: number;
  category: string;
  description: string;
  paymentType: string;
  date: string;
  location: string;
  userId: string;
  user: {
    username: string;
  };
}

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "User",
    label: "User Management",
    icon: <UserOutlined />,
  },
  {
    key: "Transaction",
    label: "Transaction Management",
    icon: <TransactionOutlined />,
  },
  {
    key: "Summary",
    label: "Summary by ",
    icon: <TransactionOutlined />,
    children: [
      { key: "SumByUser", label: "User" },
      { key: "Category", label: "Category" },
      { key: "Month", label: "Month" },
      { key: "Year", label: "Year" },
    ],
  },
];
const Page = () => {
  const { me, handleLogout } = useContext(UserContext);
  const [show, setShow] = useState<string>("User");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { sortOrderBy, handleSort, sortParams } = useSortColumn();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const transactionParams = {
    filter: {},
    first: 50,
    skip: 0,
    orderBy: sortParams() ? sortParams() : "createdAt_DESC",
    include: "user",
  };
  const {
    data: fetchTransactions,
    isLoading: isLoadingTransactions,
    isValidating: isValidatingTransactions,
    mutate: mutateTransactions,
  } = useSWR([getAllTransactions, transactionParams], fetcher);

  const dataTransaction = fetchTransactions?.allTransactions.map(
    (transaction: TransactionType, index: number) => {
      return {
        key: index + 1,
        id: transaction.id,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        paymentType: transaction.paymentType,
        date: new Date(transaction.date).toISOString().split("T")[0],
        location: transaction.location,
        username: transaction.user.username,
      };
    }
  );
  const transactions: TransactionType[] = fetchTransactions?.allTransactions;

  const renderContent = () => {
    switch (show) {
      case "Transaction":
        return (
          <TableTransaction
            transactions={dataTransaction}
            handleSort={handleSort}
            mutateTransactions={mutateTransactions}
          />
        );
      case "User":
        return <TableUser />;
      case "SumByUser":
        return <SumByUser transactions={transactions} />;
      case "Category":
        return <SumByCategory transactions={transactions} />;
      case "Month":
        return <SumByMonth transactions={transactions} />;
      case "Year":
        return <SumByYear />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };
  return <div className="text-black">Hello from admin page</div>;
};

export default Page;
