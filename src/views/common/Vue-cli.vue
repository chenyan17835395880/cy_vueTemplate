<template>
    <div id="Vue-cli">
        <h3 style="color:#1d5e92;">
            Vue-cli：vue脚手架，用来快速搭建一个vue项目，包括webpack、命令等。
        </h3>
        <button @click="changehhh()" style="color:green;margin-top:20px;">
            点击跳转到Vue-router
            <!--<router-link :to="{name:'Vue-router',params:{id:'888'}}">Vue-router</router-link>-->
        </button>
    </div>
</template>

<script>
    export default {
        name:'Vue-cli',
        data(){
            return{

            }
        },
        methods:{
            changehhh(){
                var type = 22;
                // 跳转路由页面
                this.$router.push({
                    name: "Vue-router",
                    params: {
                        type: 22
                    },
                    query:{
                        type:23
                    }
                });
                // 动态添加打开标签——开始
                let editableTabs = JSON.parse(sessionStorage.getItem('editableTabs'));
                //如果已经打开了，则不添加
                for (let i = 0; i < editableTabs.length; i++) {
                    if (editableTabs[i].name === "Vue-router") {
                        return;
                    }
                }
                editableTabs.push({
                    path: '/views/common/Vue-router',
                    name: 'Vue-router',
                    label: "Vue-router",
                    meta: {
                        label: "Vue-router",
                        loginCheck: true,  // 是否需要登录
                    },
                    close: true,
                });
                sessionStorage.setItem('editableTabs', JSON.stringify(editableTabs));
                // 动态添加打开标签——结束
            }
        }
    }
</script>

<style lang="less">
    #Vue-cli{
        padding:20px;
    }
</style>
