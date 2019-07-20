import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/nutui.css";
import "bootstrap";
import "jquery";
import "popper.js";
import firebase from "firebase";
import "./components/firebase/firebaseinit";

import axios from "axios";
//Vue.prototype.$http = axios
import VueAxios from "vue-axios";

NutUI.install(Vue);

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

import mainPage from "./components/mainPage.vue";
import buyCar from "./components/buyCar.vue";
import singleCar from "./components/detail/singleCar.vue";

import simple from "./components/sellform/simple.vue";

import sellCar from "./components/sellCar.vue";
import myProfile from "./components/myProfile.vue";

import login from "./components/login.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: mainPage, name: "mainPage" },
    { path: "/buyCar", component: buyCar, name: "buyCar" },
    {
      path: "/login",
      component: login,
      name: "login",
      meta: { requiresGuest: true }
    },
    {
      path: "/sellCar",
      component: sellCar,
      name: "sellCar",
      meta: { requiresAuth: true }
    },
    {
      path: "/myProfile",
      component: myProfile,
      name: "myProfile",
      meta: { requiresAuth: true }
    },
    { path: "/simple", component: simple, name: "simple" },
    { path: "/singleCar/:id", component: singleCar, name: "singleCar" }
  ]
});

//Nav guards
router.beforeEach((to, from, next) => {
  //Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if not logged in
    if (!firebase.auth().currentUser) {
      //Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //produce to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //Check if logged in
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //produce to route
      next();
    }
  } else {
    //produce to route
    next();
  }
});

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      render: h => h(App)
    });
  }
});
