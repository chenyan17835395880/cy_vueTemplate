import Vue from 'vue'
import Router from 'vue-router'

/** 引入全局js **/
import common from './assets/js/common'

Vue.use(Router);

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    return routerPush.call(this, location).catch(error => error)
};

const createRouter = () =>
    new Router({
        /** 去掉项目中的url的# **/
        mode: process.env.NODE_ENV === 'development' ? 'history' : '',
        base: process.env.NODE_ENV === 'development' ? process.env.BASE_URL : '',
        routes: [
            // 登录页面
            {
                path: '/views/Login',
                name: 'Login',
                component: () => import('./views/Login.vue'),
                meta: {
                    loginCheck: false,
                },
            },
            /**
             * Description: 空白页面（用于局部刷新功能）
             * Author:''
             * Date:2020/5/5
             */
            {
                path: '/components/BlankPage',
                name: 'BlankPage',
                component: () => import('./components/BlankPage/index.vue'),
                meta: {
                    label: "",
                    loginCheck: true,  // 是否需要登录
                },
            },
            {
                path: '/views/common/Vue-router',
                name: 'Vue-router',
                component: () => import('./views/common/Vue-router'),
                meta: {
                    label: "",
                    loginCheck: true,  // 是否需要登录
                },
            },
        ]
    });

const router = createRouter();
const commonJs = new common();

let data = JSON.parse(sessionStorage.getItem('routeMenuData'));
if (!data) {
    data = []
}

const newRouter = createRouter();
router.matcher = newRouter.matcher;
router.addRoutes(commonJs.assemblingComponents(data));

/**
 * Description:路由守卫（初始登录以及非法登录跳转到登录页）
 * Author:''
 * Date:2020/5/5
 */
router.beforeEach((to, from, next) => {
    let isLogin = JSON.parse(sessionStorage.getItem('loginInfo'));
    if(to.name){
        if(to.meta.loginCheck && !isLogin){
            next({
                name: 'Login',
            })
        }else{
            next();
        }
    }else{
        if(!isLogin){
            next({
                name: 'Login',
            })
        }else{
            next({
                name: 'Home',
            })
        }
    }
});

export default router

export function resetRouter () {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher
}
