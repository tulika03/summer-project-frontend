<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 md6 offset-md3>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Add Category</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="category_id" label="Category Id" type="text" required class="text--darken-1" :rule="idRules"></v-text-field>
                  <v-text-field v-model="category_name"  label="Title" type="text" required :rules="titleRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="add">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'

  export default {
    name: 'app',
    data () {
      return {
        category_id: '',
        category_name: '',
        idRules: [
          v => !!v || 'category Id is required'
        ],
        titleRules: [
          v => !!v || 'Title is required'
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.category_id !== '' && this.category_name !== ''
      }
    },
    methods: {
      add: function () {
        console.log(this.category_id)
        console.log(this.category_name)
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.post('http://localhost:3002/admin/category/addCategory',
            {
              category_id: this.category_id,
              category_name: this.category_name
            },
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => {
              console.log(r + 'data inserted successfully')
              window.alert('Data inserted successfully...')
            })
            .catch(error => {
              console.log(error.response)
            })
        } else {
         // this.$router.push('/admin/login')
          console.log('authentication not successful...')
        }
      }
    }
  }
</script>
