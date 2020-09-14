<template>
    <div id="Vue_details">
        <h1>Vue API全局变量</h1>
        <hr>
        <h2>1、Vue.extend({})扩展实例构造器，用来扩展标签</h2>
        <div id="extend_Profile"></div>
        <h2>2、Vue.set()全局操作，在构造器外部操作构造器内部的数据、属性和方法</h2>
        <ul><li v-for="(item,index) in arr" :key="index">{{item}}</li></ul>
        <button @click="changeArr()">按钮</button>
        <h2>3、生命周期</h2>
        <button @click="destroy1()">销毁Vue实例</button>
        <h2>4、Template模板</h2>
        <!--第二种在标签里建模板，要在构造器里面渲染：template:'#temp2'-->
        <template id="temp2">
            <p style="color:orange;">这是标签模板</p>
        </template>
        <h2>5、component组件</h2>
        <!----组件写在构造器内部--------->
        <!--1、注册组件属性：先在标签内写一个属性，自己起的名字here="中国"；然后在定义组件的地方添加一个选项props:['here']来接受这个属性；最后在template内就可以直接使用插值{{here}}。有“-”的话，用驼峰式写法-->
        <cy hhh="陈妍"></cy><!--全局组件：在main.js中注册-->
        <panda here="中国"></panda><!--局部组件：在组件内单独写-->
        <!--2、在自定义组件中绑定data中的值，得用v-bind来进行绑定，这样在自定义组件中就可以渲染data中的值-->
        <panda :here="msg"></panda>
        <!----组件写到构造器外部---------->
        <pandaCom></pandaCom>
        <h2>6、标签component的属性is，来决定采用哪个组件</h2>
        <component :is="who"></component>
        <button @click="changeComponent()">切换组件</button>
    </div>
</template>

<!--<script type="x-template" id="temp3">
    <p style="color:yellow;">这是script标签模板</p>
</script>-->

<script>
    import Vue from 'vue'
    //建立父子组件
    var pandaChild = {
        template:`<h4 style="color:blueviolet;">这是一个局部组件的子组件---{{child}}</h4>`,
        props:['child']
    };
    var pandaComponent = {
        template:`
            <div>
                <h4 style="color:cornflowerblue;">这是一个局部组件，写在构造器外部</h4>
                <pandaChild child="子组件"></pandaChild>
            </div>
        `,
        components: {
            "pandaChild":pandaChild
        }
    };
    //自定义三个外部组件
    var componentA = {
        template:`<p style="color:darkred">这是componentA。</p>`
    };
    var componentB = {
        template:`<p style="color:orangered">这是componentB。</p>`
    };
    var componentC = {
        template:`<p style="color:darkblue">这是componentC。</p>`
    };
    // 1-extend、创建一个组件构造器
    var Profile = Vue.extend({
        template: '<p>{{text}}</p>',
        data: function () {
            return {
                text: 'Vue.extend扩展实例构造器-cy',
            }
        }
    });
    // 2-extend、创建 Profile 实例，并挂载到一个元素上。
    /*第一种方法：先在构造器外面声明let profile=new Profile().$mount();，然后在mounted里面$('#extend_Profile').append(profile.$el)*/
    /*第二种方法：直接在mounted里面new Profile().$mount('#extend_Profile')*/
    export default {
        name:'Vue_details',
        //第一种在构造器里直接建模板，适合很小的模板
        /*template:`
            <p style="color:red;">这是第一种方式建得template模板</p>
        `,*/
        template:'#temp2',
        components:{
            'panda': {
                template:'<h4 style="color:deeppink;">这是一个局部组件，熊猫来自{{here}}</h4>',
                props:['here']
            },
            'pandaCom': pandaComponent,
            componentA,
            componentB,
            componentC
        },
        data(){
            return{
                arr:['aaa','bbb','ccc'],
                msg:'这是data中的值',
                who:'componentA'
            }
        },
        methods:{
            changeArr(){
                //this.arr[1] = 'dd';//这样改变数组的某个元素没反应（这样改变对象{}的某个属性可以），然后就可以用Vue.set()
                Vue.set(this.arr,1,'dd');//这样就可以改变
            },
            destroy1(){
                //this.$destroy();//一经销毁，所有Vue实例上的操作都不管用了
            },
            changeComponent(){
                if(this.who === 'componentA'){
                    this.who = 'componentB'
                }else if(this.who === 'componentB'){
                    this.who = 'componentC'
                }else{
                    this.who = 'componentA'
                }
            }
        },
        beforeCreate:function(){
            console.log('1-beforeCreate 初始化之前');
        },
        created:function(){
            console.log('2-created 创建完成');
        },
        beforeMount:function(){
            console.log('3-beforeMount 挂载之前');
        },
        mounted:function(){
            console.log('4-mounted 被创建');
            // 3-extend、将Vue.extend()创建的插入到父元素内部
            //$('#extend_Profile').append(profile.$el);
            new Profile().$mount('#extend_Profile');
        },
        beforeUpdate:function(){
            console.log('5-beforeUpdate 数据更新前');
        },
        updated:function(){
            console.log('6-updated 被更新后');
        },
        activated:function(){
            console.log('7-activated');
        },
        deactivated:function(){
            console.log('8-deactivated');
        },
        beforeDestroy:function(){
            console.log('9-beforeDestroy 销毁之前');
        },
        destroyed:function(){
            console.log('10-destroyed 销毁之后')
        }
    }
</script>

<style lang="less">
#Vue_details{
    padding:15px;
}
</style>
