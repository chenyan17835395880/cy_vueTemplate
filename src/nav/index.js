/** 引入http **/
import api from '@/http/api';
import http from '@/http/http';
import axios from "axios";
import $ from 'jquery';
import apiConfig from "../assets/js/config";

const API_CONFIG = apiConfig.API_CONFIG;

/** 配置路径——实际接口 **/
let apiUrl = {
    /******** 登录（用户接入）相关 ********/
    userLogin: API_CONFIG + "/login", // 登录接口
    navUrl: API_CONFIG + "/navList",//导航菜单接口
};

const navData = [
     {
         "path": "/Home",
         "name": "Home",
         "label": "首页",
         "children": [],
         "meta": {
             "icon": "el-icon-s-home",
             "loginCheck": true
         }
    },
    {
        "path": "/table/tableList",
        "label": "父菜单",
        "children": [
            {
                "path": "/table/tableList",
                "name": "tableList",
                "label": "表格",
                "children": [],
                "meta": {
                    "loginCheck": true
                }
            }
        ],
        "meta": {
            "icon": "el-icon-view",
            "loginCheck": true
        }
    },

    {
        "path": "/charts",
        "name": "charts",
        "label": "统计图",
        "children": [],
        "meta": {
            "icon": "el-icon-s-home",
            "loginCheck": true
        }
    },
    {
        "path": '/common/details',
        "name": 'Vue_details',
        "label": "API全局变量",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/options',
        "name": 'Vue_options',
        "label": "Vue选项",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/introduction',
        "name": 'Vue_introduction',
        "label": "实例和内置组件",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/Vue-cli',
        "name": 'Vue-cli',
        "label": "Vue-cli",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/Vue-router',
        "name": 'Vue-router',
        "label": "Vue-router",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    }
];

var queryNav=[];
//获取导航菜单的数据
$.ajax({
    type : "POST", //请求方式
    async: false, // fasle表示同步请求，true表示异步请求
    url : apiUrl.navUrl,//请求地址
    data : '', //数据，json字符串
    success : function(result) { //请求成功
        queryNav = JSON.parse(result).data;
    },
    error : function(e){  //请求失败，包含具体的错误信息
        console.log(e.responseText);
    }
});

/** 接口调用 **/
/*api.navList(res => {
    console.log(res.data);
    if(res.ok){
        querynavData = res.data;
        return querynavData;
    }
}, error => {
    console.info(error, "navList");
});*/



/*function getSomething(){
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            async: false, //改为同步方式
            url: apiUrl.navUrl,
            data: '',
        }).then(response => {
            //querynavData = response.data.data;
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}

async function requestSomething() {
    // 这时something会等到异步请求的结果回来后才进行赋值，同时不会执行之后的代码
    var querynavData = await getSomething();
    console.log(querynavData);
    return querynavData;
}
requestSomething().then(value => {
    console.log(value)
    return queryNav = value;
});*/


//export default requestSomething();
console.log(queryNav)
export default queryNav;

