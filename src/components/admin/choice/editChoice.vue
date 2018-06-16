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
                  src="http://www.soleilre.com/wp-content/uploads/2017/11/interior-home-interiors-images-magnificent-and-shoise-com.jpg"
                  height="200px">
                  <v-layout column class="media">
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn fab @click="onImageSelected">
                        <v-icon>edit</v-icon>
                      </v-btn>


                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="white--text pl-5 pt-5">
                      <div class="display-1 pl-5 pt-5">{{ items.choice_name }}</div>
                    </v-card-title>
                  </v-layout>
                </v-card-media>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Choice code"
                      v-model="items.choice_code"
                      name="choice_code"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                      label="Choice Name"
                      v-model="items.choice_name"
                      name="choice_name"
                      required
                      :rules="nameRules"
                    ></v-text-field>

                    <br>
                    <v-text-field
                      label="Choice length"
                      name="choice_length"
                      v-model.number="items.choice_length"
                      type="email"
                    ></v-text-field>

                    <v-text-field
                      label="Company"
                      name="choice_company"
                      v-model="items.choice_company"
                      required
                      :rules="[v => !!v || 'Company is required']"
                    ></v-text-field>

                    <v-flex xs12>
                      <v-text-field
                        :rules="[(v) => v.length <= 400 || 'Max 400 characters']"
                        :counter="400"
                        v-model="items.choice_description"
                        label="Description"
                      ></v-text-field>
                    </v-flex>

                    <v-layout row wrap>
                      <v-flex xs2><br><br>
                        <label style="color: grey">Status*</label>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                          :items="status_list"
                          v-model="items.choice_status"
                          :hint="`${items.choice_status.status_name}`"
                          single-line
                          item-text="status_name"
                          item-value="status_name"
                          :rules="[v => !!v || 'status is required']"
                          return-object
                          persistent-hint
                          required
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs2><br><br>
                        <label style="color: grey">Category*</label>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                          :items="items.category"
                          v-model="category_select"
                          :hint="`${category_select.category_title}, ${category_select.category_id}`"
                          single-line
                          :rules="[v => !!v || 'category is required']"
                          item-text="category_title"
                          item-value="category_id"
                          return-object
                          persistent-hint
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-text-field name="choice_costCode"
                                  label="Cost Code"
                                  v-model="items.choice_costCode"
                    >
                    </v-text-field>

                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="white--text indigo">Back</v-btn>
                  <v-btn class="white--text indigo">Edit</v-btn>
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
                      name="choice_file"
                      id="choice_file"
                    > <br><br>
                    <v-btn @click="postFile" type="submit" class="cyan lighten-4">Upload</v-btn>
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
        items: {
          choice_code: '',
          choice_name: '',
          choice_photo: '',
          choice_length: '',
          choice_company: '',
          faculty_password: '',
          choice_description: '',
          choice_file: 'E:/file1.pdf',
          choice_status: '',
          choice_quantity: '',
          choice_unitCost: '',
          choice_costCode: '',
          category_id: '',
          category: [
            {category_title: 'aaa', category_id: '1'},
            {category_title: 'bbb', category_id: '2'},
            {category_title: 'ccc', category_id: '3'},
            {category_title: 'ddd', category_id: '4'}
          ]
        },
        status_list: [
          {status_name: 'Pending'},
          {status_name: 'Complete'}
        ],
        sideNav: false,
        right: null
      }
    },
    computed: {
      formIsValid () {
        return this.choice_code !== '' &&
          this.choice_name !== '' &&
          this.choice_photo !== '' &&
          this.choice_description !== '' &&
          this.choice_unitCost !== '' &&
          this.choice_status !== ''
      }
    },
    methods: {
      onImageSelected (event) {
        this.$router.push('./changeImage')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFileSelected (event) {
        this.items.choice_file = event.target.files[0]
        console.log(this.items.choice_file)
      },
      addChoice () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          fd.append('choice_code', this.choice_code)
          fd.append('choice_name', this.choice_name)
          fd.append('choice_company', this.choice_company)
          fd.append('choice_description', this.choice_description)
          fd.append('choice_status', this.choice_status)
          fd.append('choice_quantity', this.choice_quantity)
          fd.append('choice_unitCost', this.choice_unitCost)
          fd.append('choice_costCode', this.choice_costCode)
          axios.patch('http://localhost:3002/admin/choice/Choice', fd,
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
      },
      postFile () {
        const fd = new FormData()
        var jwt = Vue.localStorage.get('token')
        console.log(this.$route.params.id)
        console.log(this.items.choice_file)
        console.log('view id called' + jwt)
        if (jwt) {
          fd.append('choice_file', this.items.choice_file)
          axios.post('http://' + this.$route.params.id, fd,
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
        } else {
          this.$router.push('/student/login')
        }
      }
    }
  }
</script>
