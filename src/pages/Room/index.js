import React, { Component } from 'react'
import { io } from 'socket.io-client'

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.stream = React.createRef();
    this.socket = React.createRef();
    this.peerRef = React.createRef();
    this.otherUser = React.createRef();
  }


  componentDidMount(){
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.stream.current = stream;
      
      this.socket.current = io("http://192.168.107.126:8181");
      this.socket.current.emit("join room", window.location.pathname);
      this.socket.current.on("other user", userID => {
        this.callUser(userID);
        this.otherUser.current = userID;
      })
      this.socket.current.on("user join", userID => {
        this.otherUser.current = userID;
      })

      this.socket.current.on("ofter", this.handleRecieveCall);

      this.socket.current.on("answer", this.handleAnswer);

      this.socket.current.on("ice-candidate", this.handleNewICECandidateMsg);
    });
  }

  callUser(userID){
    this.peerRef.current = this.createPeer(userID);
    this.stream.current.getTracks().forEach(track => {
      this.preeRef.current.addTrack(track, this.stream.current);      
    });
  }
  createPeer(userID){
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org"
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazh",
          username: "webrtc@live.com"
        }
      ]
    });
    peer.onicecandidate = this.handleICECandidateEvent;
    peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(userID);

    return peer;
  }

  handleNegotiationNeededEvent(userID) {
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

  handleICECandidateEvent(e) {
    if (e.candidate) {
        const payload = {
            target: this.otherUser.current,
            candidate: e.candidate,
        }
        this.socket.current.emit("ice-candidate", payload);
    } 
  }

  handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    this.peerRef.current.addIceCandidate(candidate)
        .catch(e => console.log(e));
  }


  render() {

    
    return (
        <div>
          <audio autoPlay ref={this.stream}/>
        </div>
    )
  }
}