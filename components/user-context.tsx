"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";

type UserContext = {
  name: string;
  roomCode: string;
  setName: Dispatch<string>;
  setRoomCode: Dispatch<string>;
};

const UserContext = createContext<UserContext | null>(null);

import { ReactNode } from "react";

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");

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
    <UserContext.Provider value={{ name, roomCode, setName, setRoomCode }}>
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
