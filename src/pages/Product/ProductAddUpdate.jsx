import React, { Component } from 'react'
import { Card, Button, Icon, Form, Input, Select } from 'antd'
import axios from 'axios'

import { reqCategories } from '../../api'

let id = 0;


class ProductAddUpdate extends Component {

  state = {
    categories: []
  }
  // 删除某一项
  remove = k => {
    const { form } = this.props;
    // 可以使用数据绑定来获取
    const keys = form.getFieldValue('keys');
    // 我们至少需要一位规格
    if (keys.length === 1) {
      return;
    }

    // 可以使用数据绑定来设置
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // 使用数据绑定来获取
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // 使用数据绑定来设置
    // 重要!通知表单以检测更改
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names, colors, pricesList } = values;
        // 商品名称
        const commodity_name = values.commodity_name;
        // 商品描述
        const commodity_description = values.commodity_description;
        // 品类
        const type_id = values.type_id;
        // 商品规格
        const commodity_size = JSON.stringify(keys.map(key => {
          return { color: names[key], memory: colors[key], prices: pricesList[key] }
        }))
        // 商品图片
        let commodity_pic = document.getElementsByClassName('picture')


        // 添加要提交的数据
        let submitData = new FormData();
        submitData.append('commodity_name', commodity_name)
        submitData.append('commodity_description', commodity_description)
        submitData.append('type_id', type_id)
        submitData.append('commodity_size', commodity_size)
        submitData.append('commodity_pic', commodity_pic[0].files[0])
        submitData.append('commodity_pic', commodity_pic[1].files[0])
        submitData.append('commodity_pic', commodity_pic[2].files[0])
        submitData.append('commodity_pic', commodity_pic[3].files[0])

        // 判断商品是修改还是添加
        if (!this.product.commodity_id) {
          // 提交
          axios.post('/insert_commodity', submitData, {
            'Content-Type': 'multipart/form-data'
          }).then(res => {
            this.props.history.replace('/product')
          })
        } else {
          // 更新
          submitData.append('commodity_id', this.product.commodity_id)
          console.log(this.product.commodity_id, commodity_name, commodity_description, type_id, commodity_size)
          axios.post('/update_commodity', submitData, {
            'Content-Type': 'multipart/form-data'
          }).then(res => {
            this.props.history.replace('/product')
          })
        }

      }
    });
  };

  /* 
    获取分类列表
  */
  getCategories = async () => {
    const result = await reqCategories()
    if (result.flag) {
      this.setState({
        categories: result.typelist
      })
    }
  }

  componentDidMount() {
    this.getCategories();
  }
  render() {
    this.product = this.props.location.state || {}

    const { getFieldDecorator, getFieldValue } = this.props.form;
    // 表单大小
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 0 },
      },
    };

    const { categories } = this.state
    // 获取到 keys 的表单数据
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '规格' : ''}
        required={false}
        key={k}
      >
        <Form.Item>
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请输入颜色",
              },
            ],
          })(
            <Input placeholder="颜色" style={{ width: '60%', marginRight: 8 }} />
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator(`colors[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请输入内存",
              },
            ],
          })(
            <Input placeholder="内存" style={{ width: '60%', marginRight: 8 }} />
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator(`pricesList[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请输入价格",
              },
            ],
          })(
            <Input type="number" placeholder="价格" style={{ width: '60%', marginRight: 8 }} />
          )}
        </Form.Item>
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
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
              添加商品
            </span>
          </>
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="商品名">
            {
              getFieldDecorator('commodity_name', {
                initialValue: this.product.commodity_name
              })(
                <Input placeholder="商品名"></Input>
              )
            }
          </Form.Item>
          <Form.Item label="商品描述">
            {
              getFieldDecorator('commodity_description', {
                initialValue: this.product.commodity_description
              })(
                <Input placeholder="商品描述"></Input>
              )
            }
          </Form.Item>
          <Form.Item label="分类">
            {
              getFieldDecorator('type_id', {
                initialValue: this.product.type_id || '-1'
              })(
                <Select>
                  <Select.Option key="0" value="-1">请选择</Select.Option>
                  {
                    categories.map(category => (
                      <Select.Option key={category.type_id} value={category.type_id}>{category.type_name}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            <input type="file" className="picture" />
            <input type="file" className="picture" />
            <input type="file" className="picture" />
            <input type="file" className="picture" />
          </Form.Item>
          {formItems}


          <Form.Item>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
          </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}


export default Form.create()(ProductAddUpdate)