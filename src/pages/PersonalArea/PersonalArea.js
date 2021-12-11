import React, { Component } from "react";
import classes from './personalArea.module.css'
import { Link, Redirect } from 'react-router-dom'
import { verify } from "../../utils/auth";
import axios from "../../axios/axios";


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
            }
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

    render(){
        if(this.state.redirect) return <Redirect to="/" />
        else return(
            <div className={classes.PersonalArea}>
                {this.state.chats.length > 0 ? (
                   <div className={classes.Contacts}>
                   {this.state.chats.map((item, key) => 
                       <Link key={key}
                       to='/Auth'>
                           <div className={classes.Contact}>
                               <h1>{item.name}</h1>
                           </div> 
                       </Link>  
                   )}
              </div>) : (
                  <div className={classes.Contacts}>
                      <h1>Чатов нету :(</h1>
                    </div>
              )}
               <div className={classes.Block_message}>
                    <h1>Выбирите человека</h1>
               </div>
            </div>
        )
    }
}

export default PersonalArea