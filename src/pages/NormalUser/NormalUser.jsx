import React, { Component } from 'react'
import { Card, Form, Button, Input, Table, Modal, message } from 'antd'

import { reqAdminUsers, reqDeleteUser } from '../../api'
import { dateFormat } from '../../utils/DateUtil.js'
import MemoryUtil from '../../utils/memoryUtil'
const { Item } = Form


export default class AdminUser extends Component {

  state = {
    adminUsers: [], // 用户列表
    loading: true, // 加载效果
    pageSize: 6, // 每页的条数
    userCount: 0, // 总记录数
    username: '', // 用户名
    phone: '',  // 手机 
    isSearch: false, // 是否点击了搜索按钮 
    currentPage: 1, // 当前页码
  }

  // 获取用户列表
  getAdminUsers = async (pageNum = 1, username = '', phone = '') => {
    const result = await reqAdminUsers(pageNum, username, phone, 0)
    if (result.flag) {
      this.setState({
        adminUsers: result.userlist,
        loading: false,
        userCount: result.usercount,
        pageSize: result.pagesize,
        currentPage: pageNum
      })
    } else {
      message.error(result.msg);
      this.setState({
        adminUsers: [],
        loading: false,
        userCount: result.usercount,
        pageSize: result.pagesize,
        currentPage: pageNum
      })
    }
  }

  // 搜索
  search = (pageNum) => {
    const { username, phone } = this.state
    // 发送ajax请求，查询数据
    this.getAdminUsers(pageNum, username, phone)
    // 更改状态值
    this.setState({
      isSearch: true,
    })
  }

  // 删除用户
  deleteUser = (userId, nickName) => {
    Modal.confirm({
      title: `是否要删除 ${nickName} 此用户吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const result = await reqDeleteUser(userId)
        if (result.flag) {
          // 提示信息
          message.success(result.msg)
          // 加载效果
          this.setState({
            loading: true
          })
          const { currentPage, username, phone } = this.state
          // 刷新列表
          this.getAdminUsers(currentPage, username, phone)
        } else {
          message.error(result.msg)
        }
      }
    });
  }

  // 生成表格columns
  getColumns = () => {
    // 表格标题
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '用户名',
        dataIndex: 'user_username',
        key: 'user_username',
      },
      {
        title: '昵称',
        dataIndex: 'user_nickname',
        key: 'user_nickname',
      },
      {
        title: '手机',
        dataIndex: 'user_phone',
        key: 'user_phone',
      },
      {
        title: '身份',
        dataIndex: 'role_id',
        render: (role_id) => '普通用户'
      },
      {
        title: '注册日期',
        dataIndex: 'user_date',
        render: (date) => dateFormat(date)
      },
      {
        title: '操作',
        render: (user) => {
          return (
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.deleteUser(user.user_id, user.user_nickname)}
            />
          )
        }
      }
    ]
  }


  componentWillMount() {
    // 生成表格标题
    this.getColumns();
    // 读取当前登录的用户
    this.userInfo = MemoryUtil.userInfo
  }

  componentDidMount() {
    // 获取用户列表
    this.getAdminUsers()
  }
  render() {
    // 读取state中的数据
    const { adminUsers, loading, pageSize, userCount, username, phone, isSearch, currentPage } = this.state

    const addBtn = <Button icon="plus" type="primary" onClick={() => this.props.history.push('/normal/add')}>添加</Button>
    const selectCondition = (
      <Form
        layout="inline"
      >
        <Item label="用户名">
          <Input
            placeholder="请输入要查询的用户名"
            onChange={(event) => this.setState({ username: event.target.value })}
            value={username}
          />
        </Item>
        <Item label="手机号">
          <Input
            placeholder="请输入要查询的手机号"
            onChange={(event) => this.setState({ phone: event.target.value })}
            value={phone}
          />
        </Item>

        <Item>
          <Button
            icon="search"
            type="primary"
            onClick={() => this.search(1)}
          >搜索</Button>
        </Item>
      </Form>
    )


    return (
      <Card
        title={selectCondition}
        extra={addBtn}
      >
        <Table
          dataSource={adminUsers}
          columns={this.columns}
          rowKey="user_id"
          loading={loading}
          size="small"
          pagination={{
            current: currentPage,
            showQuickJumper: true,
            pageSize: pageSize,
            total: userCount,
            onChange: (page) => {
              // 设置状态
              this.setState({
                loading: true
              })
              if (!isSearch) { // 没有点击搜索按钮
                this.getAdminUsers(page)
              } else { // 点击了搜索按钮
                this.search(page)
              }
            }
          }}
        />
      </Card>
    )
  }
}
