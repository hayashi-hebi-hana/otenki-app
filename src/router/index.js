import Vue from "vue"
import VueRouter from "vue-router"
import ImagePost from "../views/ImagePost.vue"
import Index from "@/views/Index.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
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
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
