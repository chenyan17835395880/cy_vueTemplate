<template>
    <div id="Vue_options">
        <h1>构造器里的选项option</h1>
        <hr>
        <!--在把构造器挂载到元素上的时候，用propsData传递一个参数，然后在扩展器内，用props接受-->
        <h2>1、propsData Option：用于扩展标签的数据传递</h2>
        <div id="header"></div>
        <h2>2、computed Option：用于对data中数据进行计算、大小写转换等操作，但不会污染原始数据</h2>
        <p style="color:red">{{newPrice}}</p>
        <ul>
            <li v-for="(item,index) in reverseNewsList" :key="index">{{item.title}}----{{item.date}}</li>
        </ul>
        <h2>3、methods Option：用来展现一些点击事件、鼠标移入事件等</h2>
        <p>{{a}}</p>
        <el-button size="small" @click="add(2,$event)">默认按钮</el-button>
        <!--1、$event：方法里面传的参数$event，可以获取到鼠标点击位置的所有信息-->
        <!--2、.native修饰符：给组件直接添加原始构造里的方法不管用，但是加上.native修饰符，直接调用原始构造里的方法就有用了。-->
        <ownBtn @click.native="add(2,$event)"></ownBtn>
        <!--3、在构造器外部，调用构造里面的方法，用声明的构造器调用，例如：app.add()-->
        <!--<button onclick="app.add(3)">外部button</button>-->
        <h2>4、watch Option：监控数据</h2>
        <!--第一种：是写在构造器里面的监控，watch:{}；第二种：是写在构造器的外边，app.$watch('要监控的数据',function(newVal,oldVal){})-->
        <p>今日温度：{{temperature}}°</p>
        <p>穿衣建议：{{dressAdvice}}</p>
        <p><button @click="riceTemperature()">升高温度</button><button @click="reduceTemperature()">降低温度</button></p>
        <h2>5、Mixins Option：混入选项操作</h2>
        <!--第一种用法：比如你的项目逻辑啥都写好了，后来就新添了新需求，就就可以用Mixins来进行添加，
            注意：混入的先执行，原生的后执行
        -->
        <!--第二种：全局API混入，写在main.js-->
        <!--执行顺序：先是全局的混入，再是组件内构造器外部的混入，最后是组件内构造器内自己的混入-->
        {{mixins_num}}
        <button @click="addMixinsNum()">addMixinsNum</button>
        <h2>extends Option：和Mixins Option的用法一样</h2>
    </div>
</template>

<script>
    import Vue from 'vue'
    var header_a=Vue.extend({
        template:`<p>{{message}}----{{count}}</p>`,
        data(){
            return {
                message:'Hello,I am Header'
            }
        },
        props:['count']
    });
    var header = new header_a({propsData:{count:1}}).$mount();

    var newsList=[
        {'title':'奔驰最强电动AMG来了','date':'2020/8/1'},
        {'title':'1200马力的EQR将正面迎战特斯拉','date':'2020/8/4'},
        {'title':'五菱要出平民豪车','date':'2020/8/4'},
        {'title':'特斯拉为何多次涉嫌夸大宣传被罚','date':'2020/8/7'},
    ];

    var ownBtn = {
        template:`<button>组件button</button>`
    };

    var addNewNeeds = {
        watch:{
            mixins_num(newVal){
                if(newVal>=10){
                    console.log('混入的：mixins_num>=10了')
                }
            }
        }
    };
    export default {
        name:'Vue_options',
        data(){
            return{
                price:100,
                newsList:newsList,
                a:1,
                temperature:14,
                dress:['T恤短袖','夹克长裙','棉衣羽绒服'],
                dressAdvice:'夹克长裙',
                mixins_num:1,
            }
        },
        components:{
            ownBtn
        },
        computed:{
            newPrice(){
                return '￥'+this.price+'元';
            },
            reverseNewsList(){
                return  this.newsList.reverse();
            }
        },
        mounted(){
            $('#header').append(header.$el);
        },
        methods:{
            add(num,event){
                if(num!==''){
                    this.a += num;
                }else{
                    this.a++;
                }
                //console.log(event);//可以获取到鼠标点击位置的所有信息
            },
            riceTemperature(){
                this.temperature+=5;
            },
            reduceTemperature(){
                this.temperature-=5;
            },
            addMixinsNum(){
                this.mixins_num++;
            }
        },
        mixins:[addNewNeeds],
        watch:{
            temperature(newVal,oldVal){
                if(newVal >= 26){
                    this.dressAdvice = this.dress[0];
                }else if(newVal < 26 && newVal>0){
                    this.dressAdvice = this.dress[1];
                }else{
                    this.dressAdvice = this.dress[2];
                }
            },
            mixins_num(newVal){
                if(newVal>=10){
                    console.log('原生的：mixins_num>=10了')
                }
            }
        }
    }
</script>

<style lang="less">
#Vue_options{
    padding:15px;
}
</style>
