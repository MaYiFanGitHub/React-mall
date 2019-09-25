import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import './Admin.less'
import localStorageUtil from '../../utils/localStorageUtil'
import MenuNav from '../../components/MenuNav/MenuNav'
import AdminHeader from '../../components/Header/Header'
import Home from '../Home/Home'
import Category from '../Category/Category'
import ProductHome from '../Product/ProductHome'
import AdminHome from '../AdminUser/AdminHome'
import NormalHome from '../NormalUser/NormalHome'
import Order from '../Order/Order'
import LoopHome from '../Loop/LoopHome'

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {

  componentWillMount() {
    // 读取本地存储中的数据
    const userInfo = localStorageUtil.get()
    // 如果用户不存在就跳转到登录页面
    if (!userInfo.user_id) {
      this.props.history.replace('/login')
    }
  }
  render() {

    return (
      <Layout className="admin">
        <Sider>
          <MenuNav></MenuNav>
        </Sider>
        <Layout>
          <AdminHeader></AdminHeader>
          <Content>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={ProductHome}></Route>
              <Route path="/manager" component={AdminHome}></Route>
              <Route path="/normal" component={NormalHome}></Route>
              <Route path="/order" component={Order}></Route>
              <Route path="/loop" component={LoopHome}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer>
            看了也不知道的大米科技有限公司&nbsp;|&nbsp;公司地址：看了也不知道的哪个地方&nbsp;|&nbsp;电话：看了也不知道的哪个电话
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
