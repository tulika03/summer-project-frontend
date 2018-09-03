<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Item details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>

          <v-card>
            <v-card-title>
              Item
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
              
              :items="items"
              :search="search"
              hide-actions
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <td>{{ props.item.item_title }}</td>
                <td>{{ props.item.item_description }}</td>
                <td>{{ props.item.item_allowence }}</td>
                <td> <a v-bind:href="props.item.item_file" target="_blank" download>download</a></td>
                <td>{{ props.item.category.category_name }}</td>
                <td>{{ props.item.choices.choice_name }}</td>
                <td>{{ props.item.item_jobsite.job_name }}</td>
                <td>{{ props.item.item_zone.zone_name }}</td>

                <td class="justify-left layout px-4">
                  <v-btn icon class="mx-0" v-bind:to="{name: 'adminEditItem', params: {id: props.item._id }}">
                    <v-icon color="teal">edit</v-icon>
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
    data: () => ({
      dialog: false,
      search: '',
      items: [],
      
    }),
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        console.log(Vue.localStorage.get('token'))
          var jwt = Vue.localStorage.get('token')
          if (jwt) {
            axios.get('http://localhost:3002/admin/item/viewItem', {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
              .then(response => {
                this.items = response.data
                console.log(response.data)
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$router.push('/admin/login')
          }
      },
      deleteData: function (_id) {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.delete('http://localhost:3002/admin/item/deleteItem/' + _id, {
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
    },
    created () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        axios.get('http://localhost:3002/admin/item/viewItem', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then(response => {
            this.items = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/admin/login')
      }
    },
    mounted(){
      this.initialize()
    }
  }
</script>
