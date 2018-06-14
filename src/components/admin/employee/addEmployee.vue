<template>
  <v-container fluid>
    <v-spacer></v-spacer>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Employee Details</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <span class="title">Employee Info</span>


              <v-text-field
                v-model="employee_Id"
                :rules="[() => employee_Id.length > 0 || 'This field is required']"
                label="Id"
                class="mt-5"
                required
              ></v-text-field>
              <v-text-field
                v-model="employee_firstName"
                :rules="[() => employee_firstName.length > 0 || 'This field is required']"
                label="first name"
                required
              ></v-text-field>

              <v-text-field
                v-model="employee_lastName"
                :rules="[() => employee_lastName.length > 0 || 'This field is required']"
                label="last name"
                required
              ></v-text-field>
              <v-text-field
                v-model="employee_contact"
                :rules="[() => employee_contact.length > 0 || 'This field is required']"
                label="Contact No."
                required
              ></v-text-field>
              <v-text-field
                v-model="employee_username"
                label="Username"
                :rules="[() => employee_username.length > 0 || 'This field is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="employee_email"
                label="email Id"
                :rules='emailRules'
                required
              ></v-text-field>
              <v-text-field
                v-model="employee_password"
                label="Password"
                :rules="[() => employee_password.length > 0 || 'This field is required']"
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
        valid: true,
        employee_Id: '',
        employee_firstName: '',
        employee_lastName: '',
        employee_contact: '',
        employee_username: '',
        employee_email: '',
        employee_password: '',
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
          Axios.post('http://localhost:3002/admin/employee/addEmployee', {
            employee_Id: this.employee_Id,
            employee_firstName: this.employee_firstName,
            employee_lastName: this.employee_lastName,
            employee_contact: this.employee_contact,
            employee_username: this.employee_username,
            employee_email: this.employee_email,
            employee_password: this.employee_password
          }).then(response => {
            Vue.localStorage.set('token', response.data.token)
            //  console.log(response.data.token)
            localStorage.getItem('token')
            // this.$router.push('/')
            console.log('You have enterd the details successfully...' + response)
          }).catch(error => {
            console.log('Error in adding employee details')
            console.log(error)
            this.$router.push('/admin/employee/addEmployee')
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
