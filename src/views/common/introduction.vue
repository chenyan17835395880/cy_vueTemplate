<template>
    <div id="Vue_introduction">
        <h1>Vue实例和内置组件</h1>
        <h2>1、example Methods Demo（实例）</h2>
        <div id="AppFather"></div>
        <button @click="add()">点击调用扩展实例内部的add方法</button>
        <h2>2、扩展实例调用自定义方法</h2>
        <h3>2-1、$destroy</h3>
        <button @click="destroyAppFather()">销毁扩展的实例</button>
        <h3>2-2、$forceUpdate</h3>
        <button @click="reload()">刷新</button>
        <h3>2-3、$nextTick()</h3>
        <h4 style="color:#1d5e92;text-indent:28px;"> 当data中有值被修改完成后会调用$nextTick(function(){})这个方法，和updated生命周期很像。</h4>
        <button @click="tick()">更改数据</button>
        <h2>3、实例事件$on、$once、$off：相当于在构造器外部增加一个构造器内部的事件，作用是可以像在构造器内部调用这个事件</h2>
        <h4 style="color:#1d5e92;text-indent:28px;">$on和$once这两个实例事件，有两个参数，第一个参数是事件名，第二个参数是匿名方法，是写在构造器的外部面的，然后在构造器外面要想调用此事件的话，可以用vm.$emit('事件名')来执行。</h4>
        <h4 style="color:#1d5e92;text-indent:28px;">$ff这个实例事件，是写在构造器的外部面的，然后在构造器外面要想调用此事件的话，直接用vm.$off('想要关闭的事件名')。</h4>
        <h3>3-1、$on：在构造器外部添加事件</h3>
        <div id="AppFather1"></div>
        <button @click="reduceNum()">reduce在扩展器外部减少appnum</button>
        <h2>3-2、$once：只能调用一次</h2>
        <button @click="reduceNumOnce()">在扩展器外部减少appnum，只减少一次</button>
        <h3>3-3、$off：关闭事件</h3>
        <button @click="off()">关闭reduce事件</button>
        <h2>4、内置组件：slot</h2>
        <chenyan :bolgUrl="chanyanData.bolgUrl">
            <!--先用标签的slot属性给自定义组件传递信息-->
            <span slot="netName">{{chanyanData.netName}}</span>
            <span slot="skill">{{chanyanData.skill}}</span>
            <span slot="sex">女</span>
        </chenyan>
    </div>
</template>

<script>
    import Vue from 'vue';
    var app = Vue.extend({
        template:  `<div><p>{{message}}------{{appnum}}</p><div><button @click="addNum()">增加appnum</button><button @click.once="reduceOnce()">只减一次appnum</button></div></div>`,
        data(){
            return {
                message:'Hello Hello，我是扩展实例',
                appnum:6
            }
        },
        mounted(){
            console.log('这是扩展实例AppFather的mounted');//在扩展实例挂载创建之后，就可以被打印出来了
        },
        destroyed(){
            console.log('创建的实例被销毁之后');
        },
        updated(){
            //console.log('update 更新之后')
        },
        methods:{
            add(){
                console.log('这是调用了扩展实例内部的add方法');
            },
            addNum(){
                this.appnum++;
            },
            reduceOnce(){
                var _this = this;
                console.log('在扩展其内部用.once修饰符只减一次');
                _this.appnum--;
            }
        }
    });
    var vm,vm1;
    export default {
        name:'Vue_introduction',
        data(){
            return{
                chanyanData:{
                    bolgUrl:'http://jspang.com',
                    netName:'chenyan陈妍',
                    skill:'Web前端'
                }
            }
        },
        components:{
            /*在自定义组件处，用slot标签的name属性来接受信息*/
            'chenyan':{
                template:`<div>
                    <p>博客地址：{{bolgUrl}}</p>
                    <p>名称：<slot name="netName"></slot></p>
                    <p>职业技能：<slot name="skill"></slot></p>
                    <p>性别：<slot name="sex"></slot></p>
                    </div>`,
                props:['bolgUrl']
            }
        },
        mounted(){
            //$('#Vue_introduction').html('这是引入jquery')
            vm = new app().$mount('#AppFather');
            vm1 = new app().$mount('#AppFather1');
            vm1.$on('reduce',function(){
                vm1.appnum--;
            });
            vm1.$once('reduceOnce',function(){
                console.log('在扩展器外部只减一次');
                vm.appnum--;
            });
        },
        methods:{
            destroyAppFather(){
                vm.$destroy();//就是调用创建的扩展中的生命周期destroyed(){}
            },
            add(){
                vm.add();
            },
            reload(){
                vm.$forceUpdate();
            },
            tick(){
                //当vm.message的值被修改完成后会调用$nextTick(function(){})这个方法，和updated生命周期很像。
                vm.message='update message Info';
                vm.$nextTick(function(){
                    console.log('vm.message更新之后要做的事');
                });
            },
            reduceNum(){
                //按钮在构造器的外部，可以利用$emit()来进行调用构造器的实例事件
                vm1.$emit('reduce');
            },
            reduceNumOnce(){
                vm1.$emit('reduceOnce');
            },
            off(){
                console.log('关闭了reduce事件');
                vm1.$off('reduce');
            }
        }
    }
</script>

<style lang="less">
    #Vue_introduction{
        padding:20px;
        overflow: auto;
    }
</style>
