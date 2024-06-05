"use client";
import { UserContext } from "@/contexts/UserProvider";
import {
  LogoutOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import path from "path";
import React, { useContext, useEffect, useState } from "react";
type MenuItem = Required<MenuProps>["items"][number] & {
  path?: string;
};

const items: MenuItem[] = [
  {
    key: "User",
    label: <Link href="/admin/user">User Management</Link>,
    icon: <UserOutlined />,
    path: "/user",
  },
  {
    key: "Transaction",
    label: <Link href="/admin/transaction">Transaction Management</Link>,
    icon: <TransactionOutlined />,
    path: "/transaction",
  },
  {
    key: "Summary",
    label: "Summary",
    icon: <TransactionOutlined />,
    children: [
      {
        key: "SumByUser",
        label: <Link href="/admin/summaryByUser">User</Link>,
      },
      {
        key: "Category",
        label: <Link href="/admin/summaryByCategory">Category</Link>,
      },
      { key: "Month", label: <Link href="/admin/summaryByMonth">Month</Link> },
      { key: "Year", label: <Link href="/admin/summaryByYear">Year</Link> },
    ],
  },
];

const SideBar = () => {
  const { handleLogout } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathName = usePathname();
  const menuKey = pathName.split("/admin/")[1];
  const menuKeyUpperCase = menuKey?.charAt(0).toUpperCase() + menuKey?.slice(1);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([
    `${menuKeyUpperCase}`,
  ]);

  return (
    <div className="flex justify-center">
      <Layout>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <div className="flex w-full h-[770px] flex-col justify-between items-center">
            <Menu
              items={items}
              // onClick={(e) => {
              //   console.log(e);
              // }}
              defaultSelectedKeys={defaultSelectedKeys}
              defaultOpenKeys={["Summary"]}
              mode="inline"
            />
            <div>
              <Button
                className="w-[200px]"
                size="middle"
                icon={<LogoutOutlined />}
                iconPosition="end"
                type="default"
                onClick={handleLogout}
              >
                {!collapsed && <b>Log Out</b>}
              </Button>
            </div>
          </div>
        </Sider>
      </Layout>
    </div>
  );
};

export default SideBar;
