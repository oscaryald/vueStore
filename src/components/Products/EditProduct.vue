<template>
    <v-dialog width="400px" v-model="dialog">
      <v-btn color="primary" class="headline" slot="activator">Edit</v-btn>
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex>
              <v-card-title>
                <h1>Edit product</h1>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider>
          </v-divider>
          <v-layout row>
              <v-flex>
                <v-card-text>
                  <v-text-field 
                    name="title" 
                    label="Title" 
                    type="text"
                    v-model="title"
                  ></v-text-field>
                  <v-text-field
                    name="description" 
                    label="Description Product" 
                    type="text"
                    multi-line
                    v-model="description"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
          </v-layout>
          <v-layout row>
              <v-flex>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="light-blue darken-4" outline @click="onCancel">Cancel</v-btn>
                  <v-btn dark color="light-blue darken-4" @click="onSave">Save</v-btn>
                </v-card-actions>
              </v-flex>
          </v-layout>
          </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      dialog: false,
      title: this.product.title,
      description: this.product.description,
    }
  },
  methods: {
    onCancel() {
      this.title = this.product.title
      this.description = this.product.description
      this.dialog = false
    },

    onSave() {
      if (this.title !== '' &&  this.description !== '') {
        this.$store.dispatch('updateProduct', {
          title: this.title,
          description: this.description,
          id: this.product.id
        })
        this.dialog = false
      }
    }
  }
}
</script>