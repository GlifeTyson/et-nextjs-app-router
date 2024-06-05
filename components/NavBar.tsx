import { UserContext } from "@/contexts/UserProvider";
import React, { useContext } from "react";

const NavBar = () => {
  const { me } = useContext(UserContext);
  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50  mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
          Welcome, {me?.username}
        </p>
        <img
          src={me?.profilePicture}
          className="w-10 h-10 rounded-full border cursor-pointer"
          alt="Avatar"
        />
      </div>
      <div className="relative mb-10 w-1/2 mx-auto hidden md:block">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
    </div>
  );
};

export default NavBar;
