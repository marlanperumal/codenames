"use client";

import {
  createContext,
  Dispatch,
  useContext,
  // useEffect,
  useState,
  // Dispatch,
} from "react";

type UserContext = {
  // name: string;
  // playerId: string;
  // roomCode: string;
  // setName: Dispatch<string>;
  // setPlayerId: Dispatch<string>;
  // setRoomCode: Dispatch<string>;
  dummy: string;
  setDummy: Dispatch<string>;
};

const UserContext = createContext<UserContext | null>(null);

import { ReactNode } from "react";

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [dummy, setDummy] = useState("");
  // const [name, setName] = useState("");
  // const [playerId, setPlayerId] = useState("");
  // const [roomCode, setRoomCode] = useState("");

  // useEffect(() => {
  //   const name = window.localStorage.getItem("name");
  //   if (name) {
  //     setName(name);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (name) {
  //     window.localStorage.setItem("name", name);
  //   }
  // }, [name]);

  // useEffect(() => {
  //   const playerId = window.localStorage.getItem("playerId");
  //   if (playerId) {
  //     setPlayerId(playerId);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (playerId) {
  //     window.localStorage.setItem("playerId", playerId);
  //   }
  // }, [playerId]);

  return (
    <UserContext.Provider
      // value={{ name, playerId, roomCode, setName, setPlayerId, setRoomCode }}
      value={{ dummy, setDummy }}
    >
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
