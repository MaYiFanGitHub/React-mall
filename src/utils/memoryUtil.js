import localStorageUtil from './localStorageUtil'
/* 
 在内存存储数据的工具对象
*/

export default {
  userInfo: localStorageUtil.get()
}