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
              <br>
              <v-flex xs12>
                <label style="color: grey">Add Employee Image</label>
                <br><br>
              </v-flex>
              <v-flex>  <input type=file
                               @change="onFileSelected"
                               class="text--primary"
                               accept=""
              ></v-flex>
              <br>

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
              :disabled="!formIsValid"
              @click="addEmployee"
            >
              Submit
            </v-btn>
            <v-btn @click="clear">Clear</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  export default {
    data () {
      return {
        e1: false,
        valid: true,
        employee_Id: '',
        employee_firstName: '',
        employee_lastName: '',
        employee_photo: '',
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
    computed: {
      formIsValid () {
        return this.employee_Id !== '' &&
          this.employee_firstName !== '' &&
          this.employee_lastName !== '' &&
          this.employee_photo !== '' &&
          this.employee_contact !== '' &&
          this.employee_username !== '' &&
          this.employee_email !== '' &&
          this.employee_password !== ''
      }
    },
    methods: {
      onFileSelected (event) {
        this.employee_photo = event.target.files[0]
        console.log(this.employee_photo)
      },
      addEmployee: function () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          fd.append('employee_photo', this.employee_photo)
          fd.append('employee_Id', this.employee_Id)
          fd.append('employee_firstName', this.employee_firstName)
          fd.append('employee_lastName', this.employee_lastName)
          fd.append('employee_contact', this.employee_contact)
          fd.append('employee_username', this.employee_username)
          fd.append('employee_email', this.employee_email)
          fd.append('employee_password', this.employee_password)

          Axios.post('http://localhost:3002/admin/employee/addEmployee', fd, {
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          }).then(r => {
            console.log('r: ', JSON.stringify(r, null, 2))
            window.alert('data inserted successfully.')
          })
            .catch(error => {
              console.log(error.response)
            })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
