import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Content from "../views/content/Content";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/",
      name: "home",
      component: Content,
      children: [
        {
          path: "",
          component: Home
        }
      ],
      meta: {
        title: "首页"
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register/register.vue"),
      meta: {
        title: "注册"
      }
    },
    {
      path: "/findPassword",
      name: "findPassword",
      component: () => import("../views/findPassword/FindPassword.vue"),
      meta: {
        title: "找回密码"
      }
    },
    {
      path: "/scheduleManagement",
      name: "scheduleManagement",
      component: Content,
      children: [
        {
          path: "",
          component: () =>
            import("../views/scheduleManagement/ScheduleManagement.vue")
        }
      ],
      meta: {
        title: "日程管理"
      }
    },
    {
      path: "/mailList",
      name: "mailList",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/mailList/MailList.vue")
        }
      ],
      meta: {
        title: "通讯录"
      }
    },
    {
      path: "/offerManagement",
      name: "offerManagement",
      component: Content,
      children: [
        {
          path: "",
          component: () =>
            import("../views/offerManagement/OfferManagement.vue")
        }
      ],
      meta: {
        title: "offer管理"
      }
    },
    {
      path: "/personalInformation",
      name: "personalInformation",
      component: Content,
      children: [
        {
          path: "",
          component: () =>
            import("../views/personalInformation/PersonalInformation.vue")
        }
      ],
      meta: {
        title: "人员信息"
      }
    },
    {
      path: "/salaryManagement",
      name: "salaryManagement",
      component: Content,
      children: [
        {
          path: "",
          component: () =>
            import("../views/salaryManagement/SalaryManagement.vue")
        }
      ],
      meta: {
        title: "薪酬管理"
      }
    },
    {
      path: "/form",
      name: "form",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/form/Form.vue")
        }
      ],
      meta: {
        title: "分布表单"
      }
    },
    {
      path: "/checkForm",
      name: "checkForm",
      component: () => import("../views/checkForm/CheckForm")
      // meta: {
      //   title: "查看账单"
      // }
    }
  ]
});
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem("user");
  if (user) {
    next();
  } else if (to.path === "/login" || to.path === "/register" || to.path === "/findPassword") {
    next();
  } else {
    next("/login");
  }
  if (to.matched[0].meta.title) {
    document.title = to.matched[0].meta.title;
  }
});
export default router;
