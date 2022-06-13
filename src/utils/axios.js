import axios from 'axios'
import store from '../store'
import {getToken, setToken} from "./util";
import { ElMessage } from "element-plus";

const handleResponse = ({data, status,headers}) => {
  if (status === 200) {
    switch (data.status) {
      case 0: {
        return data.data
      }
      case 1: {
        // setToken('')
        // alert(data.base.message)
        if (data.base.message != "抢购失败"){
          ElMessage.error(data.base.message);
        }
        return false
        // changeAuthFlag()
        break
      }

      
      default: {
        showErrorMsg(data)
        alert(data.msg)
        // throw new Error(data.msg)
        return Promise.reject(data.msg)
      }
    }
  }
}


const showErrorMsg = (msg) => {
  store.dispatch('changeFlag', msg)
}
class HttpRequest {
  constructor(baseUrl = baseURL) {
    // this.headers['Content-Type'] = 'application/json;charset=UTF-8'; 
    this.baseUrl = baseUrl
    this.queue = {}
    this.tokenHeader = 'Authorization'
    this.authUrl = 'auth/login'
    this.mode='no-cors'
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Authorization': getToken(),
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // console.debug(url, config)
        this.queue[url] = true
        if (url !== this.authUrl) {
          config.headers[this.tokenHeader] = `${getToken()}`
        }
        return config
      },
      error => {
        console.debug('error', error)
        return Promise.reject(error)
      })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // console.debug(url, res)
      const {data, status, headers} = res
      return handleResponse({data, status, headers})
    }, error => {
      this.destroy(url)
      console.debug(error, error.msg)
      // console.log("sorry")
     
      // alert(error.response.data.message+',请返回重试')
      showErrorMsg('网络错误，无法连接服务器')
      alert("网络错误，无法连接服务器")
      // Vue.prototype.$message.error('网络错误，无法连接服务器')
      return Promise.reject(error)
    })
  }

  request(options) {
    // console.debug(options)
    let url = options.url
    if (url.length === 0) {
      // url = getUrlPrefix()
    } else if (!url.startsWith("auth") && !url.startsWith("file")&&!url.startsWith("re")) {
      // url = `${getUrlPrefix()}/${url}`
      url = `/${url}`
    }
    options = Object.assign(this.getInsideConfig(), options, {url})
    // console.debug(options)
    const instance = axios.create(options)
    // console.debug(instance)
    this.interceptors(instance, url)
    options.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return instance(options)
  }
}

export default HttpRequest
