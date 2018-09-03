<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Todo List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>
            <v-expansion-panel focusable>
              <v-expansion-panel-content v-for="(val,i) in todos" :key="i" >
                <div slot="header" ><h3>{{val.todo_Jobsite.job_name}}</h3></div>           
                    <v-card>
                      <v-card-text class="grey lighten-5">
                        <v-data-table
                          :headers="headers"
                          :items="todos"
                          :search="search"
                          hide-actions
                          class="elevation-1"
                        >
                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.todo_title }}</td>
                            <td>{{ props.item.todo_message }}</td>                            
                            <td>
                              <v-list>
                                <template v-for="i in props.item.todo_assignedTo_admin">
                                  <v-list-tile-content :key="i._id">
                                    <v-list-tile-title v-html="i.admin_firstName"></v-list-tile-title>
                                    <v-list-tile-title v-html="i.admin_lastName"></v-list-tile-title>
                                  </v-list-tile-content>
                                </template>
                              </v-list>
                            </td>
                            <td>
                              <v-list>
                                <template v-for="item in props.item.todo_assignedTo_user">
                                  <v-list-tile-content :key="item._id">
                                    <v-list-tile-title v-html="item.employee_firstName"></v-list-tile-title>
                                    <v-list-tile-title v-html="item.employee_lastName"></v-list-tile-title>
                                  </v-list-tile-content>
                                </template>
                              </v-list>
                            </td> 
                            <td>
                              <v-list>
                                <template v-for="item in props.item.todo_cc_admin">
                                  <v-list-tile-content :key="item._id">
                                    <v-list-tile-title v-html="item.admin_firstName"></v-list-tile-title>
                                    <v-list-tile-title v-html="item.admin_lastName"></v-list-tile-title>
                                  </v-list-tile-content>
                                </template>
                              </v-list>
                            </td>
                            <td>
                              <v-list>
                                <template v-for="item in props.item.todo_cc_user">
                                  <v-list-tile-content :key="item._id">
                                    <v-list-tile-title v-html="item.employee_firstName"></v-list-tile-title>
                                    <v-list-tile-title v-html="item.employee_lastName"></v-list-tile-title>
                                  </v-list-tile-content>
                                </template>
                              </v-list>
                            </td>                       
                            <td>{{ props.item.todo_priority  }}</td>
                            <td>{{ props.item.todo_status }}</td>
                            <td>{{ props.item.todo_dueDate }}</td> 
                            <td>
                              <v-list>
                                <template v-for="item in props.item.todo_createdBy_user">
                                  <v-list-tile-content :key="item._id">
                                    <v-list-tile-title v-html="item.employee_firstName"></v-list-tile-title>
                                    <v-list-tile-title v-html="item.employee_lastName"></v-list-tile-title>
                                  </v-list-tile-content>
                                </template>
                              </v-list>
                            </td>                                                    
                          </template>
                          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                            From {{ pageStart }} to {{ pageStop }}
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>

                  

              </v-expansion-panel-content>
            </v-expansion-panel>
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
        {text: 'Title', value: 'todo_title'},
        {text: 'Message', value: 'todo_message'},
        {text: 'Assigned To:', value: ['todo_assignedTo_user','todo_assignedTo_admin']},
        {text: 'CC:', value: ['todo_cc_user','todo_cc_admin']},
        {text: 'Priority:', value: 'todo_priority'},
        {text: 'Status:', value: 'todo_status'},
        {text: 'Date: ', value: 'todo_dueDate'},
        {text: 'Created By:', value: 'todo_createdBy_user'},
        
      ],
      todos:[{
        todo_title: '',
        todo_status:'',        
        todo_priority:'',        
        todo_message:'',
        todo_createdBy_user:'',       
        todo_cc_user:[],
        todo_cc_admin:[],
        todo_assignedTo_user:[],
        todo_assignedTo_admin:[],
        todo_checklist:[],
        todo_dueDate:'',
        todo_Jobsite:[],
        todo_attachment:[],     
      }],     
      jobsites:[],
    //j_length:'',

        jobnames:[], 
      /*zones: [],
      choices: [],
      zone_name: 'Kitchen',
      item_name: 'jsd sdus dususfjdnux 1',
      item_category: 'Appliance',
      item_choices: '3',
      item_status: 'pending',
      item_allowence: '12,34,567',
      item_id: '923983n938n3939388y8'*/
    }),
    created () {
      this.getTodo()
    },
    methods: {
        getTodo (){
            console.log(Vue.localStorage.get('token'))
            var jwt = Vue.localStorage.get('token')
            if (jwt) {
                axios.get('http://localhost:3002/todo/viewTodo', {
                headers: {
                    'Authorization': 'bearer ' + Vue.localStorage.get('token')
                }
                })
                .then(response => {
                    this.todos = response.data
                    //console.log(response.data)
                    console.log(this.todos)
                   /* let i=0;
                    while(this.todos)
                    {
                        this.jobsites.push(this.todos[i].todo_Jobsite);
                        i++;
                    }
                  //  j_length=i+1;
                  console.log('jobsite')
                    console.log(jobsites);*/
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                this.$router.push('/employee/employeeLogin')
            }

            //jobsite
            /*if (jwt) {
                for(let i=0;i<j_length;i++)
                {
                    axios.get('http://localhost:3002/admin/viewJobsite/:' + jobsites[i], {
                    headers: {
                        'Authorization': 'bearer ' + Vue.localStorage.get('token')
                    }
                    })
                    .then(response => {
                        this.jobnames = response.data
                        console.log(response.data)
                       /* let i=0;
                        while(this.temp_jobnames)
                        {
                            this.map_jobsite.push(jobsites[i],temp_jobnames[i])
                            this.jobsites.push(this.todos[i].todo_Jobsite);
                            i++;
                        }
                        j_length=i;
                        //console.log(jobsites);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }                    
            } else {
                this.$router.push('/employee/employeeLogin')
            }*/
        },
       deleteData: function (_id) {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          axios.delete('http://localhost:3002/todo/deleteTodo/' + _id, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(res => {
              console.log(res)
              window.alert('data deleted successfully...')
              location.reload()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$router.push('/employee/employeeLogin')
        }
      }
    }
  }
</script>
