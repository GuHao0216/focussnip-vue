import axios from '@/utils/axios-util'

export const login = (data) => {
  return axios.request({
    url: 'doLogin',
    data,
    method: 'post'
  })
}

export const register = (data) => {
  return axios.request({
    url: 'register',
    data,
    method: 'post'
  })
}

export const forget = (data) => {
  return axios.request({
    url: 'user/password',
    data,
    method: 'put'
  })
}
