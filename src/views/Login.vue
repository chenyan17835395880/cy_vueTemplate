<template>
    <div class="login">
        <!--<img src="../assets/img/login/login_body_left.png" class="login_body_left" alt="image" >-->
        <div class="right-login-content">
            <el-form ref="form" :model="form" class="container">
                <div class="login-name">系 统</div>
                <div class="login-input">
                    <!--<p>用户名</p>-->
                    <el-form-item prop="username">
                        <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <!--<p>密码</p>-->
                    <el-form-item prop="password">
                        <el-input type="password" prefix-icon="el-icon-lock" v-model="form.password" placeholder="请输入密码"
                                  @keyup.enter.native="login"></el-input>
                    </el-form-item>
                    <!--<p>验证码</p>-->
                    <!--<el-form-item prop="code">-->
                        <!--<el-row :gutter="10">-->
                            <!--<el-col :span="16">-->
                                <!--<el-input v-model="form.code" prefix-icon="el-icon-s-claim" auto-complete="off" placeholder="请输入验证码"-->
                                        <!--size @keyup.enter.native="login"></el-input>-->
                            <!--</el-col>-->
                            <!--<el-col :span="8">-->
                                <!--<div class="login-code" @click="getIdentifyCode">-->
                                    <!--<img :src="codeImg">-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" class="login-btn" @click="login"
                                v-loading="loading" :disabled="loading">{{loginName}}</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {resetRouter} from "../router";
    import navData from "@/nav/index";
    import axios from 'axios'
    export default {
        name: "Login",
        data(){
            return{
                loading: false,
                form: {
                    username: '',
                    password: '',
                    code: '',
                },
                disabled:false,
                loginName:'登录',
                // 验证码图片
                codeImg: "",
            }
        },
        methods:{
            /**
             * Description: 获取验证码
             * Author:''
             * Date:2020/5/5
             */
            getIdentifyCode(){
                let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let len = str.length;
                // 随机数1
                let ind1 = parseInt(Math.random()*len);
                // 随机数2
                let ind2 = parseInt(Math.random()*len);
                // 随机数3
                let ind3 = parseInt(Math.random()*len);
                // 随机数4
                let ind4 = parseInt(Math.random()*len);
                let randomNumber = str[ind1] + str[ind2] + str[ind3] + str[ind4];
                /********** 调用获取验证码（图）的接口 **********/
                // this.codeImg = 'http://192.168.144.125:9898/baseserv/verifyCode/verify/createCode/' + randomNumber;
                this.codeImg = '' + randomNumber;

            },
            /**
             * Description:点击登录——调用登录接口
             * Author:''
             * Date:2020/5/5
             */
            login(){
                if(!this.form.username){
                    this.$message.error('用户名不可为空');
                    return
                }
                if(!this.form.password){
                    this.$message.error('密码不可为空');
                    return
                }
                // if(!this.$regexp.password.test(this.form.password)){
                //     this.$message.error('密码为6-15位字符');
                //     return
                // }
                // if(!this.form.code){
                //     this.$message.error('验证码不可为空');
                //     return
                // }
                // if(this.form.code.length < 4){
                //     this.$message.error('请输入4位验证码');
                //     return
                // }
                const userInfo = {
                    "username": this.form.username,
                    "password": this.form.password,
                    "verifyCode": this.form.code,
                };
                this.loginName = "登录中...";
                this.loading = true;
                /********** 调用登录接口，存储用户信息、登录token、菜单数据等，成功后跳转首页 **********/
                this.$api.userLogin(userInfo, res => {
                    if (res.ok) {
                        // 清空激活的标签
                        sessionStorage.removeItem('editableTabs');
                        // 遍历菜单数据、存储
                        let saveMenuData = this.$common.assemblingComponents(navData);
                        sessionStorage.setItem('routeMenuData',JSON.stringify(saveMenuData));
                        // 存储登录信息
                        console.log(res)
                        sessionStorage.setItem('loginInfo',JSON.stringify(res.data));
                        // 存储登录验证token
                        axios.defaults.headers.common['Authorization'] = res.data.token;
                        resetRouter();
                        this.$router.addRoutes(saveMenuData);
                        this.$router.push({
                            name: 'Home'
                        });
                        this.$message.success('登录成功');
                        this.loginName = "登录";
                        this.loading = false;
                    } else {
                        this.$message.error(res.message);
                        this.loginName = "登录";
                        this.loading = false;
                    }
                }, error => {
                    this.loginName = "登录";
                    this.loading = false;
                    console.info(error, "userLogin");
                })
            },
        },
        mounted(){
            // this.getIdentifyCode();
        },
        // 进入路由获取数据
        beforeRouteEnter(to, from, next) {
            next(vm => {

            })
        },
        //出路由清空数据
        beforeRouteLeave(to, from, next) {
            next()
        },
    }
