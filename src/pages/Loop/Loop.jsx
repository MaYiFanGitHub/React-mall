import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Modal } from 'antd'


import { reqLoops, reqDeleteLoop } from '../../api'

const Base_Url = 'http://172.28.173.62:8080/mi_mall/';

export default class Loop extends Component {

  state = {
    loopList: [],
    // 图片大图查看状态
    showStatus: false,
  }

  /* 
    删除轮播图
  */
  delete = async (pic_id) => {
    console.log(pic_id)
    const result = await reqDeleteLoop(pic_id)
    console.log(result)
    if (result.flag) {
      message.success('删除成功')
      this.getLoops()
    } else {
      message.error('删除失败')
    }
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
    获取轮播图列表
  */

  getLoops = async () => {
    const result = await reqLoops()
    console.log(result)
    if (result.flag) {
      this.setState({
        loopList: result.piclist
      })
    } else {
      message.error('获取失败')
    }
  }

  componentWillMount() {
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'pic_id'
      },
      {
        title: '图片',
        dataIndex: 'pic_url',
        render: (pic_url) => (
          <img
            src={Base_Url + pic_url}
            alt={pic_url}
            onClick={() => this.lookPicture(Base_Url + pic_url)}
            style={{ width: 100 }}
          />
        )
      },
      {
        title: '链接地址',
        dataIndex: 'pic_return'
      },
      {
        title: '操作',
        render: (loop) => (
          <>
            <Button type="danger" shape="circle" icon="delete" onClick={() => this.delete (loop.pic_id)}></Button>
          </>
        )
      }
    ]
  }

  componentDidMount() {
    this.getLoops();
  }
  render() {
    const { loopList, showStatus } = this.state
    return (
      <Card
        extra={
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.props.history.push('/loop/add')}
          >
            添加
          </Button>
        }
      >
        <Table
          dataSource={loopList}
          columns={this.columns}
          rowKey="pic_id"
        >

        </Table>

        <Modal
          visible={showStatus}
          footer={null}
          onCancel={() => this.setState({ showStatus: false })}
        >
          <img alt="example" style={{ width: '400' }} src={this.pictureUrl}  />
        </Modal>
      </Card>
    )
  }
}
