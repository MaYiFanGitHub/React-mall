import React, { Component } from 'react'
import { Card, Form, Input, Select, Icon, Button, message } from 'antd'

import { reqAddUser } from '../../api'
const { Item } = Form
const { Option } = Select

class AdminAddUpdate extends Component {

  /* 
    手机表单数据
  */
  handleSubmit = (event) => {
    // 清除默认事件
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.role_id = 0;
        const result = await reqAddUser(values)
        if (result.flag) {
          message.success('添加成功')
          this.props.history.replace('/normal')
        } else {
          message.success('添加失败')
          this.props.form.resetFields();
        }
      }
    });
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    const { getFieldDecorator } = this.props.form
    return (
      <Card
        title={
          <>
            <Button
              type="link"
              onClick={() => this.props.history.goBack()}
            >
              <Icon type="left" />
            </Button>
            <span>
              添加用户
            </span>
          </>
        }
      >
        <Form
          onSubmit={this.handleSubmit} {...formItemLayout}
        >
          <Item label="用户名">
            {
              getFieldDecorator('user_username', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入用户名', whitespace: true }
                ]
              })(
                <Input placeholder="用户名" />
              )
            }

          </Item>
          <Item label="密码">
            {
              getFieldDecorator('user_password', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入密码', whitespace: true }
                ]
              })(
                <Input type="password" placeholder="密码" />
              )
            }
          </Item>

          <Item label="手机">
            {
              getFieldDecorator('user_phone', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入手机', whitespace: true }
                ]
              })(
                <Input placeholder="手机" />
              )
            }

          </Item>
          <Item label="昵称">
            {
              getFieldDecorator('user_nickname', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入昵称', whitespace: true }
                ]
              })(
                <Input placeholder="昵称" />
              )
            }

          </Item>
          <Item>
            <Button type="primary" htmlType="submit">添加</Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => this.props.history.goBack()}
            >取消</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}


export default Form.create()(AdminAddUpdate)