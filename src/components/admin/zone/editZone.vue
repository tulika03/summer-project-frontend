<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Update Zone detail</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="zone_name"  label="Title" type="text" required :rules="titleRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Add</v-btn>
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
        zone_name: '',
        titleRules: [
          v => !!v || 'Zone name is required'
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.zone_name !== ''
      }
    },
    methods: {
      update: function () {
        console.log(this.zone_name)
        axios.patch('http: //', {
          zone_name: this.zone_name
        }).then(response => {
          console.log(response.data)
          console.log('Zone updated successfully....')
          localStorage.getItem('token')
        }).catch(error => {
          console.log('Error adding new zone')
          console.log(error)
          console.log(error.status)
          console.log(error.code)
        })
      }
    }
  }
</script>
