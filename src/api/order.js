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
