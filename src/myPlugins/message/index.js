import message from './message.js';

const install = (Vue) => {
    Vue.component(message.name, message);
    Vue.prototype.$msg = message;
};

export default install