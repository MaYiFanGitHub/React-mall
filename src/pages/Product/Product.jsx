import React, { Component } from 'react'
import { Card, Button, Input, Select, Table, Form, Modal, message } from 'antd'

import { reqProducts, reqDeleteProduct } from '../../api'
import { dateFormat } from '../../utils/DateUtil'
import './ProductHome.less'

const { Option } = Select
const { Item } = Form

const Base_Url = 'http://172.28.173.62:8080/mi_mall/';

class Product extends Component {
  state = {
    // 商品列表
    products: [],
    // 图片大图查看状态
    showStatus: false,
    // 品类列表
    categories: [],
    // 总页数
    total: 0,
    // 每页多少条
    pageSize: 6,
    // 表格加载状态
    loading: true,
    // 条件商品名称
    commodity_name: '',
    // 条件商品分类
    type_id: -1,
    // 是否点击了搜索按钮
    isSearchBtn: false,
    // 当前页
    pageId: 1
  }

  /* 
    删除商品
  */
  deleteProduct = (commodity_id) => {
    Modal.confirm({
      title: '是否要删除此商品?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const result = await reqDeleteProduct(commodity_id)
        if (result.flag) {
          message.success('删除成功')
          this.getProducts()
        } else {
          message.error('删除失败')
        }
      }
    });

  }

  /* 
    条件搜索
  */
  searchProduct = () => {
    console.log(1)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({
          commodity_name: values.commodity_name,
          type_id: values.type_id,
          isSearchBtn: true
        })

        this.getProducts(1, values.commodity_name, values.type_id)
      }
    })
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
  /* 
    获取所有商品列表
    默认值为第一页， 商品名为空， 类型为空
  */
  getProducts = async (pageid = 1, commodity_name = '', type_id = -1) => {
    const result = await reqProducts(commodity_name, type_id, pageid)

    this.setState({
      products: result.commoditylist,
      categories: result.typelist,
      total: result.commodity_counts,
      pageSize: result.pagesize,
      loading: false,
      pageId: pageid
    })
    // 当前页
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
        render: (commodity_date) => dateFormat(commodity_date)
      },
      {
        title: '商品品类',
        dataIndex: 'type_name',
        key: 'type_name',
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
                    src={Base_Url + picture.picture_url}
                    alt={picture.picture_id}
                    key={picture.picture_id}
                    onClick={() => this.lookPicture(Base_Url + picture.picture_url)}
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
        render: (product) => (
          <p>
            <Button
              shape="circle"
              icon="edit"
              type="primary"
              style={{ marginRight: 5 }}
              onClick={() => this.props.history.push('/product/update', product)}
            />
            <Button
              shape="circle"
              icon="delete"
              type="danger"
              onClick={() => this.deleteProduct(product.commodity_id)}
            ></Button>
          </p>
        )
      },
    ]
  }
  componentDidMount() {
    this.getProducts();
  }


  render() {
    const { products, showStatus, pageSize, total, categories, loading, pageId, commodity_name, type_id, isSearchBtn } = this.state
    const { getFieldDecorator } = this.props.form
    const conditionNodes = (
      <Form
        layout="inline"
      >
        <Item label="分类名称">
          {
            getFieldDecorator('type_id', {
              initialValue: '-1'
            })(
              <Select style={{ width: 150 }}>
                <Option key="0" value="-1">请选择</Option>
                {
                  categories.map(category => (
                    <Option
                      key={category.type_id}
                      value={category.type_id}
                    >
                      {category.type_name}
                    </Option>
                  ))
                }

                <Option key="2" value="ds">电视</Option>
                <Option key="3" value="sh">手环</Option>
              </Select>
            )
          }
        </Item>

        <Item label="手机名称">
          {
            getFieldDecorator('commodity_name', {
              initialValue: ''
            })(
              <Input placeholder="请输入手机名称" />
            )
          }
        </Item>

        <Item>
          <Button icon="search" type="primary" onClick={this.searchProduct}>搜索</Button>
        </Item>

      </Form>
    )
    const addNodes = (
      <Button icon="plus" type="primary" onClick={() => this.props.history.push('/product/add')}>添加</Button>
    )

    return (

      < Card title={conditionNodes} extra={addNodes} >
        <Table
          dataSource={products}
          columns={this.columns}
          bordered
          size="small"
          rowKey="commodity_id"
          loading={loading}
          pagination={{
            pageSize: pageSize,
            total: total,
            current: pageId,
            onChange: (page) => {
              if (isSearchBtn) {
                this.getProducts(page, commodity_name, type_id)
              } else {
                this.getProducts(page)
              }

            },
          }}
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

export default Form.create()(Product)