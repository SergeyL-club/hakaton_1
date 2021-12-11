import React, { Component } from "react";
import classes from './RecoveryPassword.module.css'
import Icon from './Icon.png'
import { Link } from "react-router-dom";

class RecoveryPassword extends Component{

    componentDidMount(){
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            input.oninput = () => {
                input.style.border = '1px solid #717DF0'
            }
        }
    }

    render(){
        return(
            <div className={classes.Deks}>
                <div className={classes.Form}>
                    <img src={Icon} />
                    <h1>Восстановление пароля</h1>
                    <p>Ниже, введите свой адрес эл. почты или никнейм, на него Вам придёт ссылка на восстановление пароля</p>
                    <form>
                        <input placeholder="Никнейм или Email" type='text' />
                        <div className={classes.Buttons}>
                            <button>Отправить</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RecoveryPassword