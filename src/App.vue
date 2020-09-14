<template>
    <div id="app" class="white-skin">
        <!--左侧菜单开始-->
        <div class="menu-box" v-show="$route.name !== 'Login'">
            <div class="adjustment">
                <div class="logo-box">
                    <span v-if="!isCollapse">系统</span>
                    <span class="advertisement" v-if="isCollapse">广告</span>
                    <!--<div :class="`cicv-logo ${isCollapse?'bgc_cover':'bgc_contain'}`"></div>-->
                </div>
                <el-menu
                        :default-openeds="defaultOpenedS"
                        :default-active="defaultActive"
                        :unique-opened="true"
                        class="el-menu-vertical-demo"
                        :collapse="isCollapse"
                        background-color="#3e81ab"
                        text-color="#000"
                        active-text-color="#000"
                        @select="selectMenu">
                    <el-menu-item-group :key="firstIndex" v-for="(firstMenu,firstIndex) in routeMenu">
                        <el-menu-item :index="firstIndex.toString()" v-if="firstMenu.children.length === 0">
                            <i :class="firstMenu.meta.icon"></i>
                            <span slot="title">{{firstMenu.label}}</span>
                        </el-menu-item>
                        <el-submenu :index="firstIndex.toString()" v-if="firstMenu.children && firstMenu.children.length > 0">
                            <template slot="title">
                                <i :class="firstMenu.meta.icon"></i>
                                <span slot="title">{{firstMenu.label}}</span>
                            </template>
                            <el-menu-item-group :key="secondIndex" v-for="(secondMenu,secondIndex) in firstMenu.children">
                                <el-menu-item :index="firstIndex.toString() + '-' + secondIndex.toString()" v-if="secondMenu.children.length === 0">
                                    <span slot="title">{{secondMenu.label}}</span>
                                </el-menu-item>
                                <el-submenu :index="firstIndex.toString() + '-' + secondIndex.toString()" v-if="secondMenu.children && secondMenu.children.length > 0">
                                    <template slot="title">
                                        <span slot="title">{{secondMenu.label}}</span>
                                    </template>
                                </el-submenu>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu-item-group>
                </el-menu>
            </div>
        </div>
        <!--左侧菜单结束-->

        <!--主体部分-->
        <div class="main-page">
            <!--头部页面开始-->
            <div class="global-header">
                <div class="show-buttom" v-show="$route.name !== 'Login'">
                    <i class="el-icon-s-fold toggle-btn" @click="toggleCollapse" v-if="!this.isCollapse"></i>
                    <i class="el-icon-s-unfold toggle-btn" @click="toggleCollapse" v-if="this.isCollapse"></i>
                </div>
                <header class="header content-header" v-show="$route.name !== 'Login'">
                    <div class="project-title">信息系统</div>
                    <div class="right-other-function">
                        <!--局部刷新-->
                        <span class="border-bottom reload-page" @click="reload()">
                            <i class="el-icon-refresh"></i>
                            <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
                                <span>刷新</span>
                            </el-tooltip>
                        </span>
                        <span class="border-bottom full-screen" @click="fullScreen">
                            <i class="el-icon-full-screen"></i>
                            <el-tooltip class="item" effect="dark" :content="screenTitle" placement="bottom">
                                <span>{{screenTitle}}</span>
                            </el-tooltip>
                        </span>
                        <span class="border-bottom user-select">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <img src="./assets/img/userIcon.png"/>
                                    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" class="user-select-menu">
                                    <el-dropdown-item command="1">个人信息</el-dropdown-item>
                                    <el-dropdown-item command="2">修改密码</el-dropdown-item>
                                    <el-dropdown-item command="3">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </div>
                </header>
            </div>
            <!--头部页面结束-->

            <!--路由页面开始-->
            <div class="global-main" v-if="$route.name !== 'Login'">
                <!--打开的tab页签-->
                <div class="open-tabs">
                    <el-tabs
                            class="tabs"
                            v-model="editableTabsValue"
                            type="border-card"
                            @tab-remove="removeTab"
                            @tab-click="changeTab">
                        <el-tab-pane
                                v-for="(item) in editableTabs"
                                :key="item.name"
                                :label="item.label"
                                :name="item.name"
                                :closable="item.close">
                        </el-tab-pane>
                    </el-tabs>
                    <!-- 下拉选择框 -->
                    <el-dropdown>
                        <el-button size="small" class="select">
                            <i class="el-icon-caret-bottom"></i>
                            <span class="close-tab">页签操作</span>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="closePresent">关闭当前标签</el-dropdown-item>
                            <el-dropdown-item @click.native="closeOthers">关闭其他标签</el-dropdown-item>
                            <el-dropdown-item @click.native="closeAll">关闭所有标签</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!--路由页面-->
                <div class="router-page">
                    <keep-alive>
                        <router-view/>
                    </keep-alive>
                </div>
                <!--footer——版权-->
                <div class="footer">
                    <span>© 2020 城维数据 Copyright </span>
                </div>
            </div>
            <!--路由页面结束-->

            <!--登录页面开始-->
            <div class="login-main" v-if="$route.name === 'Login'">
                <router-view/>
            </div>
            <!--登录页面结束-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide(){
          reload: this.reload
        },
        data () {
            return {
                // 菜单收起与展开
                isCollapse: false,
                // 菜单数据
                routeMenu: [],
                // 默认展开的菜单索引
                defaultActive: '',
                // 默认展开的菜单集合
                defaultOpenedS: [],
                // 全屏浮显显示字段
                screenTitle: '全屏显示',
                // 用户名称
                userName: "",

                targetClickName: "",
                editableTabsValue: "",
                editableTabs: [],

                reloadMes:true

            }
        },
        methods: {
            /**
             * Description:菜单伸缩
             * Author:''
             * Date:2020/5/5
             */
            toggleCollapse () {
                this.isCollapse = !this.isCollapse
            },
            /**
             * Description:操作用户信息
             * Author:''
             * Date:2020/5/5
             * @param command：a-个人信息；b-修改密码；c-退出登录
             */
            handleCommand (command) {
                if (command == '1' || command == '2') {
                    this.$common.development(); // 此功能正在开发中（全局）
                } else if (command == '3') {
                    localStorage.clear();
                    sessionStorage.clear();
                    sessionStorage.removeItem('editableTabs');
                    window.location.reload(() => {
                        this.$router.push({
                            path: '/Login',
                            name: 'Login'
                        });
                    });
                }
            },
            /**
             * Description:刷新
             * Author:
             * Date:2020/5/5
             * @param null
             */
            reload(){
                //window.location.reload(); //有白屏
                this.$router.go(0);  // 会有空白时间
                /*this.$router.push({
                    path: '/components/BlankPage',
                    name: 'BlankPage'
                })*/
            },
            /**
             * Description:全屏功能
             * Author:
             * Date:2020/5/5
             */
            fullScreen () {
                var el = document.documentElement;
                var rfs =
                    el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen ||
                    el.msRequestFullscreen;
                if (this.screenTitle == '全屏显示') {
                    if (typeof rfs != 'undefined' && rfs) {
                        rfs.call(el)
                    }
                    this.screenTitle = '退出全屏'
                } else if (this.screenTitle == '退出全屏') {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    this.screenTitle = '全屏显示';
                }
                //ie低版本的全屏，退出全屏都这个方法
                //注：ie调用ActiveX控件，需要在ie浏览器安全设置里面把 ‘未标记为可安全执行脚本的ActiveX控件初始化并执行脚本’ 设置为启用
                if (typeof window.ActiveXObject != 'undefined') {
                    //这的方法 模拟f11键，使浏览器全屏
                    var wscript = new ActiveXObject('WScript.Shell');
                    if (wscript != null) {
                        wscript.SendKeys('{F11}')
                    }
                }
            },
            /**
             * Description:监测全屏功能——解决全屏状态下按esc键退出的bug
             * Author:
             * Date:2020/5/5
             */
            checkFull(){
                var isFull = document.mozFullScreen||
                    document.fullScreen ||
                    //谷歌浏览器及Webkit内核浏览器
                    document.webkitIsFullScreen ||
                    document.webkitRequestFullScreen ||
                    document.mozRequestFullScreen ||
                    document.msFullscreenEnabled;
                if(isFull === undefined) isFull = false;
                return isFull;
            },
            /**
             * Description:激活菜单
             * Author:
             * Date:2020/5/5
             */
            initActiveMenu () {
                // 设置用户名显示信息
                if (JSON.parse(sessionStorage.getItem('loginInfo'))) {
                    let userInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
                    this.userName = userInfo.userName;
                }
                this.defaultActive = this.$route.meta.activeIndexs;
                this.defaultOpenedS = $.extend(true, [], this.$route.meta.defaultOpeneds);
            },
            /**
             * Description:获取菜单数据
             * Author:''
             * Date:2020/5/5
             */
            getRouteMenuData () {
                let menuData = JSON.parse(sessionStorage.getItem('routeMenuData'));
                if (menuData) {
                    this.routeMenu = menuData
                }
            },
            /**
             * Description:点击菜单跳转页面
             * Author:
             * Date:2020/5/5
             * @param params: 菜单数据
             */
            selectMenu (...params) {
                let indexList = params[0].split('-');
                let routeItem = '';
                let length = indexList.length;
                switch (length) {
                    case 1:
                        routeItem = this.routeMenu[indexList[0]];
                        break;
                    case 2:
                        routeItem = this.routeMenu[indexList[0]].children[indexList[1]];
                        break;
                    case 3:
                        routeItem = this.routeMenu[indexList[0]].children[indexList[1]]
                            .children[indexList[2]];
                        break;
                    case 4:
                        routeItem = this.routeMenu[indexList[0]].children[indexList[1]]
                            .children[indexList[2]].children[indexList[3]];
                        break
                }
                // 添加tab标签
                this.addTabs(routeItem);
                this.editableTabsValue = routeItem.name;
                // 路由跳转
                this.$router.push({
                    path: routeItem.path,
                    name: routeItem.name
                });
                this.$set(this.$route.meta, 'label', routeItem.meta.label)
            },
            /**
             * Description:添加tab标签
             * Author:
             * Date:2020/6/10
             * @param item
             */
            addTabs(item){
                this.targetClickName = item.name;
                //如果已经打开了，则不添加
                for (let i = 0; i < this.editableTabs.length; i++) {
                    if (item.name === this.editableTabs[i].name) {
                        return;
                    }
                }
                if (item.name !== JSON.parse(sessionStorage.getItem('editableTabs'))[0].name) {
                    item.close = true;
                }
                this.editableTabs.push(item);
                sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs));
                this.editableTabsValue = item.name;
            },
            /**
             * Description:tab标签页点击切换
             * Author:
             * Date:2020/6/10
             */
            changeTab(targetName){
                this.targetClickName = targetName.name;
                let tabs = this.editableTabs;
                let activeName = targetName.name;
                tabs.forEach(tab => {
                    if (tab.name === targetName.name) {
                        this.$router.push(tab.path);
                    }
                });
                this.editableTabsValue = activeName;
            },
            /**
             * Description:移除标签
             * Author:''
             * Date:2020/6/10
             */
            removeTab(targetName){
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                                this.$router.push(nextTab.path);
                            }
                        }
                    });
                }
                this.targetClickName = activeName;
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs));
            },
            /**
             * Description:关闭当前页
             * Author:''
             * Date:2020/6/10
             */
            closePresent(){
                if (this.targetClickName == JSON.parse(sessionStorage.getItem('editableTabs'))[0].name) {
                    return;
                }
                this.removeTab(this.targetClickName);
            },
            /**
             * Description:关闭其他页签
             * Author:''
             * Date:2020/6/10
             */
            closeOthers(){
                let doubleTab = this.editableTabs;
                let arr = [];
                let menuData = JSON.parse(sessionStorage.getItem('routeMenuData'));
                if (menuData && menuData.length > 0) {
                    menuData.forEach((first,index) => {
                        if (index === 0) {
                            if (first.children && first.children.length > 0) {
                                arr.push(first.children[0]);
                            } else {
                                arr.push(first);
                            }
                        }
                    });
                }
                let that = this;
                doubleTab.forEach(function(item) {
                    if (that.targetClickName == JSON.parse(sessionStorage.getItem('editableTabs'))[0].name) {
                        that.closeAll();
                        return;
                    } else if (
                        item.name == that.targetClickName &&
                        that.targetClickName != JSON.parse(sessionStorage.getItem('editableTabs'))[0].name
                    ) {
                        arr.push(item);
                    }
                });
                this.editableTabs = arr;
                sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs));
            },
            /**
             * Description:关闭所有页签
             * Author:''
             * Date:2020/6/10
             */
            closeAll(){
                this.editableTabs = [];
                let menuData = JSON.parse(sessionStorage.getItem('routeMenuData'));
                if (menuData && menuData.length > 0) {
                    menuData.forEach((first,index) => {
                        if (index === 0) {
                            if (first.children && first.children.length > 0) {
                                this.editableTabs.push(first.children[0]);
                            } else {
                                this.editableTabs.push(first);
                            }
                            this.editableTabsValue = this.editableTabs[0].name;
                            this.defaultActive = this.editableTabs[0].meta.activeIndexs;
                            this.$router.push(this.editableTabs[0].path)
                        }
                    });
                    sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs));
                }
            },
            /**
             * Description:执行激活标签
             * Author:''
             * Date:2020/6/10
             */
            activateTab(){
                if (this.$route.name !== 'Login') {
                    // 执行激活标签操作
                    let editableTabs = JSON.parse(sessionStorage.getItem('editableTabs'));
                    if (editableTabs) {
                        this.editableTabs = editableTabs;
                        this.editableTabs.forEach(item => {
                            if (this.editableTabsValue == item.name) {
                                this.defaultActive = item.meta.activeIndexs;
                                this.$router.push(item.path)
                            }
                        })
                    } else {
                        let menuData = JSON.parse(sessionStorage.getItem('routeMenuData'));
                        if (menuData && menuData.length > 0) {
                            menuData.forEach((first,index) => {
                                if (index === 0) {
                                    if (first.children && first.children.length > 0) {
                                        this.editableTabs.push(first.children[0]);
                                    } else {
                                        this.editableTabs.push(first);
                                    }
                                    this.editableTabsValue = this.editableTabs[0].name;
                                    this.defaultActive = this.editableTabs[0].meta.activeIndexs;
                                    this.$router.push(this.editableTabs[0].path)
                                }
                            });
                            sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs));
                        }
                    }
                }
            },
        },
        created () {
            if (this.$route.name !== 'Login') {
                /**
                 * Description:监测全屏功能——解决全屏状态下按esc键退出的bug
                 * Author:''
                 * Date:2020/5/5
                 */
                let that = this;
                window.onresize = function(){
                    if(!that.checkFull()){
                        // 退出全屏后要执行的动作
                        that.screenTitle = '全屏显示'
                    }
                };
            }
            this.getRouteMenuData();
            this.initActiveMenu()
        },
        watch: {
            $route () {
                this.editableTabsValue = this.$route.name;
                this.getRouteMenuData();
                this.initActiveMenu();
                this.activateTab();
            }
        }
    }
