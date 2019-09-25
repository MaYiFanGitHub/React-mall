import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Loop from './Loop'
import LoopAddUpdate from './LoopAddUpdate'

export default class LoopHome extends Component {
  render() {
    return (
      <Switch>
        <Route path="/loop/add" component={LoopAddUpdate}></Route>
        <Route path="/loop/update" component={LoopAddUpdate}></Route>
        <Route path="/loop" component={Loop}></Route>

        <Redirect to="/loop"></Redirect>
      </Switch>
    )
  }
}
