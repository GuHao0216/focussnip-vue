import axios from '@/utils/axios-util'

export const getProducts = (data) => {
  return axios.request({
    url: 'goods/query',
    data,
    method: 'post'
  })
}