</script>

<style lang="less">
    /** 主题样式 **/
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        list-style: none;
    }

    ul li {
        text-decoration: none;
    }

    a {
        text-decoration: none;
    }

    body {
        font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #676a6c;
    }

    /** 弹性盒布局 **/
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        display: -webkit-flex;
        position: fixed;
        width: 100%;
        height: 100%;
    }
    /*菜单样式*/
    .menu-box {
        flex-direction: column;
        background: #3e81ab !important;
        position: relative;
        z-index: 999;
        .el-menu-vertical-demo {
            border-right: 0;
            .el-menu-item{
                height: 46px;
                line-height: 46px;
                color: #fafafa !important;
                border-left: 3px solid transparent;
                &:hover{
                    background: #1B507A !important;
                    border-color: rgba(255, 140, 0, 1) !important;
                }
                i{
                    color: #fafafa;
                }
            }
            .el-menu-item.is-active{
                background: #1B507A !important;
                border-color: rgba(255, 140, 0, 1) !important;
            }
        }
        .el-menu-item-group__title{
            padding: 0 !important;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse){
            width: 180px;
            min-width: 180px;
            max-width: 180px;
            height: calc(100% - 40px);
            overflow-x: hidden;
            overflow-y: auto;
        }
        .el-menu-item-group__title{
            padding: 0 !important;
        }
        .el-submenu .el-submenu__title{
            height:46px !important;
            line-height: 46px !important;
            color: #fff !important;
            i{
                color: #fff !important;
            }
            &:hover{
                background: #1B507A !important;
            }
            &.is-active{
                background: #1B507A !important;
            }
        }
        /*子菜单样式*/
        .el-submenu{
            .el-menu-item{
                height: 34px !important;
                line-height: 34px !important;
            }
        }
        // 解决收起菜单文字不隐藏样式
        .el-menu--collapse{
            width: 50px;
            .el-submenu__title{
                padding: 0 10px !important;
                span{
                    display: none !important;
                }
            }
            .el-tooltip{
                padding: 0 10px !important;
                i{
                    color: #fafafa;
                }
            }
        }
        .adjustment{
            /*padding-top: 1px; // 用于调整滚动条样式（logo 的 margin 影响了滚动条）*/
            .logo-box{
                height: 46px;
                line-height: 46px;
                background: #1b507a;
                text-align: center;
                color: #fff;
                .advertisement{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    margin-top: 5px;
                    border-radius: 15px;
                    background-color: #3e81ab;
                    color: #fff;
                    font-size: 12px;
                    font-weight: bold;
                }
                .cicv-logo {
                    height: 35px !important;
                    background: url(./assets/img/login/logo.png) no-repeat;
                }
                .bgc_cover {
                    background-size: cover;
                }
                .bgc_contain {
                    background-size: contain;
                }
            }
        }
    }
    .main-page {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
        flex-direction: column;
        height: 100%;
        .global-header {
            position: relative;
            display: flex;
            .show-buttom {
                position: absolute;
                top: 0;
                left: 10px;
                z-index: 999;
                .toggle-btn {
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                    line-height: 46px;
                    float: left;
                }
            }
            /*采用flex布局*/
            .header {
                padding: 0 20px;
                display: flex;
                flex: 1; // 剩余部分充满
                .logo_contain {
                    margin: auto 0;
                    margin-left: 60px;
                    height: 60px;
                }
                .project-title{
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    color: #fff;
                    font-size: 26px;
                    letter-spacing: 9px; // 字间距
                    margin-left: 5%;
                }
                /*媒体查询*/
                @media screen and (max-width: 1366px) {
                    .project-title{
                        font-size: 20px;
                    }
                }
                .right-other-function{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    font-size: 13px;
                    color: #fff;
                    .border-bottom:hover{
                        color: #fff !important;
                        border-bottom: 4px solid rgba(255, 140, 0, 1) !important;
                    }
                    .reload-page{
                        margin-right: 20px;
                        cursor: pointer;
                        i{
                            margin-right: 5px;
                        }
                    }
                    .full-screen{
                        margin-right: 20px;
                        cursor: pointer;
                        i{
                            margin-right: 5px;
                        }
                    }
                    .generate-pdf{
                        margin-right: 20px;
                        cursor: pointer;
                        &:hover{
                            color: #4395ff;
                        }
                        i{
                            font-size: 14px;
                            margin-right: 5px;
                        }
                    }
                    .user-select{
                        img{
                            width: 20px;
                            height: 20px;
                            margin-right: 2px;
                            vertical-align: middle;
                        }
                        .el-dropdown{
                            cursor: default;
                            color: #fff !important;
                        }
                    }

                }
            }
            .content-header{
                height: 46px;
                line-height: 46px;
                /*background: linear-gradient(to left,rgba(1, 170, 237, 1), rgba(82, 183, 109, 1)) !important;*/
                background: #37769f !important;
            }
        }
        .global-main {
            display: flex;
            flex-direction: column;
            flex: 1; // 剩余部分充满
            overflow: hidden;
            // 打开的tab页签
            .open-tabs{
                display: flex;
                flex-direction: row;
                padding-right: 2px;
                .move-tab{
                    width: 25px;
                    padding-top: 6px;
                    padding-left: 2px;
                    border-top: 1px solid #DCDFE6;
                    border-bottom: 1px solid #DCDFE6;
                    background-color: #F5F7FA;
                    cursor: pointer;
                    &:hover{
                        background-color: #eee;
                        i{
                            color: #666;
                        }
                    }
                    i{
                        color: #999;
                        font-size: 22px;
                    }
                }
                .el-tabs{
                    height: 34px;
                    line-height: 34px;
                    flex: 1;
                    padding-bottom: 1px;
                    box-shadow: none !important;
                    white-space: nowrap;
                    overflow-x: auto;
                    overflow-y: hidden;
                    .el-tabs__header{
                        margin: 0 !important;
                        .el-tabs__item{
                            height: 34px !important;
                            line-height: 34px !important;
                            padding: 0 10px !important;
                            border-right: 1px solid #DCDFE6;
                            .el-icon-close{
                                color: #fff;
                                font-size: 12px;
                                background-color: #ccc;
                                &:hover{
                                    background-color: #f00;
                                }
                            }
                        }
                        .el-tabs__nav-prev{
                            border-right: 1px solid #DCDFE6;
                        }
                        .el-tabs__nav-next{
                            border-left: 1px solid #DCDFE6;
                        }
                        .el-tabs__nav-prev,.el-tabs__nav-next{
                            width: 20px;
                            height: 100%;
                            line-height: 40px;
                            padding-left: 3px;
                            i{
                                font-weight: bold;
                                font-size: 16px;
                                color: #666;
                            }
                            &:hover{
                                background-color: #eee;
                                i{
                                    color: #409EFF;
                                }
                            }
                        }
                    }
                    .el-tabs__content{
                        padding: 0 !important;
                        height: 0 !important;
                    }
                }
                .el-tabs--border-card{
                    .el-tabs__header{
                        border-bottom: none !important;
                    }
                }
                .el-dropdown{
                    height: 34px;
                    line-height: 34px;
                    .el-button{
                        padding: 5px !important;
                        i{
                            color: #999;
                            font-size: 22px;
                        }
                        .close-tab{
                            display: inline-block;
                            vertical-align: text-top;
                            margin-top: -2px;
                            margin-left: 0;
                        }
                    }
                }
            }
            // 路由页面
            .router-page{
                display: flex;
                flex: 1; // 剩余部分充满
                background-color: #f0f2f5;
                overflow: hidden;
            }
            .footer{
                height: 36px;
                line-height: 36px;
                text-align: right;
                border-top: 1px solid #ddd;
                padding: 0 20px;
            }
        }
        .login-main{
            display: flex;
            flex: 1; // 剩余部分充满
            background-color: #f0f2f5;
            overflow: hidden;
        }
    }
</style>
<style lang="less">
    .user-select-menu{
        width: 88px;
        text-align: center;
        margin: 0 !important;
        padding: 0 !important;
        li{
            padding: 0 5px !important;
        }
    }
</style>
