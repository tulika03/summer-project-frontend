<template>
  <v-container fluid="true">
    <v-layout row wrap>
      <v-flex  xs12 sm10 md9 offset-sm1 offset-md2>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Add New Jobsite</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>

              <v-text-field
                label="Job site Name"
                v-model="jobsite_name"
                name="jobsite_name"
                required
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                label="Client Name"
                v-model="client_name"
                name="client_name"
                required
                :rules="nameRules"
              ></v-text-field>


              <v-flex xs12>
                <v-text-field
                  :rules="[v => !!v && v.length <= 400|| 'Address is required with max 400 words']"
                  :counter="400"
                  v-model="client_address"
                  label="Address"
                  required
                ></v-text-field>
              </v-flex>


              <v-text-field
                label="Contact No."
                v-model="client_contact"
                required
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                label="Client Email"
                v-model="client_email"
                required
              ></v-text-field>


              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    v-model="select"
                    :items="zones"
                    label="Zones"
                    chips
                    tags
                  ></v-select>
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :selected="data.selected"
                      :disabled="data.disabled"
                      :key="JSON.stringify(data.item)"
                      class="chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                    >
                      <v-avatar class="accent">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-flex>
              </v-layout>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text indigo">Back</v-btn>
            <v-btn class="white--text indigo">Add</v-btn>
          </v-card-actions>
        </v-card>
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
  </v-container>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        category_select: '',
        select: [],
        zones: [
          'Kitchen',
          'Bed room',
          'Drawing Room',
          'Hall'
        ],
        jobsite_name: '',
        client_name: '',
        nameRules: [
          v => !!v || 'name is required',
          v => v.length <= 50 || 'Name must be less than 51 characters'
        ],
        client_address: '',
        client_contact: '',
        client_email: '',
        zone_id: ''
      }
    },
    methods: {
      onFileSelected (event) {
        this.choice_file = event.target.files[0]
        console.log(this.item_file)
      },
      addChoice () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.post('http://',
            {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
            })
          window.alert('data inserted successfully.')
        } else {
          this.$router.push('/admin/')
        }
      }
    }
  }
</script>
