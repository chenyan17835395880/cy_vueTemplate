import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './mock.js'

Vue.use(Element);
import 'element-ui/lib/theme-chalk/index.css'
import {Message,MessageBox,Loading} from 'element-ui';
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;

// 全局引入正则表达式
import regexp from "./assets/js/regexp";
Vue.prototype.$regexp = regexp;

import axios from 'axios'
import api from '@/http/api'
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 全局引入jquery
import $ from 'jquery';
Vue.prototype.$=$;

// 导入全局js类  $common可在vue文件中全局使用，使用方法this.$common
import commonJs from './assets/js/common.js'
let common = new commonJs();
Vue.prototype.$common = common;

// 引入兼容IE浏览器文件
import "./assets/js/ie/compatible";

/**
 * Description:引入 Echarts
 * Author:''
 * Date:2020/6/11
 */
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

/**
 * Description:引入图片放大插件viewer
 * Author:''
 * Date:2020/6/15
 */
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
    Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true,
        "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true,
        "keyboard": true, "url": "data-source" }
});
/**
 * Description:引入swiper样式文件
 * Author:''
 * Date:2020/6/15
 */
import 'swiper/css/swiper.css'

// 1.创建一个组件构造器
var myComponent = Vue.extend({
    template: '<div style="font-family:微软雅黑;">This is matrix first component</div>'
});

// 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
Vue.component('matrix-component',myComponent);

// 3.创建一个 Vue 实例或 "ViewModel"
// 它连接 View 与 Model

var routeList = [];
router.beforeEach((to, from, next) => {
    var index = -1;
    for (var i = 0; i < routeList.length; i++) {
        if (routeList[i].name == to.name) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        //如果存在路由列表，则把之后的路由都删掉
        routeList.splice(index + 1, routeList.length - index - 1);
    } else if (to.name != '登录') {
        routeList.push({"name": to.name, "path": to.fullPath});
    }
    to.meta.routeList = routeList;
    next()
});
Vue.config.productionTip = false;

//注册一个全局组件
Vue.component('cy',{
    template:'<h4 style="color:green;">这是一个全局组件{{hhh}}</h4>',
    props:['hhh']
});

//注册一个全局混入mixins
Vue.mixin({
   updated(){
       //console.log('我是全局混入');
   }
});
//"private": true,//如果你"private": true在package.json中设置，那么npm将拒绝发布它。
let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
export default vue;
