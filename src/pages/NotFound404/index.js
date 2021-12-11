import React, { Component } from 'react'
import classes from './NotFound.module.css'

export default class NotFound404 extends Component {
  render() {
    return (
      <div className={classes.NotFound}>
        <div className={classes.NotInfo}>
          <h1>Упс, что-то пошло не так :(</h1>
          <p>Но ты особо не растраивайся, все хорошо ;)</p>
        </div>
      </div>
    )
  }
}
