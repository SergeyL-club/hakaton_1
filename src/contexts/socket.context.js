import React, { createContext } from 'react'
import { io } from 'socket.io-client'


const socket = io("http://localhost:4000", {
  transports: ["websocket"]
});

export const SocketContext = createContext({
  socket
});

export const SocketProvider = (props) => {
  return <SocketContext.Provider value={{ socket }}  {...props}/>
}