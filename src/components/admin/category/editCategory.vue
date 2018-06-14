<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Edit Category Details</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="category_id" label="Category Id" type="text" required class="text--darken-1" :rule="idRules"></v-text-field>
                  <v-text-field v-model="category_title"  label="Title" type="text" required :rules="titleRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"><Back></Back></v-btn>
                <v-btn color="primary">Edit</v-btn>
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
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    data () {
      return {
        category_id: '',
        category_title: '',
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
        return this.category_id !== '' && this.category_title !== ''
      }
    },
    methods: {
      signup: function () {
        console.log(this.category_id)
        console.log(this.category_title)
        axios.patch('http://localhost:3002/admin/category/editCategory/:categoryId', {
          category_id: this.category_id,
          category_title: this.category_title
        }).then(response => {
          console.log(response.data)
          localStorage.getItem('token')
        }).catch(error => {
          console.log('Error updating category details')
          console.log(error)
          console.log(error.status)
          console.log(error.code)
        })
      }
    }
  }
</script>
