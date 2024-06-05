"use client";
import { Form, Input, Modal, Select } from "antd";
import React from "react";
interface Props {
  openSearchModal: boolean;
  setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalFilter = ({ openSearchModal, setOpenSearchModal }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    console.log("values", typeof values);
    // form.resetFields();
    // setOpenSearchModal(false);
  };

  return (
    <>
      <Modal
        title="Filter User"
        open={openSearchModal}
        onCancel={() => setOpenSearchModal(false)}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: false, message: "Please input your username!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: false,
                message: "Email is invalid!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: false, message: "Please input your Role!" }]}
          >
            <Select
              options={[
                { value: "superadmin", label: "SuperAdmin" },
                { value: "user", label: "User" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalFilter;
