<template>
  <v-container fluid="true">
  <div>
    <v-spacer></v-spacer>

    <v-layout>
      <v-toolbar card prominent color="blue">
        <v-toolbar-title class="white--text offset-sm4 ">Categories details</v-toolbar-title>
          <v-spacer></v-spacer>
      </v-toolbar>
    </v-layout>
    <v-layout>
      <v-flex>

        <v-card>
          <v-card-title>
            Categories
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
      :items="categories"
      :search="search"
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
</span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{props.item.category_id}}</td>
        <td>{{ props.item.category_name}}</td>
        <td class="justify-left layout px-4">
          <v-btn icon class="mx-0" v-bind:to="{name: 'adminEditCategory', params: {id: props.item._id }}">
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
          {text: 'Category Id', value: 'category_id'},
          {text: 'Category name', value: 'category_name'},
          {text: 'Action'}
        ],
        categories: [],
        value: false,
        _id: ''
      }
    },
    created () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        axios.get('http://localhost:3002/admin/category/viewCategory', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then(response => {
            this.categories = response.data
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
          axios.delete('http://localhost:3002/admin/category/delete/' + _id, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(res => {
              console.log(res)
             // window.alert('data deleted successfully...')
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
