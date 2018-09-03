<template>
  <v-container fluid="true">
         <v-layout row wrap>
          <v-flex  xs12 sm10 md9 offset-sm1 offset-md2>
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Add Item</v-toolbar-title>
              </v-toolbar>
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
                      <label style="color: grey">Category</label>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        :items="category"
                        v-model="category_select"
                        :hint="`${category_select.category_title}, ${category_select.category_id}`"
                        single-line
                        :rules="[v => !!v || 'category is required']"
                        item-text="category_name"
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
                        :items="this.zone_ids"
                        v-model="zone_select"
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
                  <v-flex xs8>
                    <v-autocomplete
                      v-model="select"
                      :items="choices"                      
                      chips                      
                      label="Choices"
                      item-text="choice_name"
                      item-value="_id"
                      multiple
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >
                        <v-chip
                          :selected="data.selected"
                          close
                          class="chip--select-multi"
                          @input="data.parent.selectItem(data.item)"
                        >
                          <v-avatar>
                            <img :src="data.item.choice_file">
                          </v-avatar>
                          {{ data.item.choice_name }}                          
                        </v-chip>
                      </template>
                      <template
                        slot="item"
                        slot-scope="data"
                      >
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-avatar>
                            <img :src="data.item.choice_photo">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.choice_name"></v-list-tile-title>
                             <v-list-tile-sub-title v-html="data.item.category.category_name"></v-list-tile-sub-title>
                            <v-list-tile-sub-title v-html="data.item.category_name"></v-list-tile-sub-title>                            
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                
                <v-btn class="white--text indigo" @click="addItem">Add Item</v-btn>
              </v-card-actions>
            </v-card>



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
        jobsite:'5b8680e47cabc71fa0079d1d',
        fetchedJobsite:[],
        item_ids:[],  
        zone_ids:[],  
        zone_select:'',           
        category_select: '',
        select: [],
        choices: [],
        item_title: '',
        nameRules: [
          v => !!v || 'name is required',
          v => v.length <= 50 || 'Name must be less than 51 characters'
        ],
        item_description: '',
        item_file: '',
        item_allowence: '',
        category_id: '',
        status_list: [
          {status_name: 'Pending'},
          {status_name: 'Complete'}
        ],
        category: [],
        sideNav: false,
        right: null,
        dialog: false,
        headers: [
          {
            text: 'item Name',
            align: 'left',
            value: 'item_name'
          },
          { text: 'Description', value: 'item_description' },
          { text: 'File', value: 'item_file' },
          { text: 'Category', value: 'item_category' },
          { text: 'Choice', value: 'item_choice' },
          { text: 'Action' }
        ],
        items_detail: [          
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.item_title !== '' &&
          this.item_description !== '' &&
          this.item_file !== '' &&
          this.item_allowence !== '' &&
          this.select !== '' &&
          this.choices !== ''
      }
    },
    methods: {
      onFileSelected (event) {
        this.item_file = event.target.files[0]
        console.log(this.item_file)
      },
      addItem () {
        //add item into item table
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()          
          fd.append('item_title', this.item_title)
          fd.append('item_description', this.item_description)
          fd.append('item_file', this.item_file)
          fd.append('item_allowence', this.item_allowence)
          fd.append('item_categoryId', this.category_select._id)
          fd.append('choiceId', this.select)
          fd.append('item_jobsite',this.jobsite)
          fd.append('item_zone',this.zone_select)
          axios.post('http://localhost:3002/item/addItem', fd,
            {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => {
              console.log('r: ', JSON.stringify(r, null, 2)) 
              this.items_detail.push(this.item_title)
              })
            .catch(error => {
              console.log(error.response)
            })
          //window.alert('data inserted successfully.')
        } else {
          this.$router.push('/employee/employeeLogin')
        }
      },
      async getCategory () {
        console.log('Category detail')        
        var jwt = localStorage.getItem('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/category/viewCategory', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => {                
              this.category = response.data          
              console.log(this.category)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$router.push('/employee/employeeLogin')
        }
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
      getChoice () {
        console.log('Choice detail')                
        var jwt = localStorage.getItem('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/choice/viewChoice', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => {                
              this.choices = response.data          
              console.log(this.choices)                   
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$router.push('/employee/employeeLogin')
        }
      },
      addTable() {
      }
    },
    mounted () {
        this.getCategory(),
        this.getChoice(),
        this.getZone()        
    }  
  }
</script>