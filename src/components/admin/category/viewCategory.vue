<template>
  <v-container fluid="true">
  <div>
    <v-spacer></v-spacer>

    <v-layout>
      <v-toolbar card prominent color="blue">
        <v-toolbar-title class="white--text offset-sm4 ">Categories details</v-toolbar-title>
          <v-spacer></v-spacer>
      </v-toolbar>
    </v-layout>
    <v-layout>
      <v-flex>

        <v-card>
          <v-card-title>
            Categories
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
      :items="categories"
      :search="search"
      hide-actions
      class="elevation-1"
    >

      <template slot="items" slot-scope="props">
        <td>{{ props.item.category_id }}</td>
        <td>{{ props.item.category_title }}</td>
        <td class="justify-left layout px-4">
          <v-btn icon class="mx-0" v-bind:to= "{name: 'adminEditCategory'}">
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
          text: 'Category Id', value: 'category_id'},
        {text: 'Category Title', value: 'category_title'},
        {text: 'Actions', value: 'category_id'}
      ],
      categories: [],
      editedIndex: 0,
      editedItem: {
        category_id: '',
        category_title: 0
      },
      defaultItem: {
        category_id: '',
        category_title: 0
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
        this.categories = [
          {
            category_title: 'Frozen Yogurt',
            category_id: 159
          },
          {
            category_title: 'Ice cream sandwich',
            category_id: 237
          },
          {
            category_title: 'Eclair',
            category_id: 262
          },
          {
            category_title: 'Cupcake',
            category_id: 305
          },
          {
            category_title: 'Gingerbread',
            category_id: 356
          },
          {
            category_title: 'Jelly bean',
            category_id: 375
          },
          {
            category_title: 'Lollipop',
            category_id: 392
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.categories.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.categories.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.categories.splice(index, 1)
      }
    }
  }
</script>
