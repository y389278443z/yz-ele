import Vue from 'vue';
import messageComponent from './message.vue';


let instance;

let MessageConstructor = Vue.extend(messageComponent);

let initInstance = () => {
    if (!instance) {
        instance = new MessageConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
    } else {
        instance.$data.messageShow = true;
        instance.hideMessage();
    }
};

let message = (options = {}) => {
    initInstance();
    Object.assign(instance.$data, options);
    instance.messageShow = true;
};

export default message;

