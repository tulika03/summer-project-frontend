<template>
  <v-app>
    <v-content>
      <v-container>
        <div
          style="max-width: 420px; margin: auto;"
          class="orange lighten-4" >
            <v-card class="card--flex-toolbar">
              <v-toolbar card prominent color="primary">
                <v-toolbar-title class="white--text offset-sm4">ADMIN LOGIN</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            <v-container
              fluid
              style="min-height: 0;">
              <v-layout row wrap>
                <v-flex>
            <v-form>
              <v-text-field
                v-model="admin_email"
                :rules="emailRules"
                label="Email"
                type="text"
                prepend-icon="person"
                required
              ></v-text-field>
              <v-text-field
                v-model="admin_password"
                :rules="passwordRules"
                prepend-icon="lock"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                label="Password"
                hint="At least 4 characters"
                min="4"
                counter
                required
              ></v-text-field>
            </v-form>
              <v-card-actions>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
            </v-card>

        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    data () {
      return {
        e1: false,
        admin_email: '',
        admin_password: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required'
        ]
      }
    },
    methods: {
      login: function () {
        Axios.post('http://localhost:3002/admin/login', {
          admin_password: this.admin_password,
          admin_email: this.admin_email
        }).then(response => {
          Vue.localStorage.set('token', response.data.token)
          //  console.log(response.data.token)
          localStorage.getItem('token')
         // this.$router.push('/')
          console.log('You have logged in successfully...' + response)
        }).catch(error => {
          console.log('Error login')
          console.log(error)
          window.alert('Please enter correct username and Password')
          this.$router.push('/admin/login')
        })
      }
    }
  }
</script>
