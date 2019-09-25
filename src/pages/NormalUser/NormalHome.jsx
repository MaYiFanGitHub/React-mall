import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NormalUser from './NormalUser'
import NormalAddUpdate from './NormalAddUpdate'

export default class NormalHome extends Component {
  render() {
    return (
      <Switch>
        <Route path="/normal" component={NormalUser} exact></Route>
        <Route path="/normal/add" component={NormalAddUpdate}></Route>
        <Redirect to="/normal"></Redirect>
      </Switch>
    )
  }
}
