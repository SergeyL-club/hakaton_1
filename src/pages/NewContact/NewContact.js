import React, { Component } from "react";
import classes from './NewContact.module.css'
import Icon from './Icon.png'
import {Link} from 'react-router-dom'
import axios from "../../axios/axios";

class NewContact extends Component{

    componentDidMount(){
        
        document.title="Создание аккаунта"
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            input.oninput = () => {
                input.style.border = '1px solid #717DF0'
            }
        }  
    }

    newContact(){
        let token = localStorage.getItem('token')
        let phone = document.getElementById('phone').value
        let name = document.getElementById('name').value
        axios.get(`/contact/create`,{
            headers: { token },
            params: {
                phone,
                name,
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    render(){
        return(
            <div className={classes.Deks}>
                <div className={classes.Form}>
                    <img src={Icon} alt="icon" />
                    <h1>Создание нового аккаунта</h1>
                    <p>Создайте новый контакт :)</p>
                    <form ref={this.form}>
                        <input placeholder="Телефон" name="phone" id="phone"/>
                        <input placeholder="Имя" type='text' name="name" id="name"/>
                        <div className={classes.Buttons}>
                            <button type="button" onClick={() => this.newContact()}>Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewContact