<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex  xs12 sm10 md7 offset-sm1 offset-md2>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Update Image</v-toolbar-title>
          </v-toolbar>
          <v-card-media
            height="300px"
            :src="items.imageURL">
            <v-layout column class="media"
            contain>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn fab @click="onPickFile">
                  <v-icon>camera_alt</v-icon>
                </v-btn>
                <input type=file
                       @change="onFileSelected"
                       ref="fileInput"
                       style="display: none"
                >
                             </v-card-title>
              <v-spacer></v-spacer>

            </v-layout>
          </v-card-media>
          <v-card-actions>
            <v-btn @click="saveImage">save</v-btn>
            <v-btn @click="back">back</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        items: {
          imageURL: ''
        },
        image: ''
      }
    },
    created: function () {
      this.items.imageURL = 'https://st.hzcdn.com/fimgs/be9128760584a324_7079-w603-h345-b0-p0--.jpg'
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFileSelected: function (event) {
        const file = event.target.files[0]
        this.image = file
        this.items.imageURL = URL.createObjectURL(file)
      },
      saveImage () {
        this.items.imageURL = this.image
        console.log(this.items.imageURL.name)
        location.reload()
      },
      back () {
        this.$router.push('./editChoice')
      }
    }
  }
</script>
