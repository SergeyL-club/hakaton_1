import React, { Component } from 'react'
import './CustomSelect.css'
import classnames from 'classnames'

export default class CustomSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  
  setOpen(){
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let className = classnames({
      Open: this.state.open,
      Close: !this.state.open
    });
    return (
      <ul>
        <button type='button' onClick={() => this.setOpen()}>Список пользователей</button>
        <div className={className}>
          { this.props.accounts.map((el, key) => {
            return (
              <li className={"Item"} key={key} value={el.id}>
                <input defaultChecked={el.isCheck} onClick={() => this.props.setState(el.id)} id={el.nickname+el.id} type="checkbox" value={el.id} />
                <label htmlFor={el.nickname+el.id}>{el.nickname}</label>
              </li>
            )
          }) }
        </div>
      </ul>
    )
  }
}
