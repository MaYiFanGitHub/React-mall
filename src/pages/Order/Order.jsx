import React, { Component } from 'react'
import { Card, Table, message } from 'antd'

import { reqOrders } from '../../api'
import { dateFormat } from '../../utils/DateUtil'

export default class Order extends Component {

  state = {
    orderList: []
  }

  /* 
    获取订单列表
  */
  getOrderList = async () => {
    const result = await reqOrders()
    if (result.flag) {
      this.setState({
        orderList: result.orderlist
      })
    } else {
      message.error('获取失败')
    }
  }
  componentWillMount() {
    this.columns = [
      {
        title: '订单ID',
        dataIndex: 'order_id',
      },
      {
        title: '用户ID',
        dataIndex: 'user_id',
      },
      {
        title: '收货地址ID',
        dataIndex: 'user_address',
      },
      {
        title: '产品规格',
        dataIndex: 'commodity_size'
      },
      {
        title: '下单日期',
        dataIndex: 'order_date',
        render: (date) => dateFormat(date)
      }
    ]
  }

  componentDidMount() {
    this.getOrderList()
  }
  render() {
    const { orderList } = this.state
    return (
      <Card>
        <Table
          dataSource={orderList}
          columns={this.columns}
          rowKey="order_id"
          bordered
          pagination={{
            defaultPageSize: 3
          }}
        >

        </Table>
      </Card>
    )
  }
}
