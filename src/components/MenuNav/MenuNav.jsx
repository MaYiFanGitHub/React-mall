import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './MenuNav.less'
import menuList from '../../config/MenuConfig'

const { SubMenu, Item } = Menu;

class MenuNav extends Component {
  /* 
    渲染菜单列表
  */
  getMenuNodes = (menuList) => {

    const openKey = this.props.location.pathname

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
        if (menu.children.some(item => openKey === item.key)) {
          this.openKey = menu.key
        }
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
    const openKey = this.openKey
    const SelectedKey = this.props.location.pathname
    return (
      <div className="menu-nav">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>大米后台</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[SelectedKey]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuList}
        </Menu>
      </div>
    )
  }
}


export default withRouter(MenuNav)