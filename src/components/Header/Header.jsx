import React, { Component } from 'react'
import {Button} from 'antd'

import './Header.less'
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>   
          <Button type="link">退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <h2>首页</h2>
          </div>
          <div className="header-bottom-right">
            <span>2019-09-22 19:43:31</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
