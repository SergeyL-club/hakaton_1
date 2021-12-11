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
                con: []
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
                                <Link to={{
                                    pathname: '/NewChat'
                                }}>
                                    <h1>+</h1>
                                </Link>
                    </div>  
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