<template>
  <v-container fluid="true">
    <div>
      <v-spacer></v-spacer>

      <v-layout>
        <v-toolbar card prominent color="blue">
          <v-toolbar-title class="white--text offset-sm4 ">Items details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-layout>
      <v-layout>
        <v-flex>
            <v-expansion-panel focusable>
              <v-expansion-panel-content v-for="(item,i) in 5" :key="i" >
                <div slot="header" ><h3>{{ zone_name }}</h3></div>
                   <v-expansion-panel>
                  <v-expansion-panel-content v-for="(item,i) in 2" :key="i" grow>
                    <div slot="header"> {{ item_name }}</div>
                    <div slot="header"><b>Category: </b> {{  item_category }}</div>
                    <div slot="header"><b>Choices: </b> {{  item_choices }}</div>
                    <div slot="header"><b>Allowence: </b> {{  item_allowence }}</div>
                    <div slot="header"><b>Status: </b> {{ item_status }}</div>

                    <v-card>
                      <v-card-text class="grey lighten-5">
                        <v-data-table
                          :headers="headers"
                          :items="choices"
                          :search="search"
                          hide-actions
                          class="elevation-1"
                        >

                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.choice_code }}</td>
                            <td>{{ props.item.choice_name }}</td>
                            <td><img :src="props.item.choice_photo" width="70px" height="50px" style="margin-top: 4px"></td>
                            <td>{{ props.item.choice_description }}</td>
                            <td>{{ props.item.choice_file }}</td>
                            <td>{{ props.item.choice_status }}</td>
                            <td>{{ props.item.choice_price }}</td>
                          </template>
                          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                            From {{ pageStart }} to {{ pageStop }}
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>

                  </v-expansion-panel-content>

                </v-expansion-panel>

              </v-expansion-panel-content>
            </v-expansion-panel>
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
      zones: [],
      choices: [],
      zone_name: 'Kitchen',
      item_name: 'jsd sdus dususfjdnux 1',
      item_category: 'Appliance',
      item_choices: '3',
      item_status: 'pending',
      item_allowence: '12,34,567',
      item_id: '923983n938n3939388y8'
    }),
    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.choices = [
          {
            choice_name: 'Frozen Yogurt',
            choice_photo: 'http://www.soleilre.com/wp-content/uploads/2017/11/interior-home-interiors-images-magnificent-and-shoise-com.jpg'
          },
          {
            choice_name: 'Ice cream sandwich',
            choice_photo: 'http://www.soleilre.com/wp-content/uploads/2017/11/interior-home-interiors-images-magnificent-and-shoise-com.jpg'
          },
          {
            choice_name: 'Eclair',
            choice_photo: 'http://www.soleilre.com/wp-content/uploads/2017/11/interior-home-interiors-images-magnificent-and-shoise-com.jpg'
          }
        ]
      },

      deleteItem (item) {
      }
    }
  }
</script>
