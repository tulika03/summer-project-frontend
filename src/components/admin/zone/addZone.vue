<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Add Zone</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="zone_name"  label="Title" type="text" required :rules="titleRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="addZone">Add</v-btn>
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
      addZone: function () {
        console.log('zone name: ' + this.zone_name)
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.post('http://localhost:3002/admin/zone/addZone',
            {
              zone_name: this.zone_name
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
