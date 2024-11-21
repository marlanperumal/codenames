"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserContext = {
  name: string;
  setName: (name: string) => void;
};

const UserContext = createContext<UserContext | null>(null);

import { ReactNode } from "react";

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const name = window.localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, []);

  useEffect(() => {
    if (name) {
      window.localStorage.setItem("name", name);
    }
  }, [name]);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
