"use client";
import { UserContext } from "@/contexts/UserProvider";
import React, { useContext } from "react";
import LoginPage from "./Login";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { me, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (
    (!me && !isLoading) ||
    (me && me.role.name !== "superadmin" && !isLoading)
  ) {
    return <LoginPage />;
  }
  return (
    <div className="bg-white w-full h-screen p-10">
      <NavBar />
      <div className="flex gap-5">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
