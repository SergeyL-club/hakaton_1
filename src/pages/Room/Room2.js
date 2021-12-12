import React, { Component } from 'react'
import { io } from 'socket.io-client'

export default class Room2 extends Component {

  constructor(props){
    super(props);
    this.stream = React.createRef();
    this.Recorder = React.createRef();
    this.audio = React.createRef();
    this.socket = React.createRef();
  }

  componentDidMount(){
    navigator.mediaDevices.getUserMedia({vide: true, audio: true}).then(stream => {
      this.stream.current = stream;
      this.audio.current.srcObject = this.stream.current;
      
      let token = "$2b$04$ewh8AgavA/DCsKY0JsyBn.UHMBs22d9wg7FV3Y/dJBjsYS/lcJSFe";
      this.socket.current = io("https://192.168.107.126:8181", {
        transports: ["websocket"],
        query: `token=${token}`
      });
      this.socket.current.emit("join room", 1);
    });
  }


  render() {
    return (
      <div>
        <button onClick={() => this.audio.current.play()}>Start</button>
        <button onClick={() => this.audio.current.pause()}>Pause</button>
        <audio ref={this.audio} />
      </div>
    )
  }
}
