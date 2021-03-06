import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import classes from './Calls.module.css'
import Vector from './Vector.png'
import Plus from './Plus.png'
import Icon from './Icon.png'
import micro from './micro.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Room = (props) => {

    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            console.log(stream);
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            let token = localStorage.getItem('token');
            socketRef.current = io.connect("https://hack.okeit.edu:8181", {
              transports: ["websocket"],
              query: `token=${token}`
            });
            socketRef.current.emit("join room", window.location.pathname);

            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
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

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    };

    return (
        <div className={classes.Deks}>
                <div className={classes.WebCam}>
                <div>
                    <video id="main" ref={userVideo} style={{opacity: 0, position: 'absolute', zIndex: -3}}/> 
                    <video autoPlay id="partner" ref={partnerVideo} style={{
                        maxWidth: 600
                    }}/>
                </div>
                    <div className={classes.Block} style={{
                        minWidth: 600
                    }}>
                        <div className={classes.UpBlock}>
                            <Link to={{
                                pathname: '/Contact'
                            }}>
                                <img src={Vector}/>
                            </Link>
                            
                            <h1>?????????????? ????????????</h1>
                        </div>
                        <div className={classes.Button_List}>
                                
                                <div className={classes.CardPeop}>
                                <div className={classes.Group}>
                                <img src={Icon} style={{
                                    maxHeight: '75px'
                                }}/>
                                <div className={classes.InfoPeop}>
                                    <h1>????????????</h1>
                                    <h2>????????</h2>
                                    
                                </div>
                                
                                </div>
                                <img src={micro}/>
                                </div>
                                
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default Room;