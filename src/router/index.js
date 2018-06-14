import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import adminLogin from '@/components/admin/login'
import addNewAdmin from '@/components/admin/addAdmin'
import adminAddCategory from '@/components/admin/category/addCategory'
import adminviewCategory from '@/components/admin/category/viewCategory'
import adminEditCategory from '@/components/admin/category/editCategory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/admin/addAdmin',
      name: 'addNewAdmin',
      component: addNewAdmin
    },
    {
      path: '/admin/category/addCategory',
      name: 'adminAddCategory',
      component: adminAddCategory
    },
    {
      path: '/admin/category/viewCategory',
      name: 'adminviewCategory',
      component: adminviewCategory
    },
    {
      path: '/admin/category/editCategory/:_id',
      name: 'adminEditCategory',
      component: adminEditCategory
    }
  ],
  mode: 'history'
})
