import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import './Admin.less'
import localStorageUtil from '../../utils/localStorageUtil'
import MenuNav from '../../components/MenuNav/MenuNav'
import AdminHeader from '../../components/Header/Header'
import Home from '../Home/Home'
import Category from '../Category/Category'

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
  render() {
    // 读取本地存储中的数据
    const userInfo = localStorageUtil.get()
    // 无法在render中使用 this.props.history.replace 方法，只能通过渲染 Redirect 标签来进行自动跳转
    if (!userInfo.user_id) {
      return <Redirect to="/login"></Redirect>
    }
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
