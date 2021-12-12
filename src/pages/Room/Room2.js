import React, { Component } from 'react'
import { io } from 'socket.io-client'

export default class Room2 extends Component {

  constructor(props){
    super(props);
    this.stream = React.createRef();
    this.audio = React.createRef();
    this.socket = React.createRef();
    this.otherUser = React.createRef();
    this.peerRef = React.createRef();
    this.partnerAudio = React.createRef();
  }

  componentDidMount(){
    navigator.mediaDevices.getUserMedia({vide: true, audio: true}).then(stream => {
      this.stream.current = stream;
      this.audio.current.srcObject = this.stream.current;
      let token = "$2b$04$eaNJXVb5sSLuR5uIT5BWgOx/kAX0EEY6TQZtBLbai8f15tBHx7lPO";
      this.socket.current =  io.connect("https://192.168.107.126:8181", {
        transports: ["websocket"],
        query: `token=${token}`
      });      
      this.socket.current.emit("join room", 1);
      this.socket.current.on("join room", msg => {
        console.log(msg);
      });
      this.socket.current.on("other user", (userID) => {
        this.callUser(userID);
        this.otherUser.current = userID;
      });
      this.socket.current.on("offer", this.handleRecieveCall);

      this.socket.current.on("answer", this.handleAnswer);

      this.socket.current.on("ice-candidate", this.handleNewICECandidateMsg);
    });
  }

  callUser(userID) {
    this.peerRef.current = this.createPeer(userID);
    this.stream.current.getTracks().forEach(track => {
      this.peerRef.current.addTrack(track, this.stream.current);
    });
  }

  createPeer(userID){
    const peer = new RTCPeerConnection({
      iceServers: [
          {
              urls: "stun:stun.stunprotocol.org"
          },
          {
              urls: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com'
          },
      ]
    });

    peer.onicecandidate = this.handleICECandidateEvent;
    peer.ontrack = this.handleTrackEvent;
    peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(userID);

    return peer;
  }

  handleICECandidateEvent(userID){
      this.peerRef.current.createOffer().then(offer => {
        return this.peerRef.current.setLocalDescription(offer);
      }).then(() => {
        const payload = {
            target: userID,
            caller: this.socket.current.id,
            sdp: this.peerRef.current.localDescription
        };
        this.socket.current.emit("offer", payload);
    }).catch(e => console.log(e));
  }

  handleTrackEvent(e){
    this.partnerVideo.current.srcObject = e.streams[0];
  }

  handleNegotiationNeededEvent(){

  }

  handleRecieveCall(incoming) {
    this.peerRef.current = this.createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    this.peerRef.current.setRemoteDescription(desc).then(() => {
        this.stream.current.getTracks().forEach(track => this.peerRef.current.addTrack(track, this.stream.current));
    }).then(() => {
        return this.peerRef.current.createAnswer();
    }).then(answer => {
        return this.peerRef.current.setLocalDescription(answer);
    }).then(() => {
        const payload = {
            target: incoming.caller,
            caller: this.socket.current.id,
            sdp: this.peerRef.current.localDescription
        }
        this.socket.current.emit("answer", payload);
    })
  }
  
  handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    this.peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
  }

  handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    this.peerRef.current.addIceCandidate(candidate)
        .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.audio.current.play()}>Start</button>
        <button onClick={() => this.audio.current.pause()}>Pause</button>
        ----------------------------------------------------------------
        <button onClick={() => this.partnerAudio.current.play()}>Start</button>
        <button onClick={() => this.partnerAudio.current.pause()}>Pause</button>
        <audio ref={this.audio} />
        <audio ref={this.partnerAudio} />
      </div>
    )
  }
}
