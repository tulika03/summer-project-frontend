<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Zone details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>

          <v-card>
            <v-card-title>
              
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
              :items="zones"
              :search="search"
              hide-actions
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <td>{{ props.item.zone_name }}</td>
                
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
      headers: [
        {
          text: 'Zone Name', value: 'zone_name'},
        {text: 'Actions', value: 'zone_name'}
      ],
      zones: [],
      _id: ''
    }),
    created () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        axios.get('http://localhost:3002/zone/viewZone', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then(response => {
            this.zones = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/employee/employeeLogin')
      }
    },
    methods: {// eslint-disable-next-line      
    }
  }
</script>