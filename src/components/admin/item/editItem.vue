<template>
  <v-container fluid="true">
    <v-layout row wrap>
      <v-flex xs12 sm10 md6 offset-sm2 offset-md3>
        <div>
          <v-toolbar color="cyan" dark tabs>
            <v-toolbar-title>Update Item</v-toolbar-title>
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
                 <v-card-text>
                  <v-form>

                    <v-text-field
                      label="Item title"
                      v-model="item_title"
                      name="item_title"
                      required
                      :rules="nameRules"
                    ></v-text-field>


                    <v-flex xs12>
                      <v-text-field
                        :rules="[v => !!v && v.length <= 400|| 'Description is required with max 400 words']"
                        :counter="400"
                        v-model="item_description"
                        label="Description"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-text-field
                      label="Item Allowance"
                      v-model="item_allowence"
                      name="item_allowence"
                      required
                      :rules="nameRules"
                    ></v-text-field>

                    <v-layout row wrap>
                      <v-flex xs2><br><br>
                        <label style="color: grey">Category*</label>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                          :items="category"
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

                    <v-layout row wrap>
                    <v-flex xs2><br><br>
                      <label style="color: grey">Zone</label>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        :items="item_zone"
                        v-model="item_zone"
                        single-line
                        :rules="[v => !!v || 'Zone is required']"
                        item-text="zone_name"
                        item-value="_id"
                        return-object
                        persistent-hint
                      ></v-select>
                    </v-flex>
                  </v-layout>

                    <v-layout wrap>
                      <v-flex xs12>
                        <v-select
                          v-model="select"
                          :items="choices"
                          label="Choices"
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
                  <v-btn class="white--text indigo">Update</v-btn>
                </v-card-actions>
              </v-card>

            </v-tab-item>
            <v-tab-item
              :id="'tab-2'"
            >
              <v-card class="white mb-3">
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
                    <v-spacer></v-spacer>
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
          item_title: '',
          item_description: '',
          item_file: '',
          item_allowence: '',
          category: '',
          choices: '',
          item_zone: ''
        },
        zone_ids:[],
        
        sideNav: false,
        right: null
      }
    },
    computed: {
      formIsValid () {
        return this.item_title !== '' &&
          this.item_description !== '' &&
          this.item_file !== '' &&
          this.item_allowence !== '' &&
          this.category !== '' &&
          this.choices !== '' &&
           this.item_zone !== ''
      }
    },
    methods: {
      async getDetail () {
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/item/viewItem/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(response => {
              this.items = response.data[0]
              //this.status.choice_status = this.choices.choice_status
              //this.status_select = this.status
              //console.log(this.status_select)
              this.category_select = this.items.category
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
        this.items.item_file = event.target.files[0]
        console.log(this.items.item_file)
        console.log('file check')
      },
      getZone () {
        console.log('Zone detail')                
        var jwt = localStorage.getItem('token')
        if (jwt) {
        //jobsite:'5b8680e47cabc71fa0079d1d',
          axios.get('http://localhost:3002/admin/jobsite/viewJobsite/5b8680e47cabc71fa0079d1d', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => { 
              this.fetchedJobsite = response.data
              for(let i=0;i<this.fetchedJobsite.job_zone.length;i++){
                this.zone_ids[i]=this.fetchedJobsite.job_zone[i]
              }       
              console.log("zone details:") 
              //console.log(response.data[0])
              //console.log(response.data.job_zone)
              console.log(this.zone_ids)                  
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$router.push('/employee/employeeLogin')
        }
      },
      updateItems () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          console.log(this.status_select.choice_status)
          console.log(this.category_select._id)
          axios.patch('http://localhost:3002/admin/item/updateItem/' + this.$route.params.id, {
            item_title: this.items.item_title,
            item_description: this.items.item_description,
            item_allowence: this.items.item_allowence,
            category: this.items.category,
            choices: this.items.choices,
            item_zone: this.items.item_zone
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
          //console.log(this.choices.choice_file)
          fd.append('item_file', this.items.item_file)
          axios.patch('http://localhost:3002/admin/item/updateFile/' + this.$route.params.id, fd, {
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
    mounted () {
      this.getDetail(),
      this.getZone()
    }
  }
</script>