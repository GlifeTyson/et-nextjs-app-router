"use client";

import { useContext, useState } from "react";
import InputField from "@/components/InputField";
import toast from "react-hot-toast";
import Auth from "@/utils/auth";
import { login } from "@/services/user";
import React from "react";
import Link from "next/link";
import { UserContext } from "@/contexts/UserProvider";
const LoginPage = () => {
  const { me, isLoading } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password)
      return toast.error("Please fill in all fields");

    try {
      const res = await login({
        username: loginData.username,
        password: loginData.password,
      });

      const { success, token } = res.data.data.login;
      if (success) {
        Auth.login(token);
        if (Auth.check()) {
          setTimeout((_: any) => {
            location.href = "/admin";
          }, 100);
        } else {
          toast.error("An error occurred during execution");
        }
      } else {
        toast.error(res.data.data.login.message);
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
        <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Admin Login
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Welcome back! Log in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300
										disabled:opacity-50 disabled:cursor-not-allowed
									"
                  // disabled={loading}
                >
                  Login
                  {/* {loading ? "Loading..." : "Login"} */}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {"Don't"} have an account?{" "}
                <Link href="/signup" className="text-black hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
