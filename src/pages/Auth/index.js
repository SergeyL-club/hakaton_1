import React, { Component } from "react";
import classes from './Auth.module.css'
import Icon from './Icon.png'
import { Link } from "react-router-dom";

class Auth extends Component{

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
                    <h1>Вход</h1>
                    <p>Ниже введите свои регистрационные данные, чтобы использовать сервис</p>
                    <form>
                        <input placeholder="Никнейм или Email" />
                        <input placeholder="Пароль" type='password' />
                        <div className={classes.Buttons}>
                            <Link to={{
                                pathname: '/RecPas'
                            }}>
                                Забыли пороль?
                            </Link>
                            <button>Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth