import React, { Component } from "react";
import classes from './personalArea.module.css'
import { Link, Redirect } from 'react-router-dom'
import axios from "../../axios/axios";
import NewChat from "../NewChat/NewChat";
import { SocketContext } from '../../contexts/socket.context'


class PersonalArea extends Component{
    static contextType = SocketContext
    
    constructor(props){
        super(props);
        
        let token = localStorage.getItem("token");
        if(!token) {
            this.state = {
                redirect: true
            }
        } else {
            this.state = {
                redirect: false,
                chats: [],
                con: [],
                isNewChatForm: false
            }
            this.setCloseFormNewChat = this.setCloseFormNewChat.bind(this);
            this.setChats = this.setChats.bind(this);
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if(token) {
            axios.get("/account/verifyToken", {
                headers: {
                    token
                }
            }).catch(e => {
                localStorage.clear();
                this.setState({
                    redirect: true
                });
            })
            axios.get("/chat/getList", {
                headers: {
                    token
                }
            }).then(res => {
                this.setState({
                    chats: res.data.data.chats
                })
            }).catch(e => {
                console.log(e);
            })
        }
    }

    setCloseFormNewChat() {
        this.setState({
            isNewChatForm: false
        })
    }

    setChats(chats) {
        this.setState({
            chats: chats
        });
    }

    render(){
        if(this.state.redirect) return <Redirect to="/" />
        else return(
            <>
                { this.state.isNewChatForm ? <NewChat setChats={this.setChats} setClose={this.setCloseFormNewChat} /> : null }
                <div className={classes.PersonalArea}>
                    {this.state.chats.length > 0 ? (
                    <div className={classes.Contacts}>
                        <div className={classes.NewChat}>
                            <button onClick={() => this.setState({ isNewChatForm: !this.state.isNewChatForm })}>Добавить чат</button>
                            </div>
                    {this.state.chats.map((item, key) => 
                        <Link key={key}
                        to='/Auth'>
                            <div className={classes.Contact}>
                                <h1>{item.name}</h1>
                            </div> 
                        </Link>  
                    )}
                </div>) : (
                    <div className={classes.ContactsNot}>
                        <h1>Жаль, но чатов нет. <br/> НОООО - вы можете его создать :)</h1>
                        <div className={classes.NewChat}>
                            <button onClick={() => this.setState({ isNewChatForm: !this.state.isNewChatForm })}>Добавить чат</button>
                        </div>  
                    </div>
                    
                        
                )}
                <div className={classes.Block_message}>
                        <h1>Выбирите человека</h1>
                </div>
                </div>
            </>
        )
    }
}

export default PersonalArea