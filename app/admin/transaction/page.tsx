"use client";
import React, { useContext, useEffect, useState } from "react";
import { Flex, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import ModalTransaction from "@/components/ui/Modal/ModalTransaction";
import { TransactionContext } from "@/contexts/TransactionProvider";

interface Transaction {
  key: React.Key;
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

interface TableTransactionProps {
  handleSort: (key: string) => void;
  mutateTransactions: () => void;
}

const TableTransaction = ({
  // transactions,
  handleSort,
  mutateTransactions,
}: TableTransactionProps) => {
  const [editing, setEditting] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("Edit");
  const [pageSize, setPageSize] = useState<number>(5); // Default page size
  const { transactions } = useContext(TransactionContext);
  const [currentPage, setCurrentPage] = useState<number>(1); // Default current page
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const handleTableChange = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const calculateRange = () => {
    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, transactions?.length);
    return { from, to };
  };
  const { from, to } = calculateRange();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(
    {} as Transaction
  );
  const dataParsing = transactions?.map((transaction: any, index: number) => {
    return { ...transaction, key: index + 1 };
  });
  console.log("dataParsing", dataParsing);

  const transactionColumn: TableColumnsType<Transaction> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      responsive: ["lg"],
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "9%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      width: "9%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "10%",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("date"),
      }),
      responsive: ["lg"],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Amount($)",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      showSorterTooltip: { target: "full-header" },
      sortDirections: ["ascend", "descend"],
      onHeaderCell: () => ({
        onClick: () => handleSort("amount"),
      }),
      width: "8%",
    },

    {
      title: "Operation",
      dataIndex: "Operation",
      render: (_: any, record: Transaction) => {
        return (
          <div className="flex flex-col gap-y-2 lg:flex-row lg:justify-evenly">
            {editing && (
              <ModalTransaction
                open={editing}
                setOpen={setEditting}
                transaction={selectedTransaction}
                mutateTransactions={mutateTransactions}
                mode={mode}
              />
            )}
            {openModalDelete && (
              <ModalTransaction
                open={openModalDelete}
                setOpen={setOpenModalDelete}
                transaction={selectedTransaction}
                mutateTransactions={mutateTransactions}
                mode={mode}
              />
            )}

            <Typography.Link
              onClick={() => {
                setEditting(true);
                setMode("Edit");
                setSelectedTransaction(record);
              }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                setOpenModalDelete(true);
                setMode("Delete");
                setSelectedTransaction(record);
              }}
            >
              Delete
            </Typography.Link>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      className="overflow-x-auto container"
      title={() => "All Transaction"}
      footer={() => `From: ${from} to ${to} of ${transactions?.length}`}
      size="large"
      bordered={true}
      columns={transactionColumn}
      dataSource={dataParsing}
      pagination={{
        pageSize: pageSize,
        current: currentPage,
        showSizeChanger: false,
        size: "default",

        onChange(page, pageSize) {
          handleTableChange({ current: page, pageSize: pageSize });
        },
        total: transactions?.length,
      }}
      tableLayout="auto"
    />
  );
};
export default TableTransaction;
