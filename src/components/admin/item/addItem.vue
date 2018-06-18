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
                <v-btn class="white--text indigo">Add to table</v-btn>
              </v-card-actions>
            </v-card>

            <v-container fluid="true">
              <v-card>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="items_detail"
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.item_name }}</td>
                      <td>{{ props.item.item_description }}</td>
                      <td>{{ props.item.item_file }}</td>
                      <td>{{ props.item.item_category }}</td>
                      <td>{{ props.item.item_choices }}</td>
                      <td>
                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                          <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                          <v-icon color="pink">delete</v-icon>
                        </v-btn>
                      </td>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="white--text indigo">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>

              </v-container>

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
        choices: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ],
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
        category: [
          {category_title: 'aaa', category_id: '1'},
          {category_title: 'bbb', category_id: '2'},
          {category_title: 'ccc', category_id: '3'},
          {category_title: 'ddd', category_id: '4'}
        ],
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
          {
            item_name: 'item 1'
          },
          {
            item_name: 'item 2'
          }
        ]
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
          const fd = new FormData()
          fd.append('choice_code', this.item_title)
          fd.append('choice_name', this.item_description)
          fd.append('choice_photo', this.item_file)
          fd.append('choice_company', this.item_allowence)
          fd.append('choice_description', this.category)
          fd.append('choice_file', this.choices)
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
          this.$router.push('/admin/')
        }
      }
    }
  }
</script>
