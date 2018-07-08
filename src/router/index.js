import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// admin routes
import adminLogin from '@/components/admin/login'
import addNewAdmin from '@/components/admin/addAdmin'
import adminAddCategory from '@/components/admin/category/addCategory'
import adminviewCategory from '@/components/admin/category/viewCategory'
import adminEditCategory from '@/components/admin/category/editCategory'
import adminAddEmployee from '@/components/admin/employee/addEmployee'
import adminEditEmployee from '@/components/admin/employee/editEmployee'
import adminViewEmployee from '@/components/admin/employee/viewEmployee'
import changeEmployeeImage from '@/components/admin/employee/changeEmployeeImage'
import adminAddZone from '@/components/admin/zone/addZone'
import adminViewZone from '@/components/admin/zone/viewZone'
import adminEditZone from '@/components/admin/zone/editZone'
import adminAddChoice from '@/components/admin/choice/addChoice'
import adminEditChoice from '@/components/admin/choice/editChoice'
import adminViewChoice from '@/components/admin/choice/viewChoice'
import adminChangeImage from '@/components/admin/choice/changeImage'
import adminAddItem from '@/components/admin/item/addItem'
import adminEditItem from '@/components/admin/item/editItem'
import adminViewItem from '@/components/admin/item/viewItemZone'
import adminAddJobsite from '@/components/admin/jobsite/addJobsite'
import adminEditJobsite from '@/components/admin/jobsite/editJobsite'
import adminViewJobsite from '@/components/admin/jobsite/viewJobsite'

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
      path: '/admin/category/editCategory/:id',
      name: 'adminEditCategory',
      component: adminEditCategory
    },
    {
      path: '/admin/employee/addEmployee',
      name: 'adminAddEmployee',
      component: adminAddEmployee
    },
    {
      path: '/admin/employee/editEmployee/:id',
      name: 'adminEditEmployee',
      component: adminEditEmployee
    },
    {
      path: '/admin/employee/changeEmployeeImage/:id',
      name: 'changeEmployeeImage',
      component: changeEmployeeImage
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
      path: '/admin/zone/editZone/:id',
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
    },
    {
      path: '/admin/item/addItem',
      name: 'adminAddItem',
      component: adminAddItem
    },
    {
      path: '/admin/item/editItem',
      name: 'adminEditItem',
      component: adminEditItem
    },
    {
      path: '/admin/item/viewItem',
      name: 'adminViewItem',
      component: adminViewItem
    },
    {
      path: '/admin/jobsite/addJobSite',
      name: 'adminAddJobsite',
      component: adminAddJobsite
    },
    {
      path: '/admin/jobsite/editJobSite',
      name: 'adminEditJobsite',
      component: adminEditJobsite
    },
    {
      path: '/admin/jobsite/viewJobSite',
      name: 'adminViewJobsite',
      component: adminViewJobsite
    }
  ],
  mode: 'history'
})
