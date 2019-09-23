import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'

import CategoryForm from './CategoryForm'
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api'

export default class Category extends Component {
  state = {
    categoryList: [], // 分类列表
    showStatus: 0, // 0 隐藏， 1 添加， 2 修改
    loading: true, // 加载效果
  }

  // 获取所有的分类
  getCategoryList = async () => {

    const result = await reqCategories()
    if (result.flag) {
      this.setState({
        categoryList: result.typelist,
        loading: false
      })
    } else {
      message.error(result.msg || '分类列表获取失败')
    }
  }

  // 添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.form.resetFields()
        this.setState({
          loading: true
        })
        const result = await reqAddCategory(values.categoryName)
        if (result.flag) {
          // 查询所有的分类
          this.getCategoryList();
        }
        console.log(result);
      }
    })

    this.setState({
      showStatus: 0
    })
  }

  // 修改分类
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        values.type_id = this.category.type_id
        values.type_name = values.categoryName
        this.form.resetFields()
        this.setState({
          loading: true
        })
        const result = await reqUpdateCategory(values)
        if (result.flag) {
          // 查询所有的分类
          this.getCategoryList();
        }
        console.log(result);
      }
    })

    this.setState({
      showStatus: 0
    })
  }

  // 显示添加对话框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示修改对话框
  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  // 关闭对话框
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }
  componentWillMount() {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'type_name',
        key: 'type_name',
      },
      {
        title: '编辑',
        width: 250,
        render: (category) => (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon="edit"
              onClick={() => this.showUpdate(category)}
              style={{ marginRight: 10 }}
            />
            <Button type="danger" shape="circle" icon="delete" />
          </div>
        )
      }
    ];
  }

  componentDidMount() {
    // 获取所有的分类
    this.getCategoryList()
  }
  render() {
    const addButton = <Button icon="plus" type="primary" onClick={this.showAdd}>添加</Button>
    const { showStatus } = this.state
    const category = this.category || {}
    const { categoryList, loading } = this.state

    return (
      <Card
        extra={addButton}
      >
        <Table
          dataSource={categoryList}
          columns={this.columns}
          bordered
          rowKey="type_id"
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          loading={loading}
          style={{ width: 1000, margin: "0 auto" }}
        />

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={(form) => { this.form = form }} />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={(form) => { this.form = form }} categoryName={category.type_name} />
        </Modal>
      </Card>
    )
  }
}
