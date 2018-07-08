<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Choice details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>

          <v-card>
            <v-card-title>
              Choice
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
              :items="choices"
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
        {text: 'Choice Code', value: 'choice_code'},
        {text: 'choice name', value: 'choice_name'},
        {text: 'Photo', value: 'choice_photo'},
        {text: 'Description', value: 'choice_description'},
        {text: 'File ', value: 'choice_file'},
        {text: 'Status', value: 'choice_status'},
        {text: 'Price', value: 'choice_unitCost'}
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
            choice_name: 'Frozen Yogurt'
          },
          {
            choice_name: 'Ice cream sandwich'
          },
          {
            choice_name: 'Eclair'
          },
          {
            choice_name: 'Cupcake'
          },
          {
            choice_name: 'Gingerbread'
          },
          {
            choice_name: 'Jelly bean'
          },
          {
            choice_name: 'Lollipop'
          }
        ]
      },

      deleteItem (item) {}
    }
  }
</script>
