<template>
    <!--产权信息-开始-->
    <div id="property-list" v-loading="loading">
        <el-form class="search-area"  ref="searchform" :model="searchform" label-width="66px">
              <el-form-item label="姓名：" prop="name">
                   <el-input v-model="searchform.name"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="sex">
                  <el-select v-model="searchform.sex">
                       <el-option v-for="(item,index) in searchform.sexs" :value="item" :label="item" :key="index"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="地址：" prop="address">
                   <el-input v-model="searchform.address"></el-input>
              </el-form-item>
              <el-row>
                   <el-button type="success" size="small" icon="el-icon-search" round @click="search()">搜索</el-button>
                   <el-button type="warning" size="small" icon="el-icon-refresh" round @click="reset('searchform')">重置</el-button>
                   <el-button type="warning" size="small" icon="el-icon-download" round @click="exportList()">导出</el-button>
              </el-row>
        </el-form>
        <div class="main-content">
            <!--列表-->
            <div id="tableList" class="content-box">
                <div class="table-list">
                    <el-table
                        :data="tableData"
                        border
                        height="100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                              <template slot-scope="scope">
                                  <el-button type="success " size="small" icon="el-icon-zoom-in" @click="editScope(scope)">编辑</el-button>
                                  <el-button type="success " size="small" icon="el-icon-zoom-in" @click="seeScope(scope)">查看</el-button>
                              </template>
                        </el-table-column>
                    </el-table>
                  </div>
                  <div class="pagination">
                    <el-pagination v-if="isShowPage"
                                   class="no-shadow"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="[15, 25, 50, 100]"
                                   :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="count">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false" width="400px">
            <el-form :model="form">
                <el-form-item label="日期：" :label-width="formLabelWidth">
                    <el-input v-model="form.date" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别：" :label-width="formLabelWidth">
                    <el-select v-model="form.sex" placeholder="请选择性别" :disabled="disabled">
                        <el-option label="男" value="shanghai"></el-option>
                        <el-option label="女" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: right;">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('form',sign)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /*import FileSaver from "file-saver";
    import XLSX from "xlsx";*/
    export default {
        name:'tableList',
        data () {
            return {
                // 全局加载
                loading: false,
                // 搜索条件表单
                searchform:{
                    date: '',
                    streetOffice:'',
                    sex: '',
                    sexs: ['男', '女'],
                    address: ''
                },
                //查看和编辑表单
                form:{
                    date:'',
                    name:'',
                    sex:'',
                    address:''
                },
                //区分查看和编辑的标记
                sign:0,
                //定义label的宽度
                formLabelWidth: '120px',
                //表格数据
                tableData:[
                    {
                        name: '王小虎',
                        date: '2020-7-14',
                        sex: '男',
                        address: '上海市普陀区金沙江路'
                    }, {
                        name: '王小妞',
                        date: '2020-7-20',
                        sex: '女',
                        address: '西安市雁塔区'
                    }, {
                        name: '王小虎3',
                        date: '2020-7-25',
                        sex: '男',
                        address: '运城市'
                    }
                 ],
                //是否显示分页
                isShowPage:true,
                // 页码
                currentPage: 1,
                // 每页显示的数据量
                pageSize: 15,
                // 总数据量
                count: 0,
                //控制弹出层是否显示
                dialogFormVisible:false,
                //dialog的title是查看还是编辑
                title:'',
                //input是否可编辑
                disabled:true
            }
        },
        methods: {
            //搜索
            search(){
                console.log(this.searchform.sex)
            },
            //重置
            reset(formName){
                //this.form={brand_right:0}
                this.$refs[formName].resetFields();//必须要给<el-form-item label=":" prop="">绑定prop属性，不然不管用
            },
            //导出
            exportList(){
              /*var xlsxParam = { raw: true };//转换成excel时，使用原始的格式
              var wb = XLSX.utils.table_to_book(document.querySelector("#tableList"),xlsxParam);
              var wb_options='';
              for(var key in wb.Sheets.Sheet1){
                console.log((wb.Sheets.Sheet1)[key])
                if((wb.Sheets.Sheet1)[key] !== '操作'){
                  wb_options[key] = (wb.Sheets.Sheet1)[key]
                }
                if((wb.Sheets.Sheet1)[key] !== '产权单位详情'){
                  wb_options[key] = (wb.Sheets.Sheet1)[key]
                }
              }
              console.log(wb.Sheets.Sheet1)
              var wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
              });
              try {
                FileSaver.saveAs(
                  new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
                  "sheetjs.xlsx"
                );
              } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
              }
              return wbout;*/
            },
            //编辑scope
            editScope(scope){
                this.title='编辑';
                this.sign = 1;
                this.disabled = false;
                this.dialogFormVisible = true;
                //将数据传入dialog页面
                this.form = Object.assign({}, scope.row);
            },
            //查看scope
            seeScope(scope){
                this.title='查看';
                this.sign = 0;
                this.disabled = true;
                this.dialogFormVisible = true;
                //将数据传入dialog页面
                this.form = Object.assign({}, scope.row);
            },
            //点击查看和编辑的确定
            submitForm(form,sign){
                if(sign === 0){
                    this.dialogFormVisible = false;
                }else if(sign === 1){

                }
            },
            /**
             * Description:切换每页数量
             * Author:cy
             * Date:2020/6/18
             * @param size：每页显示的数量
             */
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            /**
             * Description:切换页码
             * Author:cy
             * Date:2020/6/18
             * @param currentPage：页码
             */
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
        }
    }
</script>

<style scoped lang="less">
    #property-list{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 15px;
        overflow: auto;
        .el-form{
            display:flex;
            .el-form-item{
                margin-right:10px;
            }

        }
    }
    #tableList{
        height:100%;
        display: flex;
        flex-direction: column;
        .table-list{
            flex: 1;
            .el-table{
                .el-button--small, .el-button--small.is-round{
                    height: 25px !important;
                    padding: 4px 6px !important;
                    font-weight: bold;
                    i{
                        font-weight: bold !important;
                    }
                }
            }
        }
    }
</style>

<style>
  .el-form-item__label{
      font-size:13px;
      padding: 0;
      line-height: 30px;
      color: #333;
  }
  .el-form-item__content{
      width:180px;
      font-size: 13px;
      line-height: 30px;
  }
  .el-row,.el-form-item{
      margin-bottom:10px;
  }
  .el-dialog .dialog-footer .el-button[data-v-ad3cdb56] {
      font-size: 14px !important;
      width: auto !important;
      height: auto !important;
  }
</style>
