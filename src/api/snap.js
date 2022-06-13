import axios from '@/utils/axios-util'
import Vrouter from "@/router"

export const getSnapProducts = () => {
    return axios.request({
        url: 'snap',
        method: 'get'
    })
}
export const getSnapProductDetail = (id) => {
    return axios.request({
        url: `snap/get/${id}`,
        method: 'get'
    })
}
export const joinSnap = () => {
    return axios.request({
        url: 'snap/join',
        method: 'post'
    })
}
export const buySnapItem = (id) => {
    return axios.request({
        url: `snap/buy/${id}`,
        method: 'post'
    })
}
export const checkSnap = () => {
    return axios.request({
        url: `snap/check`,
        method: 'get'
    })
}
export const confirmSnapOrder = (data) => {
    return axios.request({
        url: `snap/confirm`,
        // {
        //     "snapId":4020,
        //     "orderId":81
        // }
        data,
        method: 'post'
    })
}
export const snapAlipay = (orderId) => {
    return axios.request({
        url: `alipay/snapOrder/${orderId}`,
        method: 'post'
    })
}
export const confirmSnapOrderPay = (orderId) => {
    return axios.request({
        url: `alipay/SnapQuery/${orderId}`,
        method: 'post'
    })
}
export const cancelOrder = (orderId) => {
    return axios.request({
        url: `snap/cancel/${orderId}`,
        method: 'post'
    })
}