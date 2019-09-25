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

// 获取管理员用户列表
export const reqAdminUsers = (pageid, user_username, user_phone, role_id) => ajax.get(
  '/select_user', {
    params: {
      pageid,
      user_username,
      user_phone,
      role_id
    }
  }
)

/* 
  删除用户
*/
export const reqDeleteUser = (user_id) => ajax.get('/delete_user', {
  params: {
    user_id
  }
})
/* 
  添加用户
*/
export const reqAddUser = ({
  user_username,
  user_password,
  user_nickname,
  user_phone,
  role_id
}) => ajax.post('/insert_user', {
  user_username,
  user_password,
  user_nickname,
  user_phone,
  role_id
})

/* 
  获取所有商品列表
*/
/* export const reqProducts = ({
  commodity_name,
  type_id,
  pageid
}) => ajax.post(
  '/select_commodity', {
      commodity_name,
      type_id,
      pageid
  }

) */

export const reqProducts = (commodity_name, type_id, pageid) => ajax.get('/select_commodity', {
  params: {
    commodity_name,
    type_id,
    pageid
  }
})



/* 
  删除商品
*/
export const reqDeleteProduct = (commodity_id) => ajax.get('/delete_commodity', {
  params: {
    commodity_id
  }
})

/* 
  查询所有订单
*/
export const reqOrders = () => ajax.get('/select_order')

/* 
  查询所有的轮播图
*/
export const reqLoops = () => ajax.get('/select_pic')

/* 
  添加轮播图
*/
export const reqAddLoop = (data) => ajax.post('/insert_pic', data)
/* 
  删除轮播图
*/
export const reqDeleteLoop = (pic_id) => ajax.get('/delete_pic', {
  params: {
    pic_id
  }
})