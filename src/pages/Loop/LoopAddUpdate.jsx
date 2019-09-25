import React, { Component } from 'react'
import { Card, Button, Icon, Form, Input, message } from 'antd'

import { reqAddLoop } from '../../api'

const { Item } = Form
class LoopAddUpdate extends Component {


  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let submitData = new FormData()
        submitData.append('pic_return', values.pic_return)
        submitData.append('pic', this.refs.picture.files[0])

          const result = await reqAddLoop(submitData);
          if (result.flag) {
            message.success('添加成功')
            this.props.history.replace('/loop')
          } else {
            message.success('添加失败')
          }
      }
    })
  }
  render() {
    /* 
      布局样式
    */
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
            添加轮播图
          </span>
          </>
        }
      >
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Item label="链接地址">
            {
              getFieldDecorator('pic_return', {
                initialValue: '',
                rules: [
                  { required: true, whitespace: true, message: '请输入链接地址' }
                ]
              })(
                <Input placeholder="链接地址" />
              )
            }
          </Item>
          <Item label="轮播图片" wrapperCol={{ span: 15 }}>
            <input type="file" name="" id="" ref="picture" />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}


export default Form.create()(LoopAddUpdate)