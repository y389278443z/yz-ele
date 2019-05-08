let SHOP_DETAIL = 'SHOP_DETAIL',
    REMARK_INFO = 'REMARK_INFO',
    SET_ADDRESS_CHOICE = 'SET_ADDRESS_CHOICE',
    CHOICED_ADDRESS = 'CHOICED_ADDRESS',
    CART_INFO = 'CART_INFO',
    ORDER_DETAIL = 'ORDER_DETAIL',
    CHOICE_INDEX = 'CHOICE_INDEX',
    DEFAULT_ADDRESS = 'DEFAULT_ADDRESS';



export default {
    [SHOP_DETAIL](state, detail) {
        state.shopDetail = detail;
    },
    [REMARK_INFO](state, info) {
        state.remarkInfo = info;
    },
    [SET_ADDRESS_CHOICE](state) {
        state.isAddressChange = !state.isAddressChange;
    },
    [CART_INFO](state, info) {
        state.cartInfo = info;
    },
    [ORDER_DETAIL](state, info) {
        state.orderDetail = info;
    },
    [CHOICED_ADDRESS](state, address) {
        state.choiceAddress = address;
    },
    [CHOICE_INDEX](state, index) {
        state.choiceIndex = index;
    },
    [DEFAULT_ADDRESS](state, address) {
        state.defaultAddress = address;
    }
}
