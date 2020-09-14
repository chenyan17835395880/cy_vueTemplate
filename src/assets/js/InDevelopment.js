/**
 * Description:显示页面正在开发中弹框
 * Author:''
 * Date:2020/5/5
 */
import Vue from '../../main.js';
export default class{
    development(){
        Vue.$confirm('此功能正在开发中……', {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            center: true,
            showClose: false,
            confirmButtonClass: 'el-button',
        }).then(() => {

        }).catch(() => {

        })
        return
    }
}
