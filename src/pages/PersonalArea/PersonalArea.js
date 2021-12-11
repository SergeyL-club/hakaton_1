import React, { Component } from "react";
import classes from './personalArea.module.css'
import { Link, Redirect } from 'react-router-dom'
import { verify } from "../../utils/auth";
import axios from "../../axios/axios";
import NewChat from "../NewChat/NewChat";


class PersonalArea extends Component{
    constructor(props){
        super(props);
        
        let token = localStorage.getItem("token"); 
        if(!token || !(verify(token, (isAuth) => { return isAuth }))) {
            this.state = {
                redirect: true
            }
        } else {
            this.state = {
                chats: [],
                con: [],
                isNewChatForm: false
            }
            this.setCloseFormNewChat = this.setCloseFormNewChat.bind(this);
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if(token) {
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

    render(){
        if(this.state.redirect) return <Redirect to="/" />
        else return(
            <>
                { this.state.isNewChatForm ? <NewChat setClose={this.setCloseFormNewChat} /> : null }
                <div className={classes.PersonalArea}>
                    {this.state.con.length > 0 ? (
                    <div className={classes.Contacts}>
                        <div className={classes.NewChat}>
                                    <Link to={{
                                        pathname: '/NewChat'
                                    }}>
                                        +
                                    </Link>
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