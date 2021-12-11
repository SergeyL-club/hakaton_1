import React, { Component } from "react";
import classes from './ConfirmRecPas.module.css'
import Icon from './Icon.png'
import { Redirect } from "react-router-dom";
import axios from "../../axios/axios";

class ConfirmRecPas extends Component{

    constructor(props) {
        super(props);
        
        let token = localStorage.getItem("token");
        if(token) {
            this.state = {
                redirect: true
            }
        } else {
            this.state = {
                redirect: false,
                redirectAuth: false
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

    ConfirmRecPas() {
        let code = document.querySelector('#code').value
        let password = document.querySelector('#password').value
        axios.get(`/account/changePassword`, {
            params: {
                code, password
            }
        })
        .then((res) => {
            if(res.status === 200){
                console.log('Дада');
                localStorage.clear();
                this.setState({
                    redirectAuth: true
                });
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    render(){
        if(this.state.redirectAuth) return <Redirect to="/auth" />
        if(this.state.redirect) return <Redirect to="/personalArea" />
        else return(
            <div className={classes.Deks}>
                <div className={classes.Form}>
                    <img src={Icon} alt="icon" />
                    <h1>Восстановление пароля</h1>
                    <p>Ниже, введите свой адрес эл. почты или никнейм, на него Вам придёт ссылка на восстановление пароля</p>
                    <form>
                        <input placeholder="Введите код, который вам пришел" type='text' id="code"/>
                        <input placeholder="Введите новый пароль" type='password' id="password"/>
                        <div className={classes.Buttons}>
                            <button type="button" onClick={() => this.ConfirmRecPas()}>Сменить</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ConfirmRecPas