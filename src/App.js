import React, { Component } from 'react'
import { SocketContext } from './contexts/socket.context'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Main from './pages/Main/index'
import Room from './pages/Room/index'
import NotFound404 from './pages/NotFound404/index'
import PersonalArea from './pages/PersonalArea/PersonalArea'
import Auth from './pages/Auth/index'
import Reg from './pages/Reg/index'
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewChat from './pages/NewChat/NewChat'


export default class App extends Component {
  static contextType = SocketContext
  componentDidMount() {
    
  } 

  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path="/room/:id" component={Room} />
          <Route exact path="/" component={Main} />
          <Route exact path='/personalArea' component={PersonalArea}/>
          <Route exact path="/Auth"  component={Auth}/>
          <Route exact path='/regist' component={Reg}/>
          <Route exact path='/RecPas' component={RecoveryPassword}/>
          <Route exact path='/ChangePassword' component={ChangePassword}/>
          <Route exact path='/NewChat' component={NewChat}/>


          <Route path="*" component={NotFound404} />
        </Switch>
      </BrowserRouter>
    )
  }
}