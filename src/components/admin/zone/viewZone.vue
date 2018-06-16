<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Zone details</v-toolbar-title>
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
                <td>{{ props.item.zone_name }}</td>
                <td class="justify-left layout px-4">
                  <v-btn icon class="mx-0" v-bind:to= "{name: 'adminEditZone'}">
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
          text: 'Zone Name', value: 'zone_name'},
        {text: 'Actions', value: 'zone_name'}
      ],
      zones: []
    }),
    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.zones = [
          {
            zone_name: 'Frozen Yogurt'
          },
          {
            zone_name: 'Ice cream sandwich'
          },
          {
            zone_name: 'Eclair'
          },
          {
            zone_name: 'Cupcake'
          },
          {
            zone_name: 'Gingerbread'
          },
          {
            zone_name: 'Jelly bean'
          },
          {
            zone_name: 'Lollipop'
          }
        ]
      },

      deleteItem (item) {
        const index = this.categories.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.categories.splice(index, 1)
      }
    }
  }
</script>
