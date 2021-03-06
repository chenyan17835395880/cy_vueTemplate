/**
 * @Description:全局配置正则表达式
 * @author:''
 * @Date:2020/5/5
 */
export default {
  /** 姓名 **/
  name:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}/,
  /** 身份证 **/
  identity:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  /** 手机号 **/
  phone:/^1(3|4|5|6|7|8|9)\d{9}$/,
  /** 银行卡卡号 **/
  bankCode: /^([1-9]{1})(\d{14,20})$/,
  /** 昵称 **/
  nickname:/^.{2,10}$/,
  /** 密码 **/
  password:/^[A-Za-z0-9]{6,15}$/,
  /** 验证码 **/
  code:/^\d{4}$/,
  /** 字母或者数字 **/
  letterAndNumber:/[a-z]|[A-Z]|[0-9]/,
  /** 网址 **/
  url:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
  /** 价格 **/
  price:/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
}
