import axios from "axios";
import cookie from "js-cookie";

const request = axios.create(
  {
    baseURL: "http://localhost:9001",
    timeout: 2000,
  }
)
//配置拦截器
request.interceptors.request.use(
  config => {
//将token写入到cookie中
    if (cookie.get('userToken')) {
      config.headers['token'] = cookie.get('userToken')
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
export default request;
