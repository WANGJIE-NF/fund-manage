import axios from 'axios';
import router from './router';
import { Loading, Message  } from 'element-ui';


let loadingInstance;
function startLoading() {
    loadingInstance = Loading.service({
        spinner: 'el-icon-loading',
        lock: true,
        text: '',
        background: 'rgba(0,0,0,0.6)'
    });
}
function endLoading() {
    loadingInstance.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    startLoading();

    // 如有token,将token设置为请求头      
    if(localStorage.eleToken){
      config.headers.Authorization = localStorage.eleToken;
    }

    return config;

  }, error => {

    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截
axios.interceptors.response.use(response => {
    // 对响应数据做点什么

    endLoading();
    return response;

  }, error => {
    // 对响应错误做点什么
    endLoading();
    Message.error(error.response.data);

    // 当token过期
    const {status} = error.response;
    if(status == 401) {
      localStorage.removeItem("eleToken");
      Message.error('token失效，情重新登录');
      router.push('/login');
    }

    return Promise.reject(error);
  });

export default axios