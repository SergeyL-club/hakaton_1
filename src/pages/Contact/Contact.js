import React, { Component, createRef } from "react";
import classes from './Contact.module.css'
import Vector from './Vector.png'
import Plus from './Plus.png'
import Icon from './Icon.png'
import axios from "../../axios/axios";
import micro from './micro.png'
import { Link, Redirect } from "react-router-dom";

class NewChat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }

    async componentDidMount() {

        let token = localStorage.getItem('token')
        axios.get("/contact/getList", {
            headers: {
                token
            }
        }).then(res => {
            console.log(this.state.contacts);
            this.setState({
                contacts: res.data.data.contacts
            })
            console.log(this.state.contacts);
        }).catch(e => {
            console.log(e);
        })
    }

    render(){
        if(this.state.redirect) return <Redirect to="/personalArea" /> 
        else return(
            <>
                    <div className={classes.Deks}>
                    <div className={classes.Card}>
                        <div className={classes.Card_Info}>
                            <Link to={{
                                pathname: '/personalArea'
                            }}>
                                <img src={Vector} />
                            </Link>
                            <h1>Контакты</h1>
                            <Link to={{
                                pathname: '/NewContact'
                            }}>
                                <img src={Plus} />
                            </Link>
                        </div>
                        <div className={classes.Button_List}>
                            {this.state.contacts.map((item, key) => 
                                <Link to={{
                                    pathname: `/Calls/${item.account.id}`
                                }}>
                                    <div className={classes.CardPeop} key={key}>
                                        <img src={Icon} style={{
                                            maxHeight: '75px'
                                        }}/>
                                        <div key={key} className={classes.InfoPeop}>
                                            <h1>{item.account.nickname}</h1>
                                            <h2>{item.name}</h2>
                                            
                                        </div>
                                        <img src={micro}/>
                                        </div>
                                </Link>
                                    
                                
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewChat