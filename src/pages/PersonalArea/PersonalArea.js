import React, { Component } from "react";
import classes from './personalArea.module.css'
import { Link, Redirect } from 'react-router-dom'
import axios from "../../axios/axios";
import menu from './menu.png';
import Icon from './Icon.png'


class PersonalArea extends Component{
    
    constructor(props){
        super(props);
        
        let token = localStorage.getItem("token");
        if(!token) {
            this.state = {
                redirect: true,
                chats: [],
                con: [],
                isNewChatForm: false,
                block: 'none'
            }
        } else {
            this.state = {
                redirect: false,
                chats: [],
                con: [],
                isNewChatForm: false,
                block: 'none'
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
                if(res.data.data.chats) this.setState({
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

    clearToken(){
        localStorage.clear('token')
    }

    render(){
        if(this.state.redirect) return <Redirect to="/"/>
        else return(
            <>
                {/* { this.state.isNewChatForm ? <NewChat setChats={this.setChats} setClose={this.setCloseFormNewChat} /> : null } */}
                <div className={classes.Deks}>
                    <div className={classes.Card}>
                        <div className={classes.Card_Info}>
                            <div className={classes.Left_Block}>
                                <img src={Icon}/>
                            </div>
                            <div className={classes.Right_Block}>
                                <h1>{localStorage.getItem('nickname')}</h1>
                                <h2>{localStorage.getItem('email')}</h2>
                            </div>
                        </div>
                        <div className={classes.Button_List}>
                            <button style={{
                                borderTopRightRadius: '8px',
                                borderTopLeftRadius: '8px'
                            }}> <Link 
                            style={{
                                borderTopRightRadius: '8px',
                                borderTopLeftRadius: '8px'
                            }}
                            
                            to={{
                                pathname: '/Contact'
                            }}> 
                            
                            Контакты </Link> </button>
                            <button> Настройки </button>
                            <button style={{
                                borderBottomRightRadius: '8px',
                                borderBottomLeftRadius: '8px'
                            }}> Выйти </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PersonalArea