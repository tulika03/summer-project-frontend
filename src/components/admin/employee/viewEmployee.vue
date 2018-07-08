<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Employee details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>

          <v-card>
            <v-card-title>
              Employees
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="employees"
              :search="search"
              hide-actions
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <td>{{ props.item.employee_Id }}</td>
                <td>{{ props.item.employee_firstName }}</td>
                <td>{{ props.item.employee_lastName }}</td>
                <td>{{ props.item.employee_contact }}</td>
                <td>{{ props.item.employee_username }}</td>
                <td>{{ props.item.employee_email }}</td>
                <td><img :src="props.item.employee_photo" width="70px" height="90px" style="margin-top: 4px"></td>
                <td class="justify-left layout px-4">
                  <v-btn icon class="mx-0" v-bind:to="{name: 'adminEditEmployee', params: {id: props.item._id }}">
                    <v-icon color="teal" >edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteData(props.item._id)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>

              <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>



<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Employee  Id', value: 'employee_Id'
          },
          {text: 'first Name', value: 'employee_firstName'},
          {text: 'Last Name', value: 'employee_lastName'},
          {text: 'Contact No.', value: 'employee_contact'},
          {text: 'Username', value: 'employee_username'},
          {text: 'Email id', value: 'employee_email'},
          {text: 'Image', value: 'employee_photo'}
        ],
        employees: [],
        _id: ''
      }
    },
    created () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        axios.get('http://localhost:3002/admin/employee/view', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then(response => {
            this.employees = response.data
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/admin/login')
      }
    },

    methods: {
      deleteData: function (_id) {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.delete('http://localhost:3002/admin/employee/delete/' + _id, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(res => {
              console.log(res)
              window.alert('data deleted successfully...')
              location.reload()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login')
        }
      }
    }
  }
</script>
