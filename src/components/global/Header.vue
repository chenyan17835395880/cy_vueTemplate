<template>
    <div class="header"><!-- v-show="$route.name === 'Login'"-->
        <img class="logo_contain" src="../../assets/img/login/logo_contain.png" />
        <div class="main-function">
            <div class="personal-information" v-show="$route.name !== 'Login'">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img src="../../assets/img/login/userIcon.png">
                        <span>{{$store.state.username}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">个人信息</el-dropdown-item>
                        <el-dropdown-item command="b">修改密码</el-dropdown-item>
                        <el-dropdown-item command="c">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!--弹出层-->
        <el-dialog
                :modal-append-to-body='false'
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="30%">
            <div class="dialog-content">
                <div class="content-box" v-if="dialogType == 'a'"></div>
                <div class="content-box" v-if="dialogType == 'b'"></div>
                <div class="content-box" v-if="dialogType == 'c'">
                    <p style="text-align: center">是否退出登录?</p>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitButton">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                /** 弹出层相关参数 **/
                // 弹出层显示（隐藏）绑定值
                dialogVisible: false,
                // 弹出层标题
                dialogTitle: "",
                // 操作类型参数
                dialogType: "",
            }
        },
        methods: {
            /**
             * Description:操作用户信息
             * Author:''
             * Date:2020/5/5
             * @param command：a-个人信息；b-修改密码；c-退出登录
             */
            handleCommand(command){
                this.dialogVisible = true;
                this.dialogType = command;
                if (command == "a") {
                    this.dialogTitle = "个人信息";
                } else if (command == "b") {
                    this.dialogTitle = "修改密码";
                } else if (command == "c") {
                    this.dialogTitle = "退出登录";
                }
            },
            commitButton(){
                this.dialogVisible = false;
                if (this.dialogType == "a") {

                } else if (this.dialogType == "b") {

                } else if (this.dialogType == "c") {
                    localStorage.clear();
                    sessionStorage.clear();
                    this.$router.push({
                        path: '/views/Login',
                        name: 'Login'
                    });
                }
            },
        },
        created(){
            if (this.$route.name !== 'Login') {
                let userInfo = JSON.parse(sessionStorage.getItem('isLogin'));
                this.$store.commit('changeUsername', userInfo.username);
            }
        }
    }
</script>

<style scoped lang="less">
    /*采用flex布局*/
    .header{
        height: 56px;
        line-height: 56px;
        padding: 0 20px;
        /*display: flex;*/
        .logo_contain{
            width:400px;
          height: 40px;
            margin: 4px 0 4px 5%;
            /*display: flex;*/
            /*justify-content:flex-start;*/
            /*align-items: center;*/
        }
        .main-function{
            display: flex;
            justify-content:flex-end;
            align-items: center;
            flex-grow: 1; // 剩余部分充满
            height: 100%;
            .el-dropdown{
                cursor: pointer;
                .el-dropdown-link{
                    img{
                        width: 30px;
                        height: 30px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }

</style>
