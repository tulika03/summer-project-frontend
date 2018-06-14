<template>
  <v-container fluid>
    <v-spacer></v-spacer>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Add Admin</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
            <span class="title">Admin Info</span>

            <v-text-field
              v-model="admin_firstName"
              :rules="[() => admin_firstName.length > 0 || 'This field is required']"
              label="first name"
              class="mt-5"
              required
            ></v-text-field>

            <v-text-field
              v-model="admin_lastName"
              :rules="[() => admin_lastName.length > 0 || 'This field is required']"
              label="last name"
              required
            ></v-text-field>
            <v-text-field
              v-model="admin_username"
              label="Username"
              :rules="[() => admin_username.length > 0 || 'This field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="admin_email"
              label="email Id"
              :rules='emailRules'
              required
            ></v-text-field>
            <v-text-field
              v-model="admin_password"
              label="Password"
              :rules="[() => admin_password.length > 0 || 'This field is required']"
              type="password"
              required
            ></v-text-field>
            <small>*indicates required field</small>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :disabled="!valid"
              @click="submit"
            >
              submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        admin_firstname: '',
        admin_lastName: '',
        admin_username: '',
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
      submit: function () {
        if (this.$refs.form.validate()) {
          Axios.post('http://localhost:3002/admin/addAdmin', {
            admin_firstname: this.admin_firstname,
            admin_lastName: this.admin_lastName,
            admin_username: this.admin_username,
            admin_email: this.admin_email,
            admin_password: this.admin_password
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
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
