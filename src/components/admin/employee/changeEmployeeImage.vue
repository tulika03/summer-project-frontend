<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex  xs12 sm10 md7 offset-sm1 offset-md2>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Update Image</v-toolbar-title>
          </v-toolbar>
          <v-card-media
            height="300px"
            :src="employees.employee_photo">
            <v-layout column class="media"
                      contain>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn fab @click="onPickFile">
                  <v-icon>camera_alt</v-icon>
                </v-btn>
                <input type=file
                       @change="onFileSelected"
                       ref="fileInput"
                       style="display: none"
                >
              </v-card-title>
              <v-spacer></v-spacer>

            </v-layout>
          </v-card-media>
          <v-card-actions>
            <v-btn @click="saveImage">save</v-btn>
            <v-btn v-bind:to="{name: 'adminEditEmployee', params: {id: this.employees._id }}">back</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        employees: {
          employee_photo: '',
          _id: ''
        },
        image: ''
      }
    },
    methods: {
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/employee/view/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(response => {
              this.employees = response.data[0]
              console.log(this.employees)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFileSelected: function (event) {
        const file = event.target.files[0]
        this.image = file
        this.employees.employee_photo = URL.createObjectURL(file)
      },
      saveImage () {
        this.employees.employee_photo = this.image
        console.log(this.employees.employee_photo)
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          fd.append('employee_photo', this.employees.employee_photo)
          axios.patch('http://localhost:3002/admin/employee/updateImage/' + this.$route.params.id, fd, {
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          }).then(r => {
            console.log('r: ', JSON.stringify(r, null, 2))
            location.reload()
          })
            .catch(error => {
              console.log(error.response)
            })
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
