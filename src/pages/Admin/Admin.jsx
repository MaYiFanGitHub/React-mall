import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import localStorageUtil from '../../utils/localStorageUtil'

export default class Admin extends Component {
  render() {
    // 读取本地存储中的数据
    const userInfo = localStorageUtil.get()
    console.log(userInfo)
    // 无法在render中使用 this.props.history.replace 方法，只能通过渲染 Redirect 标签来进行自动跳转
    if(!userInfo.user_id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <div>
        Admin{userInfo.user_nickname}
      </div>
    )
  }
}
