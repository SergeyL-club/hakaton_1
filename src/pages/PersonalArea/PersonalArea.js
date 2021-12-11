import React, { Component } from "react";
import classes from './personalArea.module.css'
import {NavLink, Link} from 'react-router-dom'

class PersonalArea extends Component{
    constructor(props){
        super(props);
        this.state = {
            Contacts: [
                {
                    name: 'Данил',
                    surname: 'Ленченков'
                },
                {
                    name: 'Сергей',
                    surname: 'Лапшин',
                },
                {
                    name: 'Никита',
                    surname: 'Сарычев',
                }
            ]
        }
    }
    render(){
        return(
            <div className={classes.PersonalArea}>
                <div className={classes.Contacts}>
                    {this.state.Contacts.map((item) => 
                        <Link
                        to='/Auth'>
                            <div className={classes.Contact}>
                                <h1>{item.name}</h1>
                                <h1>{item.surname}</h1>
                            </div> 
                        </Link>  
                    )}
               </div>
               <div className={classes.Block_message}>
                    <h1>Выбирите человека</h1>
               </div>
            </div>
        )
    }
}

export default PersonalArea