// 配置路由

import HttpRequest from '@/utils/axios'

export const baseUrl = 'http://in2.css518.cn:16077/'
// export const baseUrl = 'http://192.168.1.110:8080/'

const axios = new HttpRequest(baseUrl)
export default axios