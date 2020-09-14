/**
 * @Description:动态组件component拼装以防止刷新空白的bug
 * @author:''
 * @Date:2020/5/5
 * @params:[0]对象源
 */
export default class {
  assemblingComponents(...params){
    params[0].map((value,key)=>{
      if(value.path === "/"){
        value.component = resolve => require([`@/views/Home`], resolve);
        value.meta.activeIndexs = '0';
        value.meta.defaultOpeneds = [];
      }else{
        value.component = resolve => require([`@/views${value.path}`], resolve);
        value.meta.activeIndexs = `${key}`;
        value.meta.defaultOpeneds = [];
      }
      if(value.children.length > 0){
        value.children.map((valueChild,key02)=>{
          valueChild.component = resolve => require([`@/views${valueChild.path}`], resolve);
          valueChild.meta.activeIndexs = `${key}-${key02}`;
          valueChild.meta.defaultOpeneds = [`${key}`];
          if(valueChild.children && valueChild.children.length > 0){
            valueChild.children.map((valueChildS,key03)=>{
              valueChildS.component = resolve => require([`@/views${valueChildS.path}`], resolve);
              valueChildS.meta.activeIndexs = `${key}-${key02}-${key03}`;
              valueChildS.meta.defaultOpeneds = [`${key}`,`${key}-${key02}`];
              if(valueChildS.children && valueChildS.children.length > 0){
                valueChildS.children.map((valueChildSS,key04)=>{
                  valueChildSS.component = resolve => require([`@/views${valueChildSS.path}`], resolve);
                  valueChildSS.meta.activeIndexs = `${key}-${key02}-${key03}-${key04}`;
                  valueChildSS.meta.defaultOpeneds = [`${key}`,`${key}-${key02}`,`${key}-${key02}-${key03}`];
                })
              }
            })
          }
        })
      }
    })
    return params[0];
  }
}
