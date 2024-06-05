"use client";

import React, { useState, useEffect, createContext } from "react";
import Auth from "../utils/auth";
import useSWR from "swr";
import { fetchMe } from "../graphql/queries/user.queries";
import { fetcher } from "../services/fetcher";
interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
  role: {
    name: string;
  };
}
interface UserContextType {
  me: User | null;
  handleLogout: () => void;
  mutate: () => void;
  isLoading: boolean;
}
const defaultContextValue: UserContextType = {
  me: null,
  handleLogout: () => {},
  mutate: () => {},
  isLoading: true,
};
const UserContext = createContext<UserContextType>(defaultContextValue);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data, error, isValidating, mutate } = useSWR([fetchMe, {}], fetcher);

  useEffect(() => {
    if (!isValidating) {
      if (error) {
        setMe(null);
        setIsLoading(false);
      } else {
        const { Me } = data || {};
        if (Me) {
          setMe(Me);
        }
        setIsLoading(false);
      }
    }
  }, [data, error, isValidating]);

  function handleLogout() {
    const response = Auth.logout();
    if (response) {
      window.location.href = "/login";
    } else {
    }
  }

  return (
    <UserContext.Provider
      value={{
        me,
        handleLogout,
        mutate,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const UserConsumer = UserContext.Consumer;

export default UserProvider;
export { UserConsumer, UserContext };
