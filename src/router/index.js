import Vue from "vue"
import VueRouter from "vue-router"
import ImagePost from "../views/ImagePost.vue"
import Index from "@/views/Index.vue"
import LuckyColor from "@/components/LuckyColor.vue"
import Weather from "@/components/Weather.vue"

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
    component: Weather,
  },
  {
    path: "/image-post",
    name: "ImagePost",
    component: ImagePost,
  },
  {
    path: "/LuckyColor",
    name: "LuckyColor",
    component: LuckyColor,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
