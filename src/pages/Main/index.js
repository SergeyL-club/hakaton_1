import React, { Component } from 'react'
import classes from './main.module.css'
import { NavLink, Redirect, Link} from 'react-router-dom'
import Icon from './Icon.png'

class Main extends Component {

  constructor(props) {
    super(props);
    
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

  render() {
    if(this.state.redirect) return <Redirect to="/personalArea" />
    else return (
      <div className={classes.Main}>
        <div className={classes.Main_content}>
                        <Link to={{
                            pathname: '/personalArea'
                        }}>
                            <img src={Icon} alt="icon" />
                        </Link>
          <h1>Push to talk</h1>
          <p>Мгновенная связь между несколькими пользователями в режиме реального времени.</p>
          <NavLink to="/regist" className={classes.Link}>
            Начать
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Main