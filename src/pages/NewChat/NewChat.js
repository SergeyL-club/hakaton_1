import React, { Component, createRef } from "react";
import classes from './NewChat.module.css'
import Icon from './Icon.png'
import axios from "../../axios/axios";
import CustomSelect from "../CustomSelect";
import { Link, Redirect } from "react-router-dom";

class NewChat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
        this.setStateAccounts = this.setStateAccounts.bind(this);
        this.form = createRef();
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if(token) {
            axios.post("/account/getList", {}, {
                headers: {
                    token
                }
            }).then(res => {
                if(res.status === 200) {
                    let accounts = [];
                    for (let i = 0; i < res.data.data.accounts.length; i++) {
                        const el = res.data.data.accounts[i];
                        accounts.push({
                            id: el.id,
                            nickname: el.nickname,
                            isCheck: false
                        });
                    }
                    this.setState({
                        accounts: accounts
                    })
                }
            });
        }
    }

    create() {
        let token = localStorage.getItem("token");
        let name = this.form.current.name.value.trim();
        let membersList = [];
        for (let i = 0; i < this.state.accounts.length; i++) {
            const account = this.state.accounts[i];
            if(account.isCheck) {
                membersList.push(Number(account.id));
            }
        }
        axios.post("/chat/create", {
            name,
            membersList: JSON.stringify(membersList)
        }, {
            headers: {
                token
            }
        }).then(res => {
            console.log(res.status, res.data);
        })
    }

    setStateAccounts(id){
        let accounts = this.state.accounts;
        let index = accounts.findIndex(item => item.id === id);
        if(index !== -1) {
            accounts[index].isCheck = !accounts[index].isCheck;
            this.setState({
                accounts
            });
        }
    }

    render(){
        if(this.state.redirect) return <Redirect to="/personalArea" /> 
        else return(
            <>
                <div className={classes.Form}>
                        <Link to={{
                            pathname: '/personalArea'
                        }}>
                            <img src={Icon} alt="icon" />
                        </Link>
                    <h1>Создание чата</h1>
                    <p>Создайте новый чат</p>
                    <form ref={this.form}>
                        <input placeholder="Название чата" name="name"/>
                        <CustomSelect setState={this.setStateAccounts} accounts={this.state.accounts} />
                        <div className={classes.Buttons}>
                            <button type="button" onClick={() => this.create()}>Создать</button>
                        </div>
                    </form>
                </div>
                <div onClick={this.props.setClose} className={classes.Deks} />
            </>
        )
    }
}

export default NewChat