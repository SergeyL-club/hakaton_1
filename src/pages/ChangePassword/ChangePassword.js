import React, { Component } from "react";
import classes from './ChangePassword.module.css'
import Icon from './Icon.png'
import { Redirect } from "react-router-dom";

class ChangePassword extends Component{

    constructor(props) {
        super(props);
        
        let token = localStorage.getItem("token");
        if(!token) {
          this.state = {
            redirect: true
          }
        } else {
          this.state = {
            redirect: false
          }
        }
      }

    componentDidMount(){
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            input.oninput = () => {
                input.style.border = '1px solid #717DF0'
            }
        }
    }

    render(){
        if(this.state.redirect) return <Redirect to="/" />
        else return(
            <div className={classes.Deks}>
                <div className={classes.Form}>
                    <img src={Icon} alt="icon" />
                    <h1>Смена пороля</h1>
                    <form>
                        <input placeholder="Введите новый пароль" type='password' />
                        <input placeholder="Повторите новый пароль" type='password' />
                        <div className={classes.Buttons}>
                            <button>Созранить</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChangePassword