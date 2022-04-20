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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  //region讲师列表实现

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '讲师',
    meta: {title: '讲师', icon: 'user'},
    children: [
      {
        path: 'list',
        name: 'TeacherList',
        component: () => import('@/views/teacher/TeacherList'),
        meta: {title: '讲师列表', icon: 'table'}
      },
      {
        path: 'addteacher',
        name: 'AddTeacher',
        component: () => import('@/views/teacher/AddTeacher'),
        meta: {title: '添加讲师', icon: 'tree'}
      },
      //定义编辑路由
      {
        path: 'edit/:id',
        name: 'EditTeacher',
        component: () => import('@/views/teacher/AddTeacher'),
        meta: {title: '修改讲师', icon: 'tree'},
        hidden: true
      }
    ]
  },
  //endregion
  //region课程分类管理实现
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类',
    meta: {title: '课程分类', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'list',
        name: 'SubjectList',
        component: () => import('@/views/subject/SubjectList'),
        meta: {title: '课程分类列表', icon: 'table'}
      },
      {
        path: 'upload/subject',
        name: 'Upload',
        component: () => import('@/views/subject/Upload'),
        meta: {title: '添加课程分类', icon: 'tree'}
      },
    ]
  },
  //endregion
  //region课程实现
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程',
    meta: {title: '课程', icon: 'form'},
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import('@/views/course/CourseList'),
        meta: {title: '课程信息', icon: 'table'}
      },
      {
        path: 'info',
        name: 'CourseInfo',
        component: () => import('@/views/course/CourseInfo'),
        meta: {title: '添加课程信息', icon: 'tree'}
      },
      {
        path: 'info/:id',
        name: 'CourseInfoId',
        component: () => import('@/views/course/CourseInfo'),
        meta: {title: '添加课程信息', icon: 'tree'}, hidden: true

      },
      {
        path: 'chapter/:id',
        name: 'CourseChapter',
        component: () => import('@/views/course/CourseChapter'),
        meta: {title: '添加课程章节', icon: 'tree'},
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'CoursePublish',
        component: () => import('@/views/course/CoursePublish'),
        meta: {title: '添加课程详情', icon: 'tree'},
        hidden: true
      },
    ]
  },
  //endregion
  // region   原来的界面
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: {title: 'Form', icon: 'form'}
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {title: 'Menu1-1'}
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {title: 'Menu1-2'},
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {title: 'Menu1-2-1'}
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {title: 'Menu1-2-2'}
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {title: 'Menu1-3'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: {title: 'menu2'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: {title: 'External Link', icon: 'link'}
  //     }
  //   ]
  // },
  //endregion
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
