import axios from '@/utils/axios-util'
// import Vrouter from "@/router"

export const createOrder = (goodsId) => {
  return axios.request({
    url: `order/create?goodsId=${goodsId}`,
    method: 'post'
  })
}
export const payOrder = (orderId) => {
  return axios.request({
    url: `order/pay?orderId=${orderId}`,
    method: 'post'
  })
}
export const getOrder = () => {
  return axios.request({
    url: `order/selectAll`,
    method: 'get'
  })
}
export const deleteOrder = (orderId) => {
  return axios.request({
    url: `order/deleteByOrderId?orderId=${orderId}`,
    method: 'delete'
  })
}
export const alipay = (orderId) => {
  return axios.request({
    url: `alipay/${orderId}`,
    method: 'post'
  })
}
export const checkAlipayStatus = (orderId) => {
  return axios.request({
    url: `alipay/query/${orderId}`,
    method: 'post'
  })
}
