import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SocketProvider } from './contexts/socket.context'
import "../src/axios/axios"

ReactDOM.render(
  <SocketProvider>
    <App />,
  </SocketProvider>,
  document.getElementById('root')
)