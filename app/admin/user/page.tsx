"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Socket } from "socket.io-client";
import { SocketContext } from "@/contexts/SocketProvider";
import { fetcher } from "@/services/fetcher";
import { fetchAllUser } from "@/graphql/queries/user.queries";
import useSWR from "swr";
import ModalFilter from "@/components/ui/Modal/ModalFilter";
import ModalUser from "@/components/ui/Modal/ModalUser";

interface UserType {
  key: React.Key;
  id: string;
  username: string;
  role: {
    name: string;
  };
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
}

interface TableUserProps {
  users: UserType[];
}
type SocketContextType = {
  socket: Socket | null;
};
const TableUser: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("Edit");
  const [selectedUser, setSelectedUser] = useState<UserType>({} as UserType);
  const [pageSize, setPageSize] = useState<number>(5); // Default page size
  const [currentPage, setCurrentPage] = useState<number>(1); // Default current page
  const [users, setUsers] = useState<UserType[]>([]);
  const dataUserRef = useRef<UserType[]>([]);

  const { socket } = useContext(SocketContext) as SocketContextType;

  const params = {
    filter: {},
    first: 20,
    skip: 0,
    orderBy: "createdAt_DESC",
    include: "role",
  };
  const {
    data: fetchUsers,
    isLoading,
    isValidating,
    mutate,
  } = useSWR([fetchAllUser, params], fetcher, {});

  let dataUser = fetchUsers?.allUsers.map((user: UserType, index: number) => {
    return {
      ...user,
      key: index + 1,
    };
  });
  useEffect(() => {
    if (fetchUsers) {
      const usersWithKeys = fetchUsers.allUsers.map(
        (user: UserType, index: number) => ({
          ...user,
          key: index + 1,
        })
      );
      setUsers(usersWithKeys);
      dataUserRef.current = usersWithKeys;
    }
  }, [fetchUsers]);
  useEffect(() => {
    socket?.on("user-update", (event) => {
      if (event.type === "delete") {
        setUsers((prevData) => {
          const updatedData = prevData.filter(
            (user: UserType) => user.id !== event.userId
          );
          dataUserRef.current = updatedData;
          return updatedData;
        });
      } else if (event.type === "create") {
        const newUser = { ...event.user, key: dataUserRef.current.length + 1 };
        setUsers((prevData) => {
          const updatedData = [...prevData, newUser];
          dataUserRef.current = updatedData;
          return updatedData;
        });
        console.log("newUser", newUser);
      }
    });
    return () => {
      socket?.off("user-update");
    };
  }, [dataUser, users, socket]);
  const handleTableChange = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const calculateRange = () => {
    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, dataUser?.length);
    return { from, to };
  };
  const { from, to } = calculateRange();

  const userColumns: TableColumnsType<UserType> = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Role", dataIndex: ["role", "name"], key: "role.name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Operation",
      dataIndex: "Operation",
      render: (_: any, record: UserType) => {
        return (
          <div className="flex flex-col lg:flex-row lg:justify-evenly lg:items-center">
            <div className="flex justify-center gap-x-4 py-2">
              <Typography.Link
                onClick={() => {
                  setOpenModal(true);
                  setMode("Edit");
                  setSelectedUser(record);
                }}
              >
                Edit
              </Typography.Link>
              <Typography.Link
                onClick={() => {
                  setOpenModal(true);
                  setMode("Delete");
                  setSelectedUser(record);
                }}
              >
                Delete
              </Typography.Link>
            </div>

            <div className="mx-auto">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => {
                  setOpenModal(true);
                  setSelectedUser(record);
                  setMode("View");
                }}
              >
                View Profile
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        className="overflow-x-auto container"
        size="large"
        title={() => (
          <div className="flex justify-between w-full">
            <span>All User</span>
            <div className="flex justify-center items-center gap-5">
              <ModalFilter
                openSearchModal={openSearchModal}
                setOpenSearchModal={setOpenSearchModal}
              />
              <Button
                type="default"
                icon={<SearchOutlined />}
                onClick={() => {
                  // Implement search functionality
                  setOpenSearchModal(true);
                }}
              />

              <Button
                type="primary"
                onClick={() => {
                  setOpenModal(true);
                  setMode("Create");
                }}
              >
                Add User
              </Button>
            </div>
          </div>
        )}
        footer={() => `From: ${from} to ${to}  of ${dataUser?.length}`}
        bordered={true}
        columns={userColumns}
        dataSource={dataUserRef.current as UserType[]}
        pagination={{
          className: "w-full",
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            handleTableChange({ current: page, pageSize: pageSize });
          },
          total: dataUser?.length,
        }}
        tableLayout="auto"
      />
      <ModalUser
        mode={mode}
        user={selectedUser}
        setOpen={setOpenModal}
        open={openModal}
      />
    </>
  );
};

export default TableUser;
