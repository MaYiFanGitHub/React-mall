import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './Login.less'
import { reqLogin } from '../../api'
import user from '../../utils/memoryUtil'
import localStorageUtil from '../../utils/localStorageUtil'


class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, { user_username, user_password }) => {
      if (!err) {
        const result = await reqLogin(user_username, user_password)
        console.log(result)
        if (result.flag && result.role_id !== 0) { // 登录成功
          // 存放到本地存储中
          localStorageUtil.set(result.t_user)
          // 将登陆的结果存放到内存工具函数中一份
          user.userInfo = result.t_user

          // 跳转路由
          this.props.history.replace('/')
        } else {  // 登录失败
          message.error(result.msg || '用户权限不足，请联系管理员')
        }
      }
    });
  };

  render() {
    /* 
      判断用户是否已经登陆，如果已经登陆跳转到管理页面
    */
    if (user.userInfo.user_id) {
      return <Redirect to="/"></Redirect>
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-header">
          <div><img src={logo} alt="logo" /></div>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('user_username', {
                rules: [
                  { required: true, message: '请输入账号', whitespace: true },
                  { min: 4, message: "账号长度大于4位！" },
                  { max: 12, message: "账号长度小于12位！" },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '账号只能是字母、数字、下划线！' }
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入账号"
                  size="large"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('user_password', {
                rules: [
                  { required: true, message: '请输入账号', whitespace: true },
                  { min: 4, message: "密码长度大于4位！" },
                  { max: 12, message: "密码长度小于12位！" },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能是字母、数字、下划线！' }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>


    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm