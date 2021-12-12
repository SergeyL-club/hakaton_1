import React, { createContext } from 'react'
import { io } from 'socket.io-client'


let token = localStorage.getItem("token");

const socket = io("http://192.168.107.126:8181", {
  transports: ["websocket"],
  query: `token=${token}`
});

socket.emit("connection", { token });

export const SocketContext = createContext({
  socket
});

export const SocketProvider = (props) => {
  return <SocketContext.Provider value={{ socket }}  {...props}/>
}