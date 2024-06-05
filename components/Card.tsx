import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteTransaction } from "../services/transaction";
import { useState } from "react";
import { Modal } from "antd";
import React from "react";
// Add more categories and corresponding color classes as needed
const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ transaction, mutate, mutateStatistics }) => {
  const [showModal, setShowModal] = useState(false);

  let { category, amount, location, date, paymentType, description } =
    transaction;

  const cardClass = categoryColorMap[category];

  // Capitalize the first letter of the description
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const dateFormatted = date.split("T")[0];

  const handleDelete = async (transactionId: string) => {
    try {
      console.log("transactionId", transactionId);
      const res = await deleteTransaction(transactionId);
      const { success, message } = res.data.data.deleteTransaction;
      if (success) {
        mutate();
        mutateStatistics();
        toast.success("Transaction deleted successfully");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  function handleShowModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleConfirmDelete(transactionId) {
    try {
      await handleDelete(transactionId);
      setShowModal(false);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div
      className={`rounded-md w-[300px] flex-shrink-0 p-4 bg-gradient-to-br ${cardClass}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            {/* {!loading && ( */}
            <FaTrash className={"cursor-pointer"} onClick={handleShowModal} />

            <Modal
              title="Confirm Delete"
              open={showModal}
              onOk={() => handleConfirmDelete(transaction.id)}
              onCancel={handleCloseModal}
            >
              <p>Are you sure you want to delete this transaction?</p>
            </Modal>
            <Link to={`/transaction/${transaction.id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{dateFormatted}</p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
