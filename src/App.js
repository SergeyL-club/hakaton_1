import React, { Component } from 'react'
import { SocketContext } from './contexts/socket.context'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/Auth'



import Main from './pages/Main/index'
import Room from './pages/Room/index'
import NotFound404 from './pages/NotFound404/index'
import PersonalArea from './pages/PersonalArea/PersonalArea'
import Auth from './pages/Auth/index'
import Reg from './pages/Reg/index'
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword'
import ChangePassword from './pages/ChangePassword/ChangePassword'


class App extends Component {
  static contextType = SocketContext
  

  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path="/room/:id" component={Room} />
          <Route exact path="/" component={Main} />
          <Route exact path='/personalArea' component={PersonalArea}/>
          <Route exact path="/Auth"  component={Auth}/>
          <Route exact path='/Reg' component={Reg}/>
          <Route exact path='/RecPas' component={RecoveryPassword}/>
          <Route exact path='/ChangePassword' component={ChangePassword}/>


          <Route path="*" component={NotFound404} />
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    role: state.auth.role
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));