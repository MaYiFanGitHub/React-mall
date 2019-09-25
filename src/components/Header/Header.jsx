import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal } from 'antd'

import './Header.less'
import memeoryUtil from '../../utils/memoryUtil.js'
import localStorageUtil from '../../utils/localStorageUtil'
import { dateFormat } from '../../utils/DateUtil'
import MenuList from '../../config/MenuConfig'

const { confirm } = Modal

class Header extends Component {
  state = {
    currentTime: dateFormat(Date.now())
  }

  // 根据请求的path得到对应的标题
  getTitle = () => {
    let title = '';
    const pathname = this.props.location.pathname;
    MenuList.forEach(item => {
      if (item.key === pathname) {
        title = item.title
      } else if (item.children) {
        const menu = item.children.find(menu => pathname === menu.key)
        // 判断是否有当前菜单
        if (menu) {
          title = menu.title
        }
      }
    })

    return title
  }
  // 用户退出
  logout = () => {
    confirm({
      title: '你确定要退出登录吗？',
      onOk: () => {
        // 清除本地存储
        localStorageUtil.remove()
        // 清除内存中的值
        memeoryUtil.userInfo = {}
        // 跳转到登录界面
        this.props.history.replace('/login')
      }
    });
  }

  // 显示当前日期
  showCurrentTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dateFormat(Date.now())
      })
    }, 1000);
  }
  componentWillMount() {
    // 读取当前用户的信息
    const userInfo = memeoryUtil.userInfo
    this.userInfo = userInfo
    // 更新时间
    this.showCurrentTime()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { currentTime } = this.state
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{this.userInfo.user_nickname}</span>
          <Button type="link" onClick={this.logout}>退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <h2>{title}</h2>
          </div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Header)