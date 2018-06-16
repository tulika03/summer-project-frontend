import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import adminLogin from '@/components/admin/login'
import addNewAdmin from '@/components/admin/addAdmin'
import adminAddCategory from '@/components/admin/category/addCategory'
import adminviewCategory from '@/components/admin/category/viewCategory'
import adminEditCategory from '@/components/admin/category/editCategory'
import adminAddEmployee from '@/components/admin/employee/addEmployee'
import adminEditEmployee from '@/components/admin/employee/editEmployee'
import adminViewEmployee from '@/components/admin/employee/viewEmployee'
import adminAddZone from '@/components/admin/zone/addZone'
import adminViewZone from '@/components/admin/zone/viewZone'
import adminEditZone from '@/components/admin/zone/editZone'
import adminAddChoice from '@/components/admin/choice/addChoice'
import adminEditChoice from '@/components/admin/choice/editChoice'
import adminViewChoice from '@/components/admin/choice/viewChoice'
import adminChangeImage from '@/components/admin/choice/changeImage'

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
    },
    {
      path: '/admin/employee/addEmployee',
      name: 'adminAddEmployee',
      component: adminAddEmployee
    },
    {
      path: '/admin/employee/editEmployee',
      name: 'adminEditEmployee',
      component: adminEditEmployee
    },
    {
      path: '/admin/employee/viewEmployee',
      name: 'adminViewEmployee',
      component: adminViewEmployee
    },
    {
      path: '/admin/zone/addZone',
      name: 'adminAddZone',
      component: adminAddZone
    },
    {
      path: '/admin/zone/viewZone',
      name: 'adminViewZone',
      component: adminViewZone
    },
    {
      path: '/admin/zone/editZone',
      name: 'adminEditZone',
      component: adminEditZone
    },
    {
      path: '/admin/choice/addChoice',
      name: 'adminAddChoice',
      component: adminAddChoice
    },
    {
      path: '/admin/choice/editChoice',
      name: 'adminEditChoice',
      component: adminEditChoice
    },
    {
      path: '/admin/choice/viewChoice',
      name: 'adminViewChoice',
      component: adminViewChoice
    },
    {
      path: '/admin/choice/changeImage',
      name: 'adminChangeImage',
      component: adminChangeImage
    }
  ],
  mode: 'history'
})
