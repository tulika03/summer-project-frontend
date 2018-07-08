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
                  <v-text-field v-model="zones.zone_name"  label="Title" type="text" required :rules="zones.titleRules">{{ zones.zone_name }}</v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"@click="editDetail">Edit</v-btn>
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
        zones: {
          zone_name: '',
          titleRules: [
            v => !!v || 'Zone name is required'
          ]
        },
        _id: ''

      }
    },
    computed: {
      formIsValid () {
        return this.zone_name !== ''
      }
    },
    methods: {

      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/zone/viewZone/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(response => {
              console.log(response.data[0])
              this.zones = response.data[0]
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      editDetail: function () {
        console.log(this.zones.zone_name)
        console.log(this.$route.params.id)
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.patch('http://localhost:3002/admin/zone/editZone/' + this.$route.params.id, {
            zone_name: this.zones.zone_name
          }, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => {
              console.log('response: ', JSON.stringify(response, null, 2))
              window.alert('data edited successfully...')
            }).catch(error => {
              console.log('Error updating zone details')
              console.log(error)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      back () {
        this.$router.push('/admin/zones/viewZone')
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
