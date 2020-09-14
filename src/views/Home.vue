<template>
    <div class="home-page">
        <!--<div style="width: 100%;text-align: center;  position: relative;  top: 30%;  ">-->
            <!--<img src="../assets/img/module/welcome.png" alt="welcome" style="max-width: 100%;">-->
        <!--</div>-->
        <div id="container1">
            <div class="showPoint">是否显示点位：<el-switch v-model="isShowPoint" @change="switchShowPoint()"></el-switch></div>
        </div>
        <div id="container2"></div>

        <!--<div id="markerInfo" style="width:230px;height:120px;display:none;">
            <div>媒体地址：第{{markerIndex}}个</div>
            <div id="markerImage" style="display:flex;width:240px;height:100px;">
                <img data-original="/img/bg.a642fc93.png" src="/img/bg.a642fc93.png" style="width:100px;height:100px;margin-right:5px;">
                <img data-original="/img/bg.f9f49138.jpg" src="/img/bg.f9f49138.jpg" style="width:100px;height:100px;">
            </div>
        </div>-->
    </div>
</template>

<script>
    import image1 from '../assets/img/login/bg.png'
    import image2 from '../assets/img/login/bg.jpg'
    import AMap from 'AMap' // 引入高德地图
    import BMap from 'BMap' // 引入百度地图
    import Viewer from 'viewerjs'
    import 'viewerjs/dist/viewer.css';
    import Swiper from "swiper"
    export default {
        name: 'Home',
        data() {
            return {
                markers:[
                    {
                        address:'上海市徐汇区小木桥路470号',
                        id: "d4378a71945248fe8ab4e1f3af20628e",
                        position:[ 121.460609,31.19331] ,
                        level: "市级",
                        name: "上海市公共法律服务中心",
                        url: "http://sh.12348.gov.cn/sites/12348/zxspace/org-detail.jsp?entityId=d4378a71945248fe8ab4e1f3af20628e"
                    },
                    {
                        address: "南丹东路60号",
                        id: "d4378a718fc14dd996b83bb7f1ea1d46",
                        position:[121.444415,31.190249] ,
                        level: "区级",
                        name: "徐汇区公共法律服务中心",
                        url: "http://sh.12348.gov.cn/sites/12348/zxspace/org-detail.jsp?entityId=d4378a718fc14dd996b83bb7f1ea1d46"
                    }
                 ],
                //高德地图
                GDMap:null,
                //所有点位集合
                allMarkers:[],
                //是否显示点位
                isShowPoint:true
            }
        },
        methods: {
            initMap() {
                // 高德地图初始化
                this.GDMap = new AMap.Map('container1', {
                    zoom: 11,
                    center: [121.460609,31.19331],
                    resizeEnable: true,
                });

                /* 初始化搜索插件开始 */
                var placeSearch,_this = this;
                AMap.plugin(["AMap.PlaceSearch"], function() {
                    placeSearch = new AMap.PlaceSearch({
                        city: '[[${@config.getKey("sys.index.city")}]]', // 兴趣点城市
                        panel: 'panel',  // 结果列表将在此容器中进行展示
                        renderStyle: 'default',
                        map: _this.GDMap
                    });
                });
                /* 初始化搜索插件结束 */

                this.GDMap.clearMap();//清除覆盖物
                this.showPoint();

                // 百度地图初始化
                let BDMap = new BMap.Map('container2');
                BDMap.centerAndZoom(new BMap.Point(108.927135, 34.277151), 10);  // 初始化地图,设置中心点坐标和地图级别
                BDMap.setCurrentCity("西安市");          // 设置地图显示的城市 此项是必须设置的
                BDMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                BDMap.addOverlay(new BMap.Marker(new BMap.Point(108.927135, 34.277151))); // 地图添加点位
                var geoc = new BMap.Geocoder();
                BDMap.addEventListener("click", function(e) {
                    BDMap.clearOverlays(); // 清除点位
                    var marker = new BMap.Marker(e.point);
                    BDMap.addOverlay(marker); // 添加点位
                    geoc.getLocation(e.point, function(rs) {
                        console.log(rs, "点击");
                    });
                });
            },
            //显示点位
            showPoint(){
                //var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -34)});
                var markers = null;
                var isShowLabel = true;
                var _this = this;
                // 创建一个 Icon
                let Icon = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(40, 40),
                    // 图标的取图地址
                    image: 'https://a.amap.com/jsapi_demos/static/resource/img/%E6%B4%97%E6%89%8B%E9%97%B4.png',
                    // 图标所用图片大小（实现显示大小）
                    imageSize: new AMap.Size(20, 20),
                    // 图标取图偏移量
                    // imageOffset: new AMap.Pixel(-9, -3)
                });
                this.markers.forEach((mark,index)=>{
                    var marker = new AMap.Marker({
                        map:_this.GDMap,
                        icon:Icon,
                        position:[mark.position[0],mark.position[1]],
                        //offset:new AMap.Pixel(-13,-30)
                    });
                    marker.setMap(_this.GDMap); // 将点标记添加到地图
                    _this.GDMap.setFitView();// 执行定位
                    marker.on('click', function(e){
                        //清除其他点标记的内容
                        if(markers){
                            markers.setLabel({
                                content: ""
                            });
                        }
                        //控制是否显示点标记内容
                        if(markers === marker){
                            isShowLabel = false;
                        }else{
                            isShowLabel = true;
                        }
                        //记录上一个被点击的标记点
                        markers = marker;
                        if (isShowLabel) {
                            /*var infoWindow = new AMap.InfoWindow({
                                content: '<div id="marker'+ index +'"><div>媒体地址：'+ mark.address +'</div>'
                                    +'<div id="markerImage" style="display:flex;">图片：'
                                    +'<div class="swiper-container">'
                                    +'<div class="swiper-wrapper">'
                                    +'<div class="swiper-slide" style="width:180px;"><img data-original="'+ image1 +'" src="'+ image1 +'" style="height:100px;margin-right:5px;"></div>'
                                    +'<div class="swiper-slide" style="width:180px;"><img data-original="'+ image2 +'" src="'+ image2 +'" style="height:100px;"></div>'
                                    +'</div>'
                                    +'<div class="swiper-button-prev"></div>'
                                    +'<div class="swiper-button-next"></div>'
                                    +"<div class='swiper-pagination' slot='pagination'></div>"
                                    +'</div></div></div>',
                                size: new AMap.Size(300, 200),
                                anchor: 'middle-left',
                                offset: new AMap.Pixel(0, -20),
                                autoMove: false
                            });
                            infoWindow.open(_this.GDMap,[mark.position[0],mark.position[1]]);*/
                            marker.setLabel({
                                offset: new AMap.Pixel(-10, -10),  //设置文本标注偏移量
                                content : '<div id="marker'+ index +'"><div>媒体地址：'+ mark.address +'</div>'
                                    +'<div id="markerImage" style="display:flex;">图片：'
                                    +'<div class="swiper-container">'
                                    +'<div class="swiper-wrapper">'
                                    +'<div class="swiper-slide" style="width:180px;"><img data-original="'+ image1 +'" src="'+ image1 +'" style="height:100px;margin-right:5px;"></div>'
                                    +'<div class="swiper-slide" style="width:180px;"><img data-original="'+ image2 +'" src="'+ image2 +'" style="height:100px;"></div>'
                                    +'</div>'
                                    +'<div class="swiper-button-prev"></div>'
                                    +'<div class="swiper-button-next"></div>'
                                    +"<div class='swiper-pagination' slot='pagination'></div>"
                                    +'</div></div>'
                                    +'<button type="button" id="pointButton">跳转按钮</button>'
                                    +'</div>',
                                direction:'right'
                            });

                            //点击信息框的按钮进行路由跳转
                            $('#pointButton').click(function(){
                                _this.$router.push({
                                    name: "Vue_details",
                                    query: {
                                        mediaID: '详情'
                                    }
                                });
                                // 动态添加打开标签——开始
                                let editableTabs = JSON.parse(sessionStorage.getItem('editableTabs'));
                                //如果已经打开了，则不添加
                                for (let i = 0; i < editableTabs.length; i++) {
                                    if (editableTabs[i].name === "Vue_details") {
                                        return;
                                    }
                                }
                                editableTabs.push({
                                    path: '/views/common/details',
                                    name: 'Vue_details',
                                    label: "API全局变量",
                                    meta: {
                                        loginCheck: true,  // 是否需要登录
                                    },
                                    close: true,
                                });
                                sessionStorage.setItem('editableTabs', JSON.stringify(editableTabs));
                            });

                            //图片放大
                            new Viewer(document.getElementById("markerImage"),{"url": "data-original"});

                            // 轮播图
                            new Swiper(".swiper-container", {
                                // 每页展示数量
                                slidesPerView: 1,
                                // 间距
                                spaceBetween: 10,
                                // 如果需要分页器 这样写小圆点就有了
                                pagination: {
                                    el: ".swiper-pagination",
                                    clickable: true
                                },
                                // 切换按钮
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                },
                            });
                        }else{
                            markers = null;
                        }
                    });

                    this.allMarkers.push(marker);
                });
            },
            /*是否显示点位开关事件*/
            switchShowPoint(){
                if(this.isShowPoint){
                    //初始化地图
                    this.showPoint();
                }else{
                    //清除所有点位
                    /*this.GDMap.remove(this.allMarkers);*/
                    //清除所有覆盖物
                    this.GDMap.clearMap();
                }
            }
        },
        created() {
            if (JSON.parse(sessionStorage.getItem('isLogin'))) {
                // 设置用户名显示信息
                let userInfo = JSON.parse(sessionStorage.getItem('isLogin'));
                this.$store.commit('changeUsername', userInfo.userName);
            }
        },
        mounted () {
            // 初始化地图
            this.initMap();
        }
    }
</script>

<style scoped lang="less">
    .home-page {
        display: flex;
        flex-direction: row;
        flex: 1;
        padding: 15px;
        #container1{
            flex-basis: 50%;
            margin-right: 15px;
            background-color: #fff;
            border-radius: 6px;
            border: 1px solid #ddd;
            .showPoint{
                position:absolute;
                top:10px;
                left:10px;
                z-index: 99;
                background: #fff;
                border: 1px solid #ccc;
                padding:10px;
            }
        }
        #container2{
            flex-basis: 50%;
            background-color: #fff;
            border-radius: 6px;
            border: 1px solid #ddd;
        }
    }
</style>
<style>
    .amap-icon img, .amap-marker-content img{
        width: 25px;
        height: 34px;
    }
    .amap-marker-label{
        border:1px solid #ccc;
        width: 265px;
        z-index: 99;
    }
    .el-carousel__container{
        width:100%;
        height:100%;
    }
    #pointButton{
        display: block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0 auto;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 5px 7px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
    }
</style>
