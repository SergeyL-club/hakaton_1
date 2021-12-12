import React, { Component } from "react";
import classes from './personalArea.module.css'
import { Link, Redirect } from 'react-router-dom'
import axios from "../../axios/axios";
import NewChat from "../NewChat/NewChat";
import { SocketContext } from '../../contexts/socket.context'
import menu from './menu.png'


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
                this.setState({
                    chats: res.data.data.chats
                })
            }).catch(e => {
                console.log(e);
            })
        }

        document.querySelector('#menu').addEventListener('click', () => {
            this.setState({block: (this.state.block === 'block') ? "none" : "block"});
        });
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
         return(
            <>
                { this.state.isNewChatForm ? <NewChat setChats={this.setChats} setClose={this.setCloseFormNewChat} /> : null }
                <div className={classes.PersonalArea}>
                    {this.state.chats.length > 0 ? (
                    <div className={classes.Contacts} id="contacts">
                        <div className={classes.menuCont} style={{display: `${this.state.block}`}}>
                            <button onClick={() => this.setState({ isNewChatForm: !this.state.isNewChatForm })}>Добавить чат</button>
                            <button>Список друзей</button>
                            <button>Настройка аккаунта</button>
                            <button>Выйти из аккаунта</button>
                        </div>
                        <div className={classes.Up_Block}>
                            <img src={menu} id="menu"/>
                            <input value='Поиск' />
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
                    <div className={classes.Contacts} id="contacts">
                        <div className={classes.menuCont} style={{display: `${this.state.block}`}}>
                            <button onClick={() => this.setState({ isNewChatForm: !this.state.isNewChatForm })}>Добавить чат</button>
                            <button>Список друзей</button>
                            <button>Настройка аккаунта</button>
                            <button>Выйти из аккаунта</button>
                        </div>
                        <div className={classes.Up_Block}>
                            <img src={menu} id="menu"/>
                            <input placeholder="Поиск"/>
                        </div>
                        <h1 style={{marginTop: '25px'}}>Жаль, но чатов нет. <br/> НОООО - вы можете его создать :)</h1>
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