import ajax from './ajax.js'

// 登录
export const reqLogin = (user_username, user_password) => ajax.post('/login_user', {
  user_username,
  user_password
})

// 获取所有的分类
export const reqCategories = () => ajax.get('/select_type')

// 添加分类
export const reqAddCategory = (type_name) => ajax({
  url: '/insert_type',
  method: "POST",
  data: {
    type_name
  }
})

// 修改分类
export const reqUpdateCategory = ({
  type_id,
  type_name
}) => ajax({
  url: '/update_type',
  method: "POST",
  data: {
    type_id,
    type_name
  }
})

// 删除分类
export const reqDeleteCategory = (type_id) => ajax.get('/delete_type', {
  data: {
    type_id
  }
})