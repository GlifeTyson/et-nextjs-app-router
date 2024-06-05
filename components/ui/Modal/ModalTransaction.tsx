"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  DatePicker,
  Form,
  Flex,
  Typography,
  Select,
} from "antd";
import type { FormProps } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import {
  deleteTransaction,
  updateTransaction,
} from "../../../services/transaction";
import toast from "react-hot-toast";

interface TransactionType {
  key: React.Key;
  id: string;
  amount: number;
  category: string;
  description: string;
  paymentType: string;
  date: string;
  location: string;
  user: {
    username: string;
  };
}
interface updateTransactionType {
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: TransactionType;
  mutateTransactions: () => void;
  mode: string;
}
const ModalTransaction: React.FC<Props> = ({
  open,
  setOpen,
  transaction,
  mutateTransactions,
  mode,
}) => {
  console.log("transaction", transaction);
  const updateValues = { ...transaction };

  const handleOk = async ({
    id,
    value,
  }: {
    id: string;
    value: updateTransactionType;
  }) => {
    const omitValue = _.omit(value, ["key", "id", "username"]);
    const updatedValue: updateTransactionType = {
      ...omitValue,
      description: omitValue.description || "", // Provide default value if undefined
      amount: omitValue.amount || 0,
      category: omitValue.category || "",
      paymentType: omitValue.paymentType || "",
      date: omitValue.date || "",
      location: omitValue.location || "",
    };

    try {
      const res = await updateTransaction({
        id: transaction.id,
        input: updatedValue,
      });
      const { data, errors } = res.data;
      if (errors) {
        const { message } = errors[0];
        toast.error(message);
      } else {
        toast.success("Transaction updated successfully");
        mutateTransactions();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTransaction(id);
      const { errors } = res.data;
      if (errors) {
        toast.error(errors[0].message);
      } else {
        toast.success("Transaction deleted successfully");
        mutateTransactions();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const dateFormat = "YYYY/MM/DD";
  const categories: string[] = ["expense", "saving", "investment"];
  const paymentTypes: string[] = ["card", "cash"];
  const handleInputChange = (fieldName: string, value: string) => {
    // updateValues[fieldName] = value;
  };
  const handleDateChange = (dateString: string) => {};

  return (
    <>
      {(mode as string) === "Edit" ? (
        <Modal
          title="Edit Transaction"
          open={open}
          onOk={() => handleOk({ id: transaction.id, value: updateValues })}
          onCancel={handleCancel}
        >
          <Flex vertical>
            <div>
              <Typography.Title level={5}>
                Id: {transaction.id}
              </Typography.Title>
            </div>
            <div>
              <Typography.Title level={5}>category</Typography.Title>
              <Select
                defaultValue={transaction.category}
                style={{ width: "100%" }}
                options={categories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                onChange={(e) => handleInputChange("category", e)}
              />
            </div>
            <div>
              <Typography.Title level={5}>Amount</Typography.Title>
              <Input
                defaultValue={transaction.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>
            <div>
              <Typography.Title level={5}>Payment type</Typography.Title>
              <Select
                defaultValue={transaction.paymentType}
                style={{ width: "100%" }}
                options={paymentTypes.map((paymentType) => ({
                  value: paymentType,
                  label: paymentType,
                }))}
                onChange={(e) => handleInputChange("paymentType", e)}
              />
            </div>
            <div>
              <Typography.Title level={5}>Location</Typography.Title>
              <Input
                defaultValue={transaction.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div>
              <Typography.Title level={5}>Description</Typography.Title>
              <Input
                defaultValue={transaction.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div>
              <Typography.Title level={5}>Date</Typography.Title>
              <DatePicker
                format={dateFormat}
                defaultValue={dayjs(transaction?.date, dateFormat)}
                onChange={(date, dateString) =>
                  handleDateChange(dateString as string)
                }
              />
            </div>
          </Flex>
        </Modal>
      ) : (
        <Modal
          title="Delete transaction"
          open={open}
          onOk={() => handleDelete(transaction.id)}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete this transaction?</p>
        </Modal>
      )}
    </>
  );
};

export default ModalTransaction;
