/**
 * Description:全局配置文件（默认路径，提示语等）
 * Author:''
 * Date:2020/5/5
 */
const API_URL = "/."; // http://192.168.144.125:50018

export default {
  /** 路由转发 **/
  API_CONFIG:process.env.NODE_ENV==='development' ? '/api' : API_URL,

}
