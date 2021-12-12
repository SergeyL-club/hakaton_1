import { createContext } from 'react'
import { io } from 'socket.io-client'

let token = "$2b$04$ewh8AgavA/DCsKY0JsyBn.UHMBs22d9wg7FV3Y/dJBjsYS/lcJSFe";
const socket =  io("https://192.168.107.126:8181", {
  transports: ["websocket"],
  query: `token=${token}`
});

export const SocketContext = createContext({ socket })

export const SocketProvider = (props) => {
  return <SocketContext.Provider value={{ socket }}  {...props}/>
}