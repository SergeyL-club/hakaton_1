import React, { Component } from "react";
import classes from './Auth.module.css'
import { connect } from "react-redux";
import Icon from './Icon.png'
import { Link } from "react-router-dom";
import  {auth}  from '../../store/actions/Auth'

class Auth extends Component{

    componentDidMount(){
        document.title="Регистрация"
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            input.oninput = () => {
                input.style.border = '1px solid #717DF0'
            }
        }
    }

    render(){

        const auth = (e) => {
            e.preventDefault();
            var login = document.querySelector("#login").value;
            var password = document.querySelector("#password").value;
            this.props.auth(login, String(password));
          };

        return(
            <div className={classes.Deks}>
                <div className={classes.Form}>
                    <img src={Icon} />
                    <h1>Вход</h1>
                    <p>Ниже введите свои регистрационные данные, чтобы использовать сервис</p>
                    <form>
                        <input placeholder="Никнейм или Email" id="login"/>
                        <input placeholder="Пароль" type='password' id="password"/>
                        <div className={classes.Buttons}>
                            <Link to={{
                                pathname: '/RecPas'
                            }}>
                                Забыли пороль?
                            </Link>
                            <button onClick={auth}>Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      error: state.auth.error,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      auth: (login, password) => dispatch(auth(login, password)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)