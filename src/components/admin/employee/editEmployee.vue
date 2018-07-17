<template>
  <v-container fluid>
    <v-spacer></v-spacer>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Update Employee Details</v-toolbar-title>
          </v-toolbar>

          <v-card-media
            :src="employees.employee_photo"
            height="350px" width="400px"
              >
            <v-layout column class="media">
                <v-spacer></v-spacer>
                <v-btn fab v-bind:to="{name: 'changeEmployeeImage', params: {id: this.employees._id }}">
                  <v-icon>edit</v-icon>
                </v-btn>
            </v-layout>
          </v-card-media>

          <v-card-text>
            <v-form ref="form" lazy-validation>

              <v-text-field
                v-model="employees.employee_Id"
                :rules="[() => employees.employee_Id.length > 0 || 'This field is required']"
                label="Id"
                required
              >{{ employees.employee_Id }}</v-text-field>
              <v-text-field
                v-model="employees.employee_firstName"
                :rules="[() => employees.employee_firstName.length > 0 || 'This field is required']"
                label="first name"
                required
              >{{ employees.employee_firstName }}</v-text-field>

              <v-text-field
                v-model="employees.employee_lastName"
                :rules="[() =>employees.employee_lastName.length > 0 || 'This field is required']"
                label="last name"
                required
              >{{ employees.employee_lastName }}</v-text-field>
              <v-text-field
                v-model="employees.employee_contact"
                label="Contact No."
                required
              > {{ employees.employee_contact }}</v-text-field>
              <v-text-field
                v-model="employees.employee_username"
                label="Username"
                :rules="[() => employees.employee_username.length > 0 || 'This field is required']"
                required
              >{{ employees.employee_username }}</v-text-field>
              <v-text-field
                v-model="employees.employee_email"
                label="email Id"
                :rules='employees.emailRules'
                required
              >{{ employees.employee_email }}</v-text-field>
              <small>*indicates required field</small>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :disabled="!valid"
              @click="edit"
            >
              submit
            </v-btn>
            <v-btn @click="back">back</v-btn>
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
        employees: {
          employee_Id: '',
          employee_firstName: '',
          employee_lastName: '',
          employee_photo: '',
          employee_contact: '',
          employee_username: '',
          employee_email: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ],
          passwordRules: [
            v => !!v || 'Password is required'
          ],
          _id: ''
        }
      }
    },
    methods: {
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          Axios.get('http://localhost:3002/admin/employee/view/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(response => {
              this.employees = response.data[0]
              console.log(this.employees)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      edit: function () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          Axios.patch('http://localhost:3002/admin/employee/update/' + this.$route.params.id, {
            employee_Id: this.employees.employee_Id,
            employee_firstName: this.employees.employee_firstName,
            employee_lastName: this.employees.employee_lastName,
            employee_contact: this.employees.employee_contact,
            employee_username: this.employees.employee_username,
            employee_email: this.employees.employee_email
          }, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          }).then(response => {
            console.log('You have updated the details successfully...' + response)
            window.alert('Data updated successfully...')
          }).catch(error => {
            console.log('Error in updating employee details')
            console.log(error)
            // this.$router.push('/admin/employee/viewEmployee')
          })
        }
      },
      back () {
        this.$router.push('/admin/employee/viewEmployee')
      }
    },
    mounted () {
      this.getDetail()
    }

  }
</script>
