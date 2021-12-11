import React, { Component } from 'react'
import classes from './main.module.css'
import {Link, NavLink} from 'react-router-dom'
import Icon from './Icon.png'
import { connect } from 'react-redux'

class Main extends Component {
  render() {
    return (
      <div className={classes.Main}>
        <div className={classes.Main_content}>
          <img src={Icon}/>
          <h1>Push to talk</h1>
          <p>Мгновенная связь между несколькими пользователями в режиме реальрного времени.</p>
          <NavLink to="/Reg">
            Начать
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Main