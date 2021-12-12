import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Room2 from './pages/Room/Room2'
import Main from './pages/Main/index'
// import Room from './pages/Room/index'
import NotFound404 from './pages/NotFound404/index'
import PersonalArea from './pages/PersonalArea/PersonalArea'
import Auth from './pages/Auth/index'
import Reg from './pages/Reg/index'
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Contact from './pages/Contact/Contact'
import ConfirmRecPas from './pages/ConfirmRecPas/ConfirmRecPas'
import NewContact from './pages/NewContact/NewContact'
import Calls from './pages/Calls/Calls'


export default class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <Switch>

          <Route exact path="/room2" component={Room2} />
          {/* <Route exact path="/room/:id" component={Room} /> */}
          <Route exact path="/" component={Main} />
          <Route exact path='/personalArea' component={PersonalArea}/>
          <Route exact path="/Auth"  component={Auth}/>
          <Route exact path='/regist' component={Reg}/>
          <Route exact path='/RecPas' component={RecoveryPassword}/>
          <Route exact path='/ChangePassword' component={ChangePassword}/>
          <Route exact path='/Contact' component={Contact}/>
          <Route exact path='/ConfirmRecPas' component={ConfirmRecPas}/>
          <Route exact path='/NewContact' component={NewContact}/>
          <Route exact path='/Calls/:id' component={Calls}/>


          <Route path="*" component={NotFound404} />
        </Switch>
      </BrowserRouter>

    )
  }
}