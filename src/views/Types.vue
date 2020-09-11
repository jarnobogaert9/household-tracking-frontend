<template>
  <div>
    <h1 class="title">Create type</h1>
    <b-message v-if="errors.length != 0" type="is-warning" aria-close-label="Close message">
      <p v-for="error in errors" :key="error">{{error}}</p>
    </b-message>
    <b-message v-if="successMsg" type="is-success">
      <p>{{successMsg}}</p>
    </b-message>
    <b-field label="Title" label-position="">
      <b-input v-model="form.title" placeholder="Enter title ex. aardappelen schillen"></b-input>
    </b-field>
    <!-- <b-field label="Color" label-position="">
      <b-input v-model="form.color" placeholder="Enter hex code ex. #232323"></b-input>
    </b-field> -->
    <b-button @click="add" type="is-primary" expanded>Add</b-button>
    <h2 class="mt-6 title is-5">All types</h2>
    <section>
        <b-table :data="types">
            <b-table-column field="Type" label="Type" v-slot="props">
                {{ props.row.title }}
            </b-table-column>
            <b-table-column field="Action" label="Action">
              <b-button type="is-danger">Remove</b-button>
            </b-table-column>
        </b-table>
    </section>


  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      form: {
        title: null,
        color: null,
      },
      successMsg: null,
      types: []
    }
  },
  created () {
    this.fetchTypes();
  },
  methods: {
    async add() {
      this.errors = [];
      this.successMsg = null;
      const valid = this.validateFields();
      if (valid) {
        const data = {
          title: this.form.title,
          color: this.form.color ? this.form.color : null
        };
        console.log(data);
        const response = await fetch(`http://localhost:3333/api/v1/types`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data )
        });
        const json = await response.json();
        if (response.status == 201) {
          this.successMsg = "Successfully created new type."
          this.clearFields();
          this.fetchTypes();
        } else {
          console.log(json.msg);
        }
      }
    },
    validateFields() {
      if (!this.form.title) {
        this.errors.push('Title is required.');
        return false;
      }
      return true;
    },
    clearFields() {
      for (const key in this.form) {
          this.form[key] = null;
      }
    },
    async fetchTypes() {
      const response = await fetch('http://localhost:3333/api/v1/types', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      this.types = json;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>