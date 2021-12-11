import React, { Component } from "react";
import classes from './NewChat.module.css'
import Icon from './Icon.png'

class NewChat extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
                <div className={classes.Form}>
                    <img src={Icon} alt="icon" />
                    <h1>Создание чата</h1>
                    <p>Создайте новый чат</p>
                    <form ref={this.form}>
                        <input placeholder="Никнейм или Email" name="nickname"/>
                        <input placeholder="Пароль" type='password' name="password"/>
                        <div className={classes.Buttons}>
                            <button type="button" onClick={() => this.authForm()}>Войти</button>
                        </div>
                    </form>
                </div>
                <div onClick={this.props.setClose} className={classes.Deks} />
            </>
        )
    }
}

export default NewChat