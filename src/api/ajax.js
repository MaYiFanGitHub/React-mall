/* 
  axios 
*/

import axios from 'axios'
import qs from 'qs'
import {
  message
} from 'antd'


axios.defaults.baseURL = 'http://172.28.173.62:8080/mi_mall'
/* 
  1. 配置请求拦截器，处理 请求参数为 urlencoded 格式
*/
axios.interceptors.request.use(config => {
  console.log(config.url.indexOf('/insert_commodity'));
  if (config.method.toUpperCase() === "POST" && config.url.indexOf('/insert_commodity') === -1 && config.url.indexOf('/update_commodity') === -1 && config.url.indexOf('/insert_pic') === -1 ) {

    const data = config.data;
    // 判断传入的参数是否为对象
    if (data && config.data instanceof Object) {
      config.data = qs.stringify(data)
    }
  }
  return config
})

/* 
  2. 配置响应拦截器， 处理 返回值直接为 response.data 的值
  3. 统一处理 axios 请求的异常
*/

axios.interceptors.response.use(response => {
  return response.data
}, error => {

  message.error('请求错误,' + error.message)
  // 中断 promise链
  return new Promise(() => {})
})

export default axios