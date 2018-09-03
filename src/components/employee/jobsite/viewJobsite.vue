<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Jobsites details</v-toolbar-title>
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
              :items="items"
              :search="search"
              hide-actions
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <td>{{ props.item.jobsite_name }}</td>
                <td>{{ props.item.client_name }}</td>
                <td>{{ props.item.client_address }}</td>
                <td>{{ props.item.client_contact }}</td>
                <td>{{ props.item.client_email }}</td>
                <td>{{ props.item.zone_id }}</td>
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
        {text: 'Job site Name', value: 'jobsite_name'},
        {text: 'Client name', value: 'client_name'},
        {text: 'Address', value: 'client_address'},
        {text: 'Contact No.', value: 'client_contact'},
        {text: 'Email ', value: 'client_email'},
        {text: 'Zones', value: 'zone_id'}
      ],
      zones: []
    }),
    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = [
          {
            jobsite_name: 'Frozen Yogurt'
          },
          {
            jobsite_name: 'Ice cream sandwich'
          },
          {
            jobsite_name: 'Eclair'
          }
        ]
      },

      deleteItem () {}
    }
  }
</script>
