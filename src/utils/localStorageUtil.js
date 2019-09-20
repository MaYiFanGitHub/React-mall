import store from 'store'
/* 
  本地存储工具模块，可以利用本模块进行对用户登录的管理
*/
const USER_KEY = 'user_key'

export default {
  // 设置用户
  set(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user) || '{}')
    store.set(USER_KEY, user || {})
  },

  // 查询用户
  get() {
    // return JSON.parse(localStorage.getItem(USER_KEY)) || {}
    return store.get(USER_KEY) || {}
  },

  // 删除用户
  remove() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }

}