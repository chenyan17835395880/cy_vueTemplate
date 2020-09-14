/** 引用axios **/
import axios from 'axios'
/** 引用router **/
import router from '../router'

/** 全局配置 **/
axios.defaults.timeout = 180000;
// 配置token
// if (sessionStorage.getItem('loginInfo')) {
//     axios.defaults.headers.common['Authorization'] =  sessionStorage.getItem('loginInfo'); // 存储登录验证token
// } else {
//     localStorage.clear();
//     sessionStorage.clear();
// router.replace({
//     path: '/views/Login',
//     name: "Login"
// });
// }


/** 请求拦截器 **/
axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

/** 响应拦截器 **/
axios.interceptors.response.use((res) => {
    //拦截代码，根据业务需求自己写
    return res;
}, (error) => {
    try {
        if (!error.response) {
            throw "请求超时";
        }
        if (error.response.data.msg) {
            throw error.response.data.msg;
        }
        if (!error.response.data.msg) {
            throw '服务器开小差了~';
        }
    } catch (e) {
        alert("接口调用失败:" + error.response.statusText + "\n" +
            "状态码:" + error.response.status)
    }
    switch (error.response.status) {
        case 404:
            //404处理
            break;
        case 500:
            //500处理
            break;
        default:
            break;
    }
    // 当响应异常时做一些处理
    return Promise.reject(error.response.response)
});

/** 请求封装 **/
export default {
    get(url, options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                params: options,
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error);
            })
        })
    },
    post(url, options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                async:false,
                url: url,
                data: options,
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error);
            })
        })
    },
    delete(url, options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: url,
                data: options,
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error);
            })
        })
    },
    put(url, options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: url,
                data: options,
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error);
            })
        })
    },
}
