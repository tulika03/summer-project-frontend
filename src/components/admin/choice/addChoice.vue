<template>
  <v-container fluid="true">
       <v-spacer></v-spacer>
    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex  xs12 sm10 md9 offset-sm1 offset-md2>
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Add choice</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Choice code"
                    v-model="choice_code"
                    name="choice_code"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    label="Choice Name"
                    v-model="choice_name"
                    name="choice_name"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <label style="color: grey">Upload Image*</label>    <br><br>
                  <div>
                    <input type=file
                           @change="onFileSelected"
                           class="text--primary" required
                           :rules="[v => !!v || 'image is required']"
                           accept="image/*"
                    >
                  </div >
                  <br>
                  <v-text-field
                    label="Choice length"
                    name="choice_length"
                    v-model.number="choice_length"
                    type="email"
                  ></v-text-field>

                  <v-text-field
                    label="Company"
                    name="choice_company"
                    v-model="choice_company"
                    required
                    :rules="[v => !!v || 'Company is required']"
                  ></v-text-field>

                  <v-flex xs12>
                    <v-text-field
                      :rules="[(v) => v.length <= 400 || 'Max 400 characters']"
                      :counter="400"
                      v-model="choice_description"
                      label="Description"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <label style="color: grey">Add choice file</label>
                    <br><br>
                  </v-flex>
                  <v-flex>  <input type=file
                                   @change="onFileSelected"
                                   class="text--primary"
                                   accept=""
                  ></v-flex>


                  <v-layout row wrap>
                    <v-flex xs2><br><br>
                     <label style="color: grey">Status*</label>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        :items="status_list"
                        v-model="choice_status"
                        :hint="`${choice_status.status_name}`"
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
                        :items="categories"
                        v-model="categories"
                        :hint="`${categories.category_title}, ${categories.categoryId}`"
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
                                v-model="choice_costCode"
                  >
                  </v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text indigo">Back</v-btn>
                <v-btn class="white--text indigo">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
     </v-container>
</template>


<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        choice_code: '',
        category_select: '',
        codeRules: [
          v => !!v || 'Code is required',
          v => v.length <= 10 || 'Name must be less than 11 characters'
        ],
        choice_name: '',
        nameRules: [
          v => !!v || 'name is required',
          v => v.length <= 50 || 'Name must be less than 51 characters'
        ],
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
        categoryId: '',
        status_list: [
          {status_name: 'Pending'},
          {status_name: 'Complete'}
        ],
        categories: [],
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
        this.choice_photo = event.target.files[0]
        console.log(this.choice_photo)
      },
      onFileSelected (event) {
        this.choice_file = event.target.files[0]
        console.log(this.choice_file)
      },
      addChoice () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          fd.append('choice_code', this.choice_code)
          fd.append('choice_name', this.choice_name)
          fd.append('choice_photo', this.choice_photo)
          fd.append('choice_company', this.choice_company)
          fd.append('choice_description', this.choice_description)
          fd.append('choice_file', this.choice_file)
          fd.append('choice_status', this.choice_status)
          fd.append('choice_quantity', this.choice_quantity)
          fd.append('choice_unitCost', this.choice_unitCost)
          fd.append('choice_costCode', this.choice_costCode)
          axios.post('http://localhost:3002/admin/choice/addChoice', fd,
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
          this.$router.push('/admin/login')
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
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/admin/login')
      }
    }
  }
</script>
