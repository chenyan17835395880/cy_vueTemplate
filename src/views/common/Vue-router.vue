<template>
    <div id="Vue-router">
        <h3 style="color:#1d5e92;text-indent:28px;">
            Vue-router：路由就是SPA（单页应用）的路径管理器。因为Vue制作的都是单页应用，就相当于只有一个index.html页面，所以用<a></a>标签是不起作用的，必须使用Vue-router来进行路径管理。
        </h3>
        <h2>1、子路由：用router-view标签来放子路由的内容</h2>
        <!--有子路由的组件的name是不管用的-->
        <h2>2、参数传递：</h2>
        <p>
            name属性：{{$route.name}}<!--获取的是当前组件的name-->
        </p>
        <p>
            type参数1：{{$route.params.type}}
        </p>
        <p>
            type参数2：{{$route.query.type}}
        </p>
    </div>
</template>

<script>
    export default {
        name:'Vue-router',
        data(){
            return{

            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {vm.type = to.query.type});
        }
    }
</script>

<style lang="less">
    #Vue-router{
        padding:20px;
    }
</style>
