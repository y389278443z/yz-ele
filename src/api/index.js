import fetch from '../utils/fetch';

// 位置相关
const ownLocation = () => fetch('/loc/guessCity');
const hotCity = () => fetch('/loc/hotCity');
const allCity = () => fetch('/loc/allCity');

const searchPlace = (name, word) => fetch('/loc/searchPlace', {
    city: name,
    keyWord: word
});

// 店铺相关
const msiteFoodTypes = () => fetch('/shop/classify');
const getShopList = (geohash, kind = '', sort_by = '', isNew = '', isNear = 1, page = 1) => {
    let params = {
        geohash,
        kind,
        page,
        sort_by,
        isNew,
        isNear
    };
    return fetch('/shop/getClassifyList', params);
};
const shopKind = () => fetch('/shop/getCategory');
// const deliveryKind = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
//     latitude,
//     longitude
// });
const searchShop = (geohash, keyword) => fetch('/shop/searchShop', {
    geohash,
    keyword
});
const shopDetail = (geohash, id) => fetch('/shop/getShop', {
    geohash,
    id
});
const menuList = (shopid) => fetch('/shop/getMenu/' + shopid);
const commentList = (has_content, tag_name, page) => fetch('/shop/getComment/', {
    has_content,
    tag_name,
    page
});


//登录注册
const getCode = () => fetch('/img/captchas', {}, "post");
const login = (username, password, code) => fetch('/user/login', {
    username,
    password,
    code
}, 'post');
const changePwd = (username, oldPwd, newPwd, newPwd2, code) => fetch('/user/changePwd', {
    username,
    oldPwd,
    newPwd,
    newPwd2,
    code
}, 'post');

// 获取所有地址
const getAddress = (user_id) => fetch('/user/'+ user_id +'/getAddress');

//添加地址
const addAddress = (user_id, address, address_detail, geohash, name, phone, phone_bk, sex, tag_type) => fetch('/user/' + user_id + '/addAddress', {
    user_id,
    address,
    address_detail,
    geohash,
    name,
    phone,
    sex,
    phone_bk,
    tag_type,
}, 'post');

// 删除地址
const deleteAddress = (user_id, id) => fetch('/user/' + user_id + '/' + id + '/deleteAddress' , {}, 'delete');

//搜索地址
const searchAddress = (keyword) => fetch('/v1/pois', {
    type: 'nearby',
    keyword
});

// 下订单
const addOrder = (user_id, shop_id, shop_name, shop_image_path, total_address, cart_list) => fetch('/user/' + user_id + '/addOrder', {
    shop_id,
    shop_name,
    shop_image_path,
    total_address,
    cart_list
}, 'post');

// 获取所有订单   https://elm.cangdu.org/bos/v2/users/1/orders?limit=10&offset=0
const getAllOrder = (user_id) => fetch('/user/' + user_id + '/getOrderList');

const getOrder = (user_id, restaurant_id) => fetch('/user/' + user_id + '/' + restaurant_id + '/getOrder');


// const getService = () => fetch('/v3/profile/explain');

//红包列表
const hongbaoList = (user_id, offset) => fetch('/promotion/v2/users/' + user_id + '/hongbaos', {
    limit: 20,
    offset
});


export {
    ownLocation,
    hotCity,
    allCity,
    searchPlace,
    msiteFoodTypes,
    getShopList,
    shopKind,
    searchShop,
    shopDetail,
    menuList,
    commentList,

    getCode,
    login,
    changePwd,
    getAddress,
    addAddress,
    deleteAddress,
    searchAddress,
    addOrder,
    getOrder,
    getAllOrder,

    hongbaoList
}
