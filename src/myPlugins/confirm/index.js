import confirm from './confirm.js';

const install = function (Vue) {
    Vue.component(confirm.name, confirm);
    Vue.prototype.$confirm = confirm;
}

export default install