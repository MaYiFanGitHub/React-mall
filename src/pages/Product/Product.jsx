import React, { Component } from 'react'
import { Card, Button, Input, Select, Table, Form, Modal } from 'antd'

import { reqCategories } from '../../api'
import './ProductHome.less'

const { Option } = Select
const { Item } = Form

const Base_Url = 'http://172.28.15.236:8080/mi_mall';

export default class Product extends Component {
  state = {
    // 商品列表
    products: [
      {
        "commodity_id": "b6f10904-cc56-4f96-ab6f-9a325ad4c1d2",
        "commodity_name": "小米9se",
        "commodity_description": "战斗天使",
        "commodity_date": "2019-09-20T00:00:00.000+0000",
        "type_id": 1,
        "commodity_size": null,
        "commodity_picturelist": []
      },
      {
        "commodity_id": "d9cace95-5b1f-465e-a1df-a86cd897dc2b",
        "commodity_name": "小米9",
        "commodity_description": "战斗天使",
        "commodity_date": "2019-09-19T00:00:00.000+0000",
        "type_id": 1,
        "commodity_size": null,
        "commodity_picturelist": [
          {
            "picture_id": "12536a29-aecd-484c-a8fa-04cd1e75c8ad",
            "commodity_id": null,
            "picture_url": "Uploads/1569033010996.jpeg"
          },
          {
            "picture_id": "12536a29-aecd-484c-a8fa-04cd1e75c8ad",
            "commodity_id": null,
            "picture_url": "Uploads/1569033010996.jpeg"
          },
          {
            "picture_id": "12536a29-aecd-484c-a8fa-04cd1e75c8ad",
            "commodity_id": null,
            "picture_url": "Uploads/1569033010996.jpeg"
          },
          {
            "picture_id": "12536a29-aecd-484c-a8fa-04cd1e75c8ad",
            "commodity_id": null,
            "picture_url": "Uploads/1569033010996.jpeg"
          }
        ]
      }
    ],
    // 图片大图查看状态
    showStatus: false,
    // 品类列表
    categories: []
  }

  /*
    查看商品大图 
  */
  lookPicture = (pictureUrl) => {
    this.pictureUrl = pictureUrl
    this.setState({
      showStatus: true
    })
  }

  componentWillMount() {
    this.columns = [
      {
        title: '商品ID',
        dataIndex: 'commodity_id',
        key: 'commodity_id',
        width: 300
      },
      {
        title: '商品名称',
        dataIndex: 'commodity_name',
        key: 'commodity_name',
      },
      {
        title: '商品描述',
        dataIndex: 'commodity_description',
        key: 'commodity_description',
      },
      {
        title: '添加时间',
        dataIndex: 'commodity_date',
        key: 'commodity_date',
      },
      {
        title: '商品品类',
        dataIndex: 'type_id',
        key: 'type_id',
      },
      {
        title: '商品图片',
        dataIndex: 'commodity_picturelist',
        width: 300,
        render: (pictureList) => {
          return (
            <div>
              {
                pictureList.map(picture => (
                  <img
                    src="https://f12.baidu.com/it/u=4105282850,1502604217&fm=76"
                    alt={picture.picture_id}
                    key={Math.random()}
                    onClick={() => this.lookPicture("https://f12.baidu.com/it/u=4105282850,1502604217&fm=76")}
                    className="product-img"
                  />
                ))
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        render: () => (
          <p>
            <Button
              shape="circle"
              icon="edit"
              type="primary"
              style={{ marginRight: 5 }}
            />
            <Button shape="circle" icon="delete" type="danger"></Button>

          </p>
        )
      },
    ]
  }

  async componentDidMount() {
    const result = await reqCategories()
    console.log(result)
    if (result.flag) {
      this.setState({
        categories: result.typelist
      })
    }
  }

  render() {

    const conditionNodes = (
      <Form
        layout="inline"
      >
        <Item label="分类名称">
          <Select value="select" style={{ width: 150 }}>
            <Option key="0" value="select">请选择</Option>
            <Option key="1" value="phone">手机</Option>
            <Option key="2" value="ds">电视</Option>
            <Option key="3" value="sh">手环</Option>
          </Select>
        </Item>

        <Item label="手机名称">
          <Input placeholder="请输入手机名称" />
        </Item>

        <Item>
          <Button icon="search" type="primary" >搜索</Button>
        </Item>

      </Form>
    )
    const addNodes = (
      <Button icon="plus" type="primary">添加</Button>
    )

    const { products, showStatus } = this.state
    return (

      < Card title={conditionNodes} extra={addNodes} >
        <Table
          dataSource={products}
          columns={this.columns}
          bordered
          size="small"
          rowKey="commodity_id"
        />
        <Modal
          visible={showStatus}
          footer={null}
          onCancel={() => this.setState({ showStatus: false })}
        >
          <img alt="example" style={{ width: '100%' }} src={this.pictureUrl} />
        </Modal>
      </Card >
    )
  }
}
