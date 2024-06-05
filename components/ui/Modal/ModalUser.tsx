"use client";
import _ from "lodash";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { deleteUser, signup } from "../../../services/user";
import { Input, Modal, Form, Select, Radio } from "antd";

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
}
interface updateUserType {
  username: string;
  email: string;
  role_name: string;
  password: string;
  confirmPassword: string;
}
interface NewUserInput {
  fullName: string;
  username: string;
  email: string;
  role: string;
  password: string;
  gender: string;
}
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
  mode: string;
}

const ModalUser: React.FC<Props> = ({ open, setOpen, user, mode }) => {
  const updateValues = { ...user };
  const [newUser, setNewUser] = useState<NewUserInput>({
    fullName: "",
    username: "",
    email: "",
    role: "",
    password: "",
    gender: "",
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (key: string, value: string) => {
    if (key === "role_name") {
      setNewUser({ ...newUser, role: value });
    } else {
      setNewUser({ ...newUser, [key]: value });
    }
  };
  const handleEdit = ({ id, value }: { id: string; value: updateUserType }) => {
    try {
      console.log("id", id);
      console.log("value", value);
      console.log("updateValues", updateValues);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser({ id: id });
      const { success, message } = res.data.deleteUser;
      if (success) {
        toast.success(message);
        setOpen(false);
      } else {
        toast.error("Something went wrong");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleCreate = async (value: NewUserInput) => {
    try {
      const res = await signup({
        fullName: value.fullName,
        username: value.username,
        password: value.password,
        gender: value.gender,
        email: value.email,
        role: value.role,
      });
      const { success, message } = res.data.data.createUser;
      if (success) {
        toast.success("User created successfully");
        setOpen(false);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        open={open}
        title={
          mode === "Edit"
            ? "Edit User"
            : mode === "Create"
            ? "Create User"
            : mode === "View"
            ? "View User"
            : "Delete User"
        }
        onCancel={() => handleCancel()}
        onOk={
          mode === "Edit" || mode === "Create" || mode === "View"
            ? () => {
                if (mode === "Create") {
                  handleCreate(newUser);
                } else {
                  setOpen(false);
                }
              }
            : () => handleDelete(user.id)
        }
      >
        {mode === "Edit" || mode === "Create" || mode === "View" ? (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={
              mode === "Edit" || mode === "View"
                ? updateValues
                : ({} as UserType)
            }
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                onChange={(e) => handleInputChange("username", e.target.value)}
                disabled={mode === "Edit" || mode === "View" ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your fullName!" },
              ]}
            >
              <Input
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={mode === "Edit" || mode === "View" ? true : false}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={mode === "View" ? true : false}
              />
            </Form.Item>

            {mode !== "View" && (
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: mode !== "Edit",
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long!",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </Form.Item>
            )}

            {mode !== "View" && (
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: mode !== "Edit",
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                />
              </Form.Item>
            )}

            <Form.Item
              label="Role"
              name={["role", "name"]}
              rules={[{ required: true, message: "Please input your role!" }]}
            >
              <Select
                onChange={(value) => handleInputChange("role_name", value)}
                disabled={mode === "Edit" || mode === "View" ? true : false}
                options={[
                  { value: "superadmin", label: "SuperAdmin" },
                  { value: "user", label: "User" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please input your gender!" }]}
            >
              <Radio.Group disabled={mode === "View" ? true : false}>
                <Radio
                  value={"male"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  Male
                </Radio>
                <Radio
                  value={"female"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        ) : (
          <p>Are you sure you want to delete this user?</p>
        )}
      </Modal>
    </>
  );
};

export default ModalUser;
