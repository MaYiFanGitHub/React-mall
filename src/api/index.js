import ajax from './ajax.js'

export const reqLogin = (user_username, user_password) => ajax.post('/login_user', {
  user_username,
  user_password
})