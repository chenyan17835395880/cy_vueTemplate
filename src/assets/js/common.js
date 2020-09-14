/**
 * @Description:全局js 模块引用 每个模块是一个实体类便于维护
 * @author:''
 * @Date:2020/5/5
 */
import assemblingComponentsClass from './assemblingComponentsClass'
import InDevelopment from './InDevelopment'

export default class {
    // 菜单循环
    assemblingComponents (...params) {
        let callback = new assemblingComponentsClass(...params);
        return callback.assemblingComponents(...params)
    };
    // 此功能正在开发中
    development(){
        let callback = new InDevelopment();
        return callback.development()
    }
}
