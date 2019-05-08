import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'
import {getStorage} from "./utils";

// const  home = r => require.ensure( [], () => r (require('../../common/home.vue')))

const ChoiceCity = r => require.ensure( [], () => r (require('./views/home/choiceCity.vue')));
const ChoicePlace = r => require.ensure( [], () => r (require('./views/home/choicePlace.vue')));

const About = r => require.ensure( [], () => r (require('./views/about/about.vue')));
const Login = r => require.ensure( [], () => r (require('./views/login/login.vue')));
const ChangePwd = r => require.ensure( [], () => r (require('./views/login/changePwd.vue')));

const Msite = r => require.ensure( [], () => r (require('./views/msite/msite.vue')));
const ShopDetail = r => require.ensure( [], () => r (require('./views/msite/shopDetail.vue')));
const Qualify = r => require.ensure( [], () => r (require('./views/msite/qualify.vue')));
const ShopClassify = r => require.ensure( [], () => r (require('./views/msite/shopClassify.vue')));

const Search = r => require.ensure( [], () => r (require('./views/search/search.vue')));
const Order = r => require.ensure( [], () => r (require('./views/order/order.vue')));
const OrderDetail = r => require.ensure( [], () => r (require('./views/order/orderDetail.vue')));
const Profile = r => require.ensure( [], () => r (require('./views/profile/profile.vue')));
const UserInfo = r => require.ensure( [], () => r (require('./views/profile/userInfo.vue')));
const ChangeUserName = r => require.ensure( [], () => r (require('./views/profile/changeUserName.vue')));
const Benefit = r => require.ensure( [], () => r (require('./views/profile/benefit.vue')));
const Hongbao = r => require.ensure( [], () => r (require('./views/profile/hongbao.vue')));
const Coupon = r => require.ensure( [], () => r (require('./views/profile/coupon.vue')));
const Gold = () => r => require.ensure( [], () => r (require('./views/profile/gold.vue')));
const Address = r => require.ensure( [], () => r (require('./views/profile/address.vue')));
const AddAddress = r => require.ensure( [], () => r (require('./views/profile/addAddress.vue')));
const SearchAddress = r => require.ensure( [], () => r (require('./views/profile/searchAddress.vue')));
const HbHistory = r => require.ensure( [], () => r (require('./views/profile/hbHistory.vue')));
const EcHongbao = r => require.ensure( [], () => r (require('./views/profile/exchange.vue')));
const Vip = () => r => require.ensure( [], () => r (require('./views/vip/vip.vue')));
const Exchange = r => require.ensure( [], () => r (require('./views/vip/exchange.vue')));
const VipList = r => require.ensure( [], () => r (require('./views/vip/vipList.vue')));
const Share = r => require.ensure( [], () => r (require('./views/profile/share.vue')));
const Download = r => require.ensure( [], () => r (require('./views/profile/download.vue')));

const Service = r => require.ensure( [], () => r (require('./views/service/service.vue')));
const Privacy = r => require.ensure( [], () => r (require('./views/service/privacy.vue')));
const ServiceDetail = r => require.ensure( [], () => r (require('./views/service/serviceDetail.vue')));

const ConfirmOrder = r => require.ensure( [], () => r (require('./views/confirmOrder/confirmorder.vue')));
const Pay = r => require.ensure( [], () => r (require('./views/confirmOrder/pay.vue')));
const Remark = r => require.ensure( [], () => r (require('./views/confirmOrder/remark.vue')));
const CAddress = r => require.ensure( [], () => r (require('./views/confirmOrder/address.vue')));
const CAddAddress = r => require.ensure( [], () => r (require('./views/confirmOrder/addAddress.vue')));
const CSearchAddress = r => require.ensure( [], () => r (require('./views/confirmOrder/searchAddress.vue')));

Vue.use(Router);

