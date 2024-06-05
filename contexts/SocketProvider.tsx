"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { me, isLoading } = useContext(UserContext);

  useEffect(() => {
    let newSocket: Socket | null = null;

    if (me && !isLoading) {
      newSocket = io("http://localhost:3001", {
        query: { userId: me.id },
      });

      newSocket.on("connect", () => {
        console.log("Front end Connected to WS");
      });

      setSocket(newSocket);
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [me, isLoading]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