</script>

<style scoped lang="less">
    .login{
        display: flex;
        flex: 1;
        flex-direction: row;
        overflow: auto;
        //background-image: url(../assets/img/login/bg.jpg);
        background-size: cover;
        /*background:linear-gradient(91deg,rgba(14,35,138,1) 0%,rgba(26,100,190,1) 100%);*/
        .login_body_left{
            height: 100%;
            margin-left: 200px;
        }
        .right-login-content{
            display: flex;
            flex: 1;
            justify-content: center;
            /*padding-right: 15%;*/
            /*padding: 20px 15% 20px 20px;*/
            .container {
                border-radius: 5px;
                width: 400px;
                height: 272px;
                background: rgba(25,132,200,.3);
                margin: auto 0;
                .login-name{
                    height: 62px;
                    line-height: 62px;
                    text-align: center;
                    font-size:18px;
                    font-weight:600;
                    color: #fff;
                    border-bottom: 1px solid @color-border;
                }
                .login-input{
                    padding: 0 45px;
                    .el-form-item{
                        margin-top: 20px;
                    }
                    .el-form-item:last-of-type{
                        margin-top: 10px !important;
                    }
                    p{
                        padding-top: 5px;
                        line-height: 34px;
                        font-size: 16px;
                        font-family:PingFang-SC-Medium,PingFang-SC;
                        font-weight:500;
                        color:rgba(47,47,47,1);
                    }
                    .el-input input{
                        background:rgba(239,243,245,1);
                    }
                    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                        color: #999;
                    }
                    ::-moz-placeholder { /* Firefox 19+ */
                        color: #999;
                    }
                    :-ms-input-placeholder { /* IE 10+ */
                        color: #999;
                    }
                    :-moz-placeholder { /* Firefox 18- */
                        color: #999;
                    }
                }
                .login-btn {
                    width: 100%;
                    background-color: #1c84c6;
                    border-color: #1c84c6;
                    color: #FFFFFF;
                    margin: 10px 0 30px 0;
                    &:hover{
                        background-color: #1a7bb9;
                        border-color: #1a7bb9;
                    }
                }
            }
            .login-code{
                height: 32px;
                img{
                    display: inline-block;
                    width: 80px;
                    height: 32px;
                    margin-top: 3px;
                }
            }
        }
    }
    /*媒体查询*/
    @media screen and (max-width: 1366px) {
        .login{
            .login_body_left{
                margin-left: 150px !important;
            }
            .right-login-content{
                .container {
                    width: 360px !important;
                    .login-name{
                        height: 52px !important;
                        line-height: 52px !important;
                        font-size:16px !important;
                    }
                    .login-input{
                        p{
                            line-height: 25px !important;
                            font-size: 14px !important;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="less">
    .login .container{
        /*加载样式*/
        .el-loading-mask{
            background-color: rgba(255,255,255,0.1) !important;
            .el-loading-spinner{
                margin-top: -10px !important;
                .circular{
                    width: 22px !important;
                    height: 22px !important;
                }
            }
        }
    }
    .login-input{
        .el-form-item{
            margin-bottom: 0 !important;
        }
        .el-input input{
            background:rgba(239,243,245,1) !important;
        }
        .el-input__prefix i{
            color: #333;
            font-weight: bold;
        }
    }
</style>
