import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb (default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/admin', component: Layout,
    meta: { title: "系统管理员", icon: 'plane', },
    children: [
      { path: 'staff', name: 'staff', component: () => import('@/views/staff/index'),
        meta: {
          title: '人员维护'
        }
      },
    ],
    hidden: true,
  },
  {
    path: '/worker',
    component: Layout,
    meta: {
      title: "工作人员",
      icon: 'plane',
    },
    hidden: true,
    children: [
      {
        path: 'supply',
        name: 'supply',
        component: () => import('@/views/supply/index'),
        meta: {
          title: '物资维护'
        }
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: () => import('@/views/inventory/index'),
        meta: {
          title: '物资存放地点维护'
        }
      },
      {
        path: 'flow',
        name: 'flow',
        component: () => import('@/views/flow/index'),
        meta: {
          title: '流程维护'
        }
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/company/index'),
        meta: {
          title: '风险企业维护'
        }
      },
      {
        path: 'city',
        name: 'city',
        component: () => import('@/views/city/index'),
        meta: {
          title: '城市信息维护'
        }
      },
      {
        path: 'route',
        name: 'route',
        component: () => import('@/views/city/route/index'),
        meta: {
          title: '路线信息维护'
        }
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('@/views/event/index'),
        meta: {
          title: '事件维护'
        }
      },
      {
        path: 'report-worker',
        name: 'report-worker',
        component: () => import('@/views/report/worker'),
        meta: {
          title: '接报维护 (工作人员)'
        }
      }
    ]
  },
  {
    path: '/director',
    component: Layout,
    meta: {
      title: "指挥人员",
      icon: 'plane'
    },
    children: [
      {
        path: 'report-director',
        name: 'report-director',
        component: () => import('@/views/report/director'),
        meta: {
          title: '接报维护 (指挥人员)'
        }
      },
    ],
    hidden: true,
  },
  {
    path: '/expert',
    component: Layout,
    meta: {
      title: "专家",
      icon: "plane"
    },
    children: [
      {
        path: 'report-expert',
        name: 'report-expert',
        component: () => import('@/views/report/expert'),
        meta: {
          title: '接报维护 (专家)'
        }
      }
    ],
    hidden: true
  },
  //测试页面
  /*{
    path: '/',
    component: Layout,
    children: [{
      path: 'test',
      name: 'test',
      component: () => import('@/views/test/test'),
      meta: {
        title: '测试'
      }
    }]
  },*/
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
