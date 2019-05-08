import  Vue from 'vue';
import alertComponent from './alert.vue';


let instance;

let AlertConstructor = Vue.extend(alertComponent);

let initInstance = () => {
    if (!instance) {
        instance = new AlertConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
    } else {
        instance.$data.success = null;
    }
};


let alert = (options = {}) => {
    initInstance();
    Object.assign(instance.$data, options);
    instance.modelShow = true;
    instance.boxShow = true;
};

export default alert;
