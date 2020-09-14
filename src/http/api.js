/** 引入http **/
import http from '@/http/http';

/** 区分开发环境还是生产环境 **/
import apiConfig from "../assets/js/config";
import axios from "axios";

const API_CONFIG = apiConfig.API_CONFIG;
console.log(API_CONFIG)
/** 配置路径——实际接口 **/
let apiUrl = {
    /******** 登录（用户接入）相关 ********/
    userLogin: API_CONFIG + "/login", // 登录接口
    navUrl: API_CONFIG + "/navList",//导航菜单接口
};
/** 接口调用 **/
export default{
    userLogin(option,success,error){
        http.post(apiUrl.userLogin,option).then(res=>{
            return success && success(res);
        }).catch(err=>{
            return error && error(err);
        })
    },
    navList(success,error){
        http.post(apiUrl.navUrl).then(res=>{
            return success && success(res);
        }).catch(err=>{
            return error && error(err);
        })
    }
};
