// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 设置打包文件相对路径
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,// 取消EsLint代码检测
    // webpack配置
    chainWebpack: config => {
        /** 全局less文件注册**/
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ],
        externals: {
            'AMap': 'AMap', // 高德地图配置
            'BMap': 'BMap', // 百度地图配置
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,//作用是项目打包后，可以加密源码
    // css相关配置
    css: {
        // css预设器配置项
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
    },
    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa: {},
    runtimeCompiler: true,
    transpileDependencies: [
        /* string or regex */
    ],
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        https: false,
        hotOnly: false,
        port: 8038,
        host: '0.0.0.0',
        proxy: {
            // 配置跨域
            '/api': {
                target: 'http://localhost', // 线上服务
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    // 第三方插件的选项
    pluginOptions: {}
};

/**
 * Description:全局less文件注册
 * Author:''
 * Date:2020/5/5
 */
function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/assets/less/common.less'),
            ]
        })
}
