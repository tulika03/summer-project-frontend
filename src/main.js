// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VTextField,
  VCard,
  VDataTable,
  VDialog,
  VSubheader,
  VSelect,
  VTabs,
  VAvatar,
  VExpansionPanel,
  VTooltip,
  VAlert,
  VCombobox,
  VAutocomplete
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VTextField,
    VCard,
    VDataTable,
    VDialog,
    VSubheader,
    VSelect,
    VTabs,
    VAvatar,
    VExpansionPanel,
    VTooltip,
    VAlert,
    VCombobox,
    VAutocomplete
  },
  theme: {
    primary: '#78e5c7',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
