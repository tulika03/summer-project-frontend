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
                  <v-text-field v-model="categories.category_id" label="Category Id" type="text" required class="text--darken-1" :rule="categories.idRules">{{ categories.category_id }}</v-text-field>
                  <v-text-field v-model="categories.category_name"  label="Title" type="text" required :rules="categories.titleRules">{{ categories.category_name }}</v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="back">Back</v-btn>
                <v-btn color="primary" @click="editDetail">Edit</v-btn>
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
        categories: {
          category_id: '',
          category_name: '',
          idRules: [
            v => !!v || 'category Id is required'
          ],
          titleRules: [
            v => !!v || 'Title is required'
          ]
        }
      }
    },
    computed: {
      formIsValid () {
        return this.category_id !== '' && this.category_name !== ''
      }
    },
    methods: {
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/category/viewCategory/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(response => {
              console.log(response.data[0])
              this.categories = response.data[0]
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      editDetail: function () {
        console.log(this.categories.category_id)
        console.log(this.categories.category_name)
        console.log(this.$route.params.id)
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.patch('http://localhost:3002/admin/category/editCategory/' + this.$route.params.id, {
            category_id: this.categories.category_id,
            category_name: this.categories.category_name
          }, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(response => {
            console.log('response: ', JSON.stringify(response, null, 2))
            window.alert('data edited successfully...')
          }).catch(error => {
            console.log('Error updating category details')
            console.log(error)
          })
        } else {
          this.$router.push('/admin/login')
        }
      },
      back () {
        this.$router.push('/admin/category/viewCategory')
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
