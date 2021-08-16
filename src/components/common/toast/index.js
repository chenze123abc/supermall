import Toast from "./Toast"

const obj={};
obj.install =function(Vue){
    //1、创建组件构造器
    const ToastConstruct =Vue.extend(Toast);
    //2、new的方式根据组件构造器，创建组件对象
    const toast =new ToastConstruct();
    //3、组件对象 手动挂载到某一元素上面
    toast.$mount(document.createElement("div"));
    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    
    Vue.prototype.$toast=toast;
}
export default obj;