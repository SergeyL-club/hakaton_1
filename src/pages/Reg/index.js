import React, { Component } from "react";
import classes from './Reg.module.css'
import Icon from "./Icon.png"
import { Link } from "react-router-dom";

class Reg extends Component{

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
                    <h1>Создание аккаунта</h1>
                    <p>Ниже введите свои регистрационные данные, чтобы использовать сервис</p>
                    <form>
                        <input placeholder="Имя" />
                        <input placeholder="Фамилия" />
                        <input placeholder="Email" />
                        <input placeholder="Пароль" type='password' />
                        <div className={classes.Buttons}>
                            <Link to={{
                                pathname: '/Auth'
                            }}>
                                У меня уже есть аккаунта
                            </Link>
                            <button>Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Reg