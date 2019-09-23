import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './MenuNav.less'
import menuList from '../../config/MenuConfig'

const { SubMenu, Item } = Menu;

export default class MenuNav extends Component {
  /* 
    渲染菜单列表
  */
  getMenuNodes = (menuList) => {
    return menuList.map(menu => {
      if (!menu.children) {
        return (
          <Item key={menu.key}>
            <Link to={menu.key}>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu
            key={menu.key}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(menu.children)}
          </SubMenu>
        )
      }
    })
  }
  componentWillMount() {
    this.menuList = this.getMenuNodes(menuList)
  }
  render() {
    return (
      <div className="menu-nav">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>大米后台</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
        >
          {this.menuList}
        </Menu>
      </div>
    )
  }
}
