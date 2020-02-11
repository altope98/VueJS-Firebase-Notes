import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
import login from './components/login'
import publico from './components/publico'
import privado from './components/privado'
import registro from './components/registro'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  { path: '/publico', component: publico },
  { path: '/registro', component: registro },
  {
    path: '/privado', component: privado, meta: {
      requiresAuth: true
    }
  },
  { path: '*', component: publico }
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('privado')
  else next()
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(firestorePlugin)

window.firebase = firebase

firebase.auth().onAuthStateChanged(function (user) {
  let x=user
  x=""
  console.log(x)
  new Vue({
    render: h => h(App),
    router,
  }).$mount('#app')
})
