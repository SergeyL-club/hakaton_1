import React, { Component } from 'react'
import { SocketContext } from './contexts/socket.context'
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/Auth'
import Layout from './hoc/Layout/Layout'



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
    function routerUser(user, role) {
      switch (user) {
        case false:
          return (
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/auth" exact component={Auth}/>
              <Route path="/regist" exact component={Reg}/>
              <Route path="*" component={NotFound404} />
            </Switch>
          );
        case true:
                return (
                  <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/auth" exact component={() => (user ? <Redirect to='/personalArea' /> : <Redirect to='/auth' />)}/>
                    <Route path="/regist" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/regist' />)}/>
                    <Route path="/personalArea" exact component={PersonalArea}/>
                    <Route path="/Room" exact component={Room} />
                    <Route path="/RecPas" exact component={RecoveryPassword} />
                    <Route path="/ChangePass" exact component={ChangePassword} />
                    <Route path="*" component={NotFound404} />
                  </Switch>
                )
              default:
                break;
            }
    }

    return (
      <Layout>
        {routerUser(this.props.isAuth, String(this.props.role))}
      </Layout>
    );
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