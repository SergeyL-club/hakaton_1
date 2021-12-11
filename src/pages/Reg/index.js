import React, { Component, createRef } from "react";
import classes from './Reg.module.css';
import Icon from "./Icon.png";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { reg } from "../../utils/auth";

class Reg extends Component{

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
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            input.oninput = () => {
                input.style.border = '1px solid #717DF0'
            }
        }
    }

    registrationSend() {
        let nickname = this.form.current.nickname.value.trim();
        let email = this.form.current.mail.value.trim();
        let password = this.form.current.password.value.trim();

        reg(nickname, password, email, (isAuth) => {
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
                    <img src={Icon} alt="icon" />
                    <h1>Создание аккаунта</h1>
                    <p>Ниже введите свои регистрационные данные, чтобы использовать сервис</p>
                    <form ref={this.form}>
                        <input name="nickname" placeholder="Логин" />
                        <input name="mail" placeholder="Email" />
                        <input name="password" placeholder="Пароль" type='password' />
                        <div className={classes.Buttons}>
                            <Link to={{
                                pathname: '/Auth'
                            }}>
                                У меня уже есть аккаунта
                            </Link>
                            <button type="button" onClick={() => this.registrationSend()}>Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Reg