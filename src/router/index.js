import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import ImagePost from "../views/ImagePost.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/otenkiAPI",
    name: "OtenkiAPI",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Weather.vue"),
   },
  {
    path: "/image-post",
    name: "ImagePost",
    component: ImagePost,
  },
  {
    path: "/LuckyColor",
    name: "LuckyColor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/LuckyColor.vue"),
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
