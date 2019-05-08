import alert from './alert.js';

const install = function (Vue) {
    Vue.component(alert.name, alert);
    Vue.prototype.$alert = alert;
};


export default install

