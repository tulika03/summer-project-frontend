<template>
  <v-container fluid="true">
    <v-layout row wrap>
      <v-flex xs12 sm10 md6 offset-sm2 offset-md3>
        <div>
          <v-toolbar color="cyan" dark tabs>
            <v-toolbar-title>Update Choice</v-toolbar-title>
          </v-toolbar>
          <v-tabs icons-and-text centered dark color="cyan lighten-1" v-model="tabs">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab href="#tab-1">
              Details
              <v-icon>create</v-icon>
            </v-tab>
            <v-tab href="#tab-2">
              File
              <v-icon>attachment</v-icon>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs" class="white elevation-1">
            <v-tab-item
              :id="'tab-1'">
              <v-card>
                <v-card-media
                  :src="choices.choice_photo"
                  height="350px" width="400px"
                >
                  <v-layout column class="media">
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn fab v-bind:to="{name: 'adminChangeImage', params: {id: this.choices._id }}">
                        <v-icon>edit</v-icon>
                      </v-btn>


                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="white--text pl-5 pt-5">
                      <div class="display-1 pl-5 pt-5">{{ choices.choice_name }}</div>
                    </v-card-title>
                  </v-layout>
                </v-card-media>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Choice code"
                      v-model="choices.choice_code"
                      name="choice_code"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                      label="Choice Name"
                      v-model="choices.choice_name"
                      name="choice_name"
                      required
                      :rules="nameRules"
                    ></v-text-field>

                    <br>
                    <v-text-field
                      label="Choice length"
                      name="choice_length"
                      v-model.number="choices.choice_length"
                      type="email"
                    ></v-text-field>

                    <v-text-field
                      label="Company"
                      name="choice_company"
                      v-model="choices.choice_company"
                      required
                      :rules="[v => !!v || 'Company is required']"
                    ></v-text-field>

                    <v-flex xs12>
                      <v-text-field
                        :rules="[(v) => v.length <= 400 || 'Max 400 characters']"
                        :counter="400"
                        v-model="choices.choice_description"
                        label="Description"
                      ></v-text-field>
                    </v-flex>


                    <v-layout row wrap>
                      <v-flex xs2><br><br>
                        <label style="color: grey">Status*</label>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                          v-model="status_select"
                          :items="status_list"
                          :loading="isLoading"
                          :search-input.sync="searchCategory"
                          color="white"
                          hide-no-data
                          :rules="[v => !!v || 'category is required']"
                          hide-selected
                          item-text="choice_status"
                          item-value="choice_status"
                          placeholder="Start typing to Search"
                          return-object
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs2><br><br>
                        <label style="color: grey">Category*</label>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          v-model="category_select"
                          :items="categories"
                          :loading="isLoading"
                          :search-input.sync="searchCategory"
                          :hint="`${category_select.category_name}, ${category_select.category_id}`"
                          color="white"
                          hide-no-data
                          :rules="[v => !!v || 'category is required']"
                          hide-selected
                          item-text="category_name"
                          item-value="category_id"
                          placeholder="Start typing to Search"
                          return-object
                        ></v-autocomplete>
                      </v-flex>


                    </v-layout>
                    <v-text-field name="choice_costCode"
                                  label="Cost Code"
                                  v-model="choices.choice_costCode"
                    >
                    </v-text-field>
                    <v-text-field name="choice_quantity"
                                  label="Quantity"
                                  v-model="choices.choice_quantity"
                                  required
                    > {{ choices.choice_quantity }}
                    </v-text-field>
                    <v-text-field name="choice_unitCost"
                                  label="Unit cost"
                                  v-model="choices.choice_unitCost"
                                  required
                    > {{ choices.choice_unitCost }}
                    </v-text-field>
                    <v-text-field name="choice_costCode"
                                  label="Cost Code"
                                  v-model="choices.choice_costCode"
                                  required
                    > {{ choices.choice_costCode }}
                    </v-text-field>

                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="white--text indigo">Back</v-btn>
                  <v-btn class="white--text indigo" @click="updateChoice">Edit</v-btn>
                </v-card-actions>
              </v-card>

            </v-tab-item>
            <v-tab-item
              :id="'tab-2'"
            >
              <v-card class="grey lighten-4 mb-3">
                <div class="container">
                  <div class="dropbox">
                    <label>Upload File</label>
                    <br>
                    <br>
                    <input
                      type="file"
                      @change="onFileSelected"
                      required
                      accept=""
                    > <br><br>
                    <v-btn @click="saveFile" type="submit" class="cyan lighten-4">Upload</v-btn>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
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
        tabs: null,
        category_select: '',
        codeRules: [
          v => !!v || 'Code is required',
          v => v.length <= 10 || 'Name must be less than 11 characters'
        ],
        nameRules: [
          v => !!v || 'name is required',
          v => v.length <= 50 || 'Name must be less than 51 characters'
        ],
        choices: {
          choice_code: '',
          choice_name: '',
          choice_photo: '',
          choice_length: '',
          choice_company: '',
          faculty_password: '',
          choice_description: '',
          choice_file: '',
          choice_status: '',
          choice_quantity: '',
          choice_unitCost: '',
          choice_costCode: '',
          category: {
            _id: '',
            category_id: '',
            category_name: ''
          }
        },
        status_list: [
          {choice_status: 'Pending'},
          {choice_status: 'Complete'}
        ],
        searchStatus: null,
        searchCategory: null,
        isLoading: false,
        categories: [],
        status: {
          choice_status: ''
        },
        status_select: '',
        sideNav: false,
        right: null
      }
    },
    methods: {
      async getDetail () {
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/choice/viewChoice/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(response => {
              this.choices = response.data[0]
              this.status.choice_status = this.choices.choice_status
              this.status_select = this.status
              console.log(this.status_select)
              this.category_select = this.choices.category
              console.log(this.category_select)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      onFileSelected (event) {
        this.choices.choice_file = event.target.files[0]
        console.log(this.choices.choice_file)
        console.log('file check')
      },
      updateChoice () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          console.log(this.status_select.choice_status)
          console.log(this.category_select._id)
          axios.patch('http://localhost:3002/admin/choice/update/' + this.$route.params.id, {
            choice_code: this.choices.choice_code,
            choice_name: this.choices.choice_name,
            choice_company: this.choices.choice_company,
            choice_description: this.choices.choice_description,
            choice_status: this.status_select.choice_status,
            choice_quantity: this.choices.choice_quantity,
            choice_unitCost: this.choices.choice_unitCost,
            choice_costCode: this.choices.choice_costCode,
            choice_length: this.choices.choice_length,
            categoryId: this.category_select._id
          }, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)),
                         window.alert('data inserted successfully.')
              )
            .catch(error => {
              console.log(error.response)
            })
        } else {
          this.$router.push('/admin/')
        }
      },
      saveFile () {
        console.log(this.choices.choice_file)
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          console.log(this.choices.choice_file)
          fd.append('choice_file', this.choices.choice_file)
          axios.patch('http://localhost:3002/admin/choice/updateFile/' + this.$route.params.id, fd, {
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          }).then(r => {
            console.log('r: ', JSON.stringify(r, null, 2))
            window.alert('File saved successfully...')
            location.reload()
          })
            .catch(error => {
              console.log(error.response)
            })
        }
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
            console.log(this.categories)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/admin/login')
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
