import { createRouter, createWebHistory } from 'vue-router'
import Cookie from 'cookiejs'
import type { IUser } from '@/interface/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/term-condition',
      name: 'term-condition',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/term-condition/index.vue')
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "home",
          path: "",
          component: () => import("../views/home/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin', 'puskesmas']
          }
        }
      ]
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "users",
          path: "users",
          component: () => import("../views/users/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin']
          }
        },
        {
          name: "users-create",
          path: "users/create",
          component: () => import("../views/users/form.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin']
          }
        }
      ]
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "question",
          path: "question",
          component: () => import("../views/question/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin']
          }
        },
        {
          name: "question-create",
          path: "question/create",
          component: () => import("../views/question/form.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin']
          }
        }
      ]
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "video",
          path: "video",
          component: () => import("../views/video/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin']
          }
        },
        {
          name: "video-create",
          path: "video/create",
          component: () => import("../views/video/form.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin']
          }
        }
      ]
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "profile",
          path: "profile",
          component: () => import("../views/profile/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin', 'puskesmas']
          }
        }
      ]
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "reset-password",
          path: "reset-password",
          component: () => import("../views/reset-password/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin', 'puskesmas']
          }
        }
      ]
    },
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/ChattLayout.vue'),
      children: [
        {
          name: "camera",
          path: "camera",
          component: () => import("../views/camera/index.vue"),
          meta: {
            requiresAuth: true,
            access: ['superadmin', 'puskesmas']
          }
        }
      ]
    },
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuth) {
    return "/login"
  }

  if (!canAccess(to) && !isAuth) {
    return "/"
  }

  return true
})


const canAccess = (to: any) => {
  const user = JSON.parse(Cookie.get("user") as string) as IUser

  const access = to.meta.access as string[]

  const filter = access?.filter((el) => el.toLowerCase() == user.role)

  return filter?.length > 0 ? true : false
}

const isAuth = () => {
  const token = Cookie.get("token")
  return token ? true : false
}

export default router
