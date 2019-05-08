import Vue from 'vue';
import confirmComponent from './confirm.vue';


let instance;

let ConfirmConstructor = Vue.extend(confirmComponent);

let initInstance = () => {
    if (instance) {
        instance.modelShow = true;
        instance.boxShow = true;
        instance.confirm();
    } else {
        instance = new ConfirmConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
    }
};


let confirm = (options = {}) => {
    initInstance();
    Object.assign(instance.$data, options);
    instance.modelShow = true;
    instance.boxShow = true;
    return instance.confirm();
};

export default confirm;
