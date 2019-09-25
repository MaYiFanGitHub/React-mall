import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AdminUser from './AdminUser'
import AdminAddUpdate from './AdminAddUpdate'

export default class AdminHome extends Component {
  render() {
    return (
      <Switch>
        <Route path="/manager" component={AdminUser} exact></Route>
        <Route path="/manager/add" component={AdminAddUpdate}></Route>

        <Redirect to="/manager"></Redirect>
      </Switch>
    )
  }
}
