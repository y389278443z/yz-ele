import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutation'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        shopDetail: null,
        remarkInfo: [],
        isAddressChange: false,
        cartInfo: null,
        orderDetail: null,
        choiceAddress: null,
        choiceIndex: null,
        defaultAddress: null
    },
    getters,
    mutations,
    actions: {}
})