let router =  new Router({
  routes: [
      {
          path: '/',
          component: Home,
          redirect: 'choiceCity',
          children: [
              {
                  path: 'choiceCity',
                  name: 'choiceCity',
                  component: ChoiceCity
              },
              {
                  path: 'choicePlace/:cityName',
                  name: 'choicePlace',
                  component: ChoicePlace
              }
          ]
      },
      {
          path: '/msite',
          name: 'msite',
          component: Msite
      },
      {
          path: '/msite/shopDetail/:id',
          name: 'shopDetail',
          component: ShopDetail,
          children: [
              {
                  path: 'qualify',
                  name: 'qualify',
                  component: Qualify
              }
          ]
      },
      {
          path: '/miste/shopClassify',
          name: 'shopClassify',
          component: ShopClassify
      },
      {
          path: '/search/:geohash',
          name: 'search',
          component: Search
      },
      {
          path: '/order',
          name: 'order',
          component: Order,
          meta: {needs: true}
      },
      {
          path: '/order/orderDetail/:restaurant_id',
          name: 'orderDetail',
          component: OrderDetail
      },
      {
          path: '/profile',
          name: 'profile',
          component: Profile
      },
      {
          path: '/profile/userInfo',
          name: 'userInfo',
          component: UserInfo,
          meta: {needs: true}
      },
      {
          path: '/profile/userInfo/changeUserName',
          name: 'changeUserName',
          component: ChangeUserName
      },
      {
          path: '/profile/benefit',
          name: 'benefit',
          component: Benefit,
          redirect: {name: 'hongbao'},
          children: [
              {
                  path: 'hongbao',
                  name: 'hongbao',
                  component: Hongbao
              },
              {
                  path: 'coupon',
                  name: 'coupon',
                  component: Coupon
              }
          ]
      },
      {
          path: '/profile/gold',
          name: 'gold',
          component: Gold
      },
      {
          path: '/profile/address',
          name: 'address',
          component: Address,
          meta: {needs: true},
          children: [
              {
                  path: 'addAddress',
                  name: 'addAddress',
                  component: AddAddress,
                  children: [
                      {
                          path: 'searchAddress',
                          name: 'searchAddress',
                          component: SearchAddress
                      }
                  ]
              }
          ]
      },
      {
          path: '/profile/benefit/history',
          name: 'hbHistory',
          component: HbHistory
      },
      {
          path: '/exchangehongbao',
          name: 'exchangehongbao',
          component: EcHongbao
      },
      {
          path: '/vip',
          name: 'vip',
          component: Vip
      },
      {
          path: '/vip/exchange',
          name: 'exchange',
          component: Exchange
      },
      {
          path: '/vip/vipList',
          name: 'vipList',
          component: VipList
      },
      {
          path: '/profile/share',
          name: 'share',
          component: Share,
          meta: {needs: true}
      },
      {
          path: '/profile/download',
          name: 'download',
          component: Download
      },
      {
          path: '/service',
          name: 'service',
          component: Service,
          children: [
              {
                  path: 'sDetail',
                  name: 'sDetail',
                  component: ServiceDetail
              }
          ]
      },
      {
          path: '/service/privacy',
          name: 'privacy',
          component: Privacy
      },
      {
          path: '/confirmorder/:id',
          name: 'confirmOrder',
          component: ConfirmOrder,
          meta: {needs: true},
          children: [
              {
                 path: 'remark',
                 name: 'remark',
                 component: Remark
              },
              {
                  path: 'caddress',
                  name: 'caddress',
                  component: CAddress,
                  children: [
                      {
                          path: 'caddAddress',
                          name: 'caddAddress',
                          component: CAddAddress,
                          children: [
                              {
                                  path: 'csearchAddress',
                                  name: 'csearchAddress',
                                  component: CSearchAddress
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      {
          path: '/pay/:restaurant_id',
          name: 'pay',
          component: Pay,
          meta: {needs: true}
      },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/changePwd',
          name: 'changePwd',
          component: ChangePwd
      },
      {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
          component: About
      }
  ]
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.needs) {
        let userInfo = JSON.parse(getStorage('user_info'));
        if (userInfo && userInfo.id) {
            next()
        } else {
            Vue.prototype.$alert({
                type: 'error',
                message: '请登录',
                success: function() {
                    next({
                        path: '/login',
                        query: {path: from.fullPath}
                    })
                }
            })

        }
    } else {
        next();
    }
});

export default router;



