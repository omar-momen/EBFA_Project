import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../pages/HomePage/Home.vue";

import MainHome from "../pages/HomePage/mainHome.vue";
import Management from "../pages/Management/all.vue";
import SingleMember from "../pages/Management/SingleMember.vue";
import AllNews from "../pages/news/all.vue";
import SingleNews from "../pages/news/single.vue";
import Gallery from "../pages/Gallery/all.vue";
import About from "../pages/About/about.vue";
import Contact from "../pages/Contact/contact.vue";
import Profile from "../pages/Profile/profile.vue";
import AllPlayers from "../pages/Profile/Players/all.vue";
import SinglePlayer from "../pages/Profile/Players/single.vue";
import GlobalSearch from "../pages/Global/Search.vue";
import MainAuth from "../pages/Auth/mainAuth.vue";
import Login from "../pages/Auth/login.vue";
import Register from "../pages/Auth/register.vue";
import ForgetPassword_1 from "../pages/Auth/ForgetPassword_1.vue";
import ForgetPassword_2 from "../pages/Auth/ForgetPassword_2.vue";

import NotFound from "../pages/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  // Home
  {
    path: "/",
    // name: "Home",
    component: HomePage,
    children: [
      {
        path: "/",
        name: "main-home",
        component: MainHome,
      },
      {
        path: "/management",
        name: "management",
        component: Management,
      },
      {
        path: "/member/:id",
        name: "member",
        component: SingleMember,
      },
      {
        path: "/news",
        name: "allNews",
        component: AllNews,
      },
      {
        path: "/news/:id",
        name: "singleNews",
        component: SingleNews,
      },
      {
        path: "/media",
        name: "allGallery",
        component: Gallery,
      },
      {
        path: "/about",
        name: "AboutUs",
        component: About,
      },
      {
        path: "/contact",
        name: "ContactUs",
        component: Contact,
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        beforeEnter: (_, _2, next) => {
          if (!localStorage.getItem("efba-token")) {
            next({ name: "Home" });
          } else {
            next();
          }
        },
      },
      {
        path: "/players",
        name: "allPlayers",
        component: AllPlayers,
      },
      {
        path: "/profile/:id",
        name: "singlePlayer",
        component: SinglePlayer,
      },
      {
        path: "/search/:text",
        name: "Search",
        component: GlobalSearch,
      },
    ],
  },
  {
    path: "/login",
    name: "mainAuth",
    component: MainAuth,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
      {
        path: "/forget-password-1",
        name: "ForgetPassword_1",
        component: ForgetPassword_1,
      },
      {
        path: "/forget-password-2",
        name: "ForgetPassword_2",
        component: ForgetPassword_2,
      },
    ],
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
  routes,
});

export default router;
