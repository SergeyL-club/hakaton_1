import React, { Component, createRef } from "react";
import classes from './Auth.module.css'
import Icon from './Icon.png'
import { Link, Redirect } from "react-router-dom";
import { auth } from '../../utils/auth';

class Auth extends Component{

    constructor(props) {
        super(props);
        this.form = createRef();
        let token = localStorage.getItem("token");
        if(token) {
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
        document.title="Регистрация"
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            input.oninput = () => {
                input.style.border = '1px solid #717DF0'
            }
        }
    }

    authForm () {
        let nickname = this.form.current.nickname.value.trim();
        let password = this.form.current.password.value.trim();
        
        auth(nickname, password, (isAuth) => {
            this.setState({
                redirect: isAuth
            });
        });
    }

    render(){

        if(this.state.redirect) return <Redirect to="/personalArea" />
        else return(
            <div className={classes.Deks}>
                <div className={classes.Form}>
                    <img src={Icon} />
                    <h1>Вход</h1>
                    <p>Ниже введите свои регистрационные данные, чтобы использовать сервис</p>
                    <form ref={this.form}>
                        <input placeholder="Никнейм или Email" name="nickname"/>
                        <input placeholder="Пароль" type='password' name="password"/>
                        <div className={classes.Buttons}>
                            <Link to={{
                                pathname: '/RecPas'
                            }}>
                                Забыли пороль?
                            </Link>
                            <button type="button" onClick={() => this.authForm()}>Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default Auth