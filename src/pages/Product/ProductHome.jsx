import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductAddUpdate from './ProductAddUpdate'
import Product from './Product'

export default class ProductHome extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product/add' component={ProductAddUpdate}></Route>
        <Route path='/product/update' component={ProductAddUpdate}></Route>
        <Route path="/product" component={Product}></Route>
        <Redirect to='/product'></Redirect>
      </Switch>
    )
  }
}
