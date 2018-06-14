<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Employee details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>

          <v-card>
            <v-card-title>
              Employees
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="employees"
              :search="search"
              hide-actions
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <td>{{ props.item.employee_Id }}</td>
                <td>{{ props.item.employee_firstName }}</td>
                <td>{{ props.item.employee_lastName }}</td>
                <td>{{ props.item.employee_contact }}</td>
                <td>{{ props.item.employee_username }}</td>
                <td>{{ props.item.employee_email }}</td>
                <td class="justify-left layout px-4">
                  <v-btn icon class="mx-0" v-bind:to= "{name: 'adminEditEmployee'}">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>

              <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>



<script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Employee  Id', value: 'employee_Id'},
        {text: 'first Name', value: 'employee_firstName'},
        {text: 'Last Name', value: 'employee_lastName'},
        {text: 'Contact No.', value: 'employee_contact'},
        {text: 'Username', value: 'employee_username'},
        {text: 'Email id', value: 'employee_email'}
      ],
      employees: [],
      editedIndex: 0,
      editedItem: {
        employee_Id: '',
        employee_firstName: 0
      },
      defaultItem: {
        employee_Id: '',
        employee_firstName: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.employees = [
          {
            employee_firstName: 'Frozen Yogurt',
            employee_Id: 159
          },
          {
            employee_firstName: 'Ice cream sandwich',
            employee_Id: 237
          },
          {
            employee_firstName: 'Eclair',
            employee_Id: 262
          },
          {
            employee_firstName: 'Cupcake',
            employee_Id: 305
          },
          {
            employee_firstName: 'Gingerbread',
            employee_Id: 356
          },
          {
            employee_firstName: 'Jelly bean',
            employee_Id: 375
          },
          {
            employee_firstName: 'Lollipop',
            employee_Id: 392
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.employees.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.employees.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.employees.splice(index, 1)
      }
    }
  }
</script>
