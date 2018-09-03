<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex  xs12 sm10 md9 offset-sm1 offset-md1>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Add Todo</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Todo Title"
                    v-model="todo_title"
                    name="todo_title"
                    required
                    :rules="titleRules"
                  ></v-text-field>

                  <v-flex xs12 sm6 d-flex>
                    <v-select
                      :items="priority_list"
                      v-model="todo_priority"
                      :hint="`${todo_priority.priority_name}`"
                      single-line
                      item-text="priority_name"
                      item-value="priority_name"
                      label="Priority"
                      solo
                      return-object
                      persistent-hint
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field
                      :rules="[v => !!v || 'Message is required']"                      
                      v-model="todo_message"
                      label="Message"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-layout wrap>
                    <v-flex xs12>
                      <v-autocomplete
                        v-model="todo_Jobsite"
                        :items="jobsites"
                        :loading="isLoading"
                        :search-input.sync="search"                        
                        hide-selected
                        item-text="job_name"
                        item-value="_id"
                        placeholder="Select Jobsites or Start typing to Search"
                        small-chips
                        required
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>

                  
                   <v-layout row class="mb-2">
                      <v-flex xs12 sm6offset-sm3>
                      <v-date-picker v-model="todo_dueDate">
                      </v-date-picker>
                        <p> {{ todo_dueDate }}</p>
                      </v-flex>
                    </v-layout>

                  <v-flex xs12>
                    <label style="color: grey">Add attachment file</label>
                    <br><br>
                  </v-flex>
                  <v-flex>  <input type=file
                                   @change="onFileSelected"
                                   class="text--primary"
                                   accept=""
                  ></v-flex>

                  <v-layout wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="employee_assigned_model"
                      :items="employees"                      
                      chips
                      :disabled="isUpdating"
                      label="Assign to users"
                      item-text="employee_firstName"
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
                            <img :src="data.item.employee_photo">
                          </v-avatar>
                          {{ data.item.employee_firstName }}
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
                            <img :src="data.item.employee_photo">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.employee_firstName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="data.item._id"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="admin_assigned_model"
                      :items="admins"                      
                      chips
                      :disabled="isUpdating"
                      label="Assign to admins"
                      item-text="admin_firstName"
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
                            <img :src="data.item.admin_photo">
                          </v-avatar>
                          {{ data.item.admin_firstName }}
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
                            <img :src="data.item.admin_photo">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.admin_firstName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="data.item._id"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>


                <v-layout wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="employee_cc_model"
                      :items="employees"                      
                      chips
                      :disabled="isUpdating"
                      label=" Add CC users"
                      item-text="employee_firstName"
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
                            <img :src="data.item.employee_photo">
                          </v-avatar>
                          {{ data.item.employee_firstName }}
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
                            <img :src="data.item.employee_photo">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.employee_firstName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="data.item._id"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="admin_cc_model"
                      :items="admins"                      
                      chips
                      :disabled="isUpdating"
                      label=" Add CC admins"
                      item-text="admin_firstName"
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
                            <img :src="data.item.admin_photo">
                          </v-avatar>
                          {{ data.item.admin_firstName }}
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
                            <img :src="data.item.admin_photo">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.admin_firstName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="data.item._id"></v-list-tile-sub-title>
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
                <v-btn color="primary" @click="addTodo">Add</v-btn>
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
        todo_title: '',
        status_list: [
          {status_name: 'Pending'},
          {status_name: 'Complete'}
        ],
        todo_priority:'',
        priority_list:[
            {priority_name:'Low'},
            {priority_name:'Medium'},
            {priority_name:'High'}
        ],
        temporary: '',
        todo_message:'',
        todo_createdBy_user:'',       
        todo_cc_user:[],
        todo_cc_admin:[],
        todo_assignedTo_user:[],
        todo_assignedTo_admin:[],
        todo_checklist:[],
        todo_dueDate:'',
        todo_Jobsite:'',
        todo_attachment:[],
        employees:[],
        employee_cc_model: [],
        employee_assigned_model: [],
        admins:[],
        admin_cc_model: [],
        admin_assigned_model: [],
        jobsites:[], 
        temp_attachment: '',       
        search: '',
        isLoading: '',
        isUpdating:false,
        titleRules: [
          v => !!v || 'Todo title is required'
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.todo_title !== '' &&
        this.todo_status !== '' &&
        this.todo_message !== '' &&
        this.todo_dueDate !== '' &&
        this.todo_Jobsite !== '' 
      }
    },
    methods: {
      onImageSelected (event) {
        this.temp_attachment = event.target.files[0]
        console.log(this.temp_attachment)
      },
      onFileSelected (event) {
        this.todo_attachment = event.target.files[0]
        console.log(this.todo_attachment)
      },
      addTodo: function () {
        //console.log('zone name: ' + this.zone_name)
        
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          fd.append('todo_title', this.todo_title)
          fd.append('todo_status', 'Pending')
          fd.append('todo_priority', this.todo_priority.priority_name)
          fd.append('todo_message', this.todo_message)
          //fd.append('todo_createdBy_user', this.todo_createdBy_user)
          fd.append('todo_createdBy_admin', this.todo_createdBy_admin)
          fd.append('todo_cc_user', this.employee_cc_model)
          fd.append('todo_cc_admin', this.admin_cc_model)
          fd.append('todo_assignedTo_user', this.employee_assigned_model)
          fd.append('todo_assignedTo_admin', this.admin_assigned_model)
          fd.append('todo_checklist', this.todo_checklist)
          fd.append('todo_dueDate', this.todo_dueDate)
          fd.append('todo_Jobsite', this.todo_Jobsite)
          fd.append('todo_attachment', this.todo_attachment)
          console.log(this.todo_title)
          console.log( this.todo_createdBy_user)
          console.log( this.employee_cc_model)
          console.log( this.todo_dueDate)
          axios.post('http://localhost:3002/todo/addTodo', fd,
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
          console.log('authentication not successful...')
        }
      },
      async getDetailEmployee () {
        console.log('employee detail')
        this.temporary=localStorage.getItem('loginID')
        console.log(this.temporary)
        var jwt = localStorage.getItem('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/employee/view', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => {
              /*this.todo_createdBy_user = response.data,              
              this.todo_cc_user = response.data,              
              this.todo_assignedTo_user = response.data */   
              this.employees = response.data          
              console.log(this.employees)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$router.push('/admin/login')
        }
      },
      getDetailAdmin () {
          console.log('admin detail')
          this.temporary=localStorage.getItem('loginID')
        console.log(this.temporary)
        
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/viewAdmin', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => {
              this.admins = response.data          
              console.log(this.admins)
              //console.log('admin detail')
              //console.log(Vue.localStorage.get('temp'))
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$router.push('/admin/login')
        }
    },
    getJobsite () {
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.get('http://localhost:3002/admin/jobsite/viewJobsite', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(response => {
              this.jobsites = response.data
              console.log(this.jobsites)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$router.push('/admin/login')
        }
    }
    
  },
  mounted () {
      this.getJobsite(),
      this.getDetailEmployee(),
      this.getDetailAdmin()
  }     
}
</script>
