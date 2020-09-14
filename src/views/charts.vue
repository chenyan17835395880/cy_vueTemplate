<template>
    <div class="charts">
        <div class="onemodule">
            <div class="oneLeft" id="echartOne"></div>
            <div class="oneRight" id="viewerDom">
                <img data-original="../assets/img/login/bg.jpg" src="../assets/img/login/bg.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    export default {
        name: 'charts',
        data(){
            return {
                chartOne:null,
                date:[],
                data:[],
            }
        },
        mounted(){
            /*初始化统计图*/
            this.init_echartOne();
            /*图片放大*/
            var viewerDom = document.getElementById('viewerDom');
            var viewer = new Viewer(viewerDom,{'zIndex':'999'});
        },
        methods:{
            /*初始化echarts*/
            init_echartOne() {
                var _this = this;
                var base = +new Date(1968, 9, 3);
                var oneDay = 24 * 3600 * 1000;

                this.data = [Math.random() * 300];

                for(var i = 1; i < 20000; i++) {
                    var now = new Date(base += oneDay);
                    this.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                    this.data.push(Math.round((Math.random() - 0.5) * 20 + this.data[i - 1]));
                }
                _this.chartOne = _this.$echarts.init(document.getElementById('echartOne'));
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    title: {
                        left: 'center',
                        text: '大数据量面积图',
                    },
                    grid: {
                        left: '50',
                        top: '50',
                        right: '80',
                        bottom: '50',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: _this.date
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 10
                    }, {
                        start: 0,
                        end: 10,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [
                        {
                            name: '模拟数据',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            areaStyle: {
                                color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },
                            data: _this.data
                        }
                    ]
                };
                _this.chartOne.setOption(option);
                window.addEventListener('resize',function () {
                    _this.chartOne.resize();
                })
            }
        }
    }
</script>

<style scoped lang="less">
.charts{
    width:100%;
    padding:20px;
    .onemodule{
        width:100%;
        display:flex;
        justify-content: space-between;
        .oneLeft{
            width:49%;
            border:1px solid #ccc;
            height:350px;
        }
        .oneRight{
            width:49%;
            border:1px solid #ccc;
            height:350px;
            padding:5px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width:auto;
                height:auto;
                max-width:100%;
                max-height:100%;
            }
        }
    }
}
</style>
