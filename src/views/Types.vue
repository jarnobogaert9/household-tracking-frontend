<template>
  <div>
    <h1 class="title">Create type</h1>
    <b-message v-if="errors.length != 0" type="is-warning" aria-close-label="Close message">
      <p v-for="error in errors" :key="error">{{error}}</p>
    </b-message>
    <b-message auto-close :duration="500" v-if="successMsg" type="is-success">
      <p>{{successMsg}}</p>
    </b-message>
    <b-field label="Title" label-position="">
      <b-input @keypress.enter.native="add()" v-model="form.title" placeholder="Enter title ex. aardappelen schillen"></b-input>
    </b-field>
    <!-- <b-field label="Color" label-position="">
      <b-input v-model="form.color" placeholder="Enter hex code ex. #232323"></b-input>
    </b-field> -->
    <b-button @click="add" type="is-primary" expanded>Add</b-button>
    <h2 class="mt-6 title is-5">All types</h2>
    <section>
        <b-table :data="types" :loading="isLoading">
            <b-table-column field="Type" label="Type" v-slot="props">
                {{ props.row.title }}
            </b-table-column>
            <b-table-column field="Action" label="Action" v-slot="props">
              <b-button @click="remove(props.row._id)" type="is-danger">Remove</b-button>
              <!-- <b-button @click="remove(props.row._id)" type="is-danger">Remove</b-button> -->
            </b-table-column>
        </b-table>
    </section>
  </div>
</template>

<script>
import { createType, getTypes } from '../services/TypeService';
export default {
  data() {
    return {
      errors: [],
      form: {
        title: null,
        color: null,
      },
      successMsg: null,
      types: [],
      isLoading: true
    }
  },
  created () {
    this.fetchTypes();
  },
  methods: {
    async add() {
      this.successMsg = null;
      this.errors = [];
      const valid = this.validateFields();
      if (valid) {
        const data = {
          title: this.form.title,
          color: this.form.color ? this.form.color : null
        };
        console.log(data);
        const [json, response] = await createType({data});
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
      const [results] = await getTypes();
      this.types = results;
      this.isLoading = false;
    },
    async remove(id) {
      this.successMsg = null;
      const response = await fetch(`http://localhost:3333/api/v1/types/${id}`, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.status == 200) {
        this.successMsg = json.msg;
        this.fetchTypes();
      } else {
        alert('Something went wrong');
        console.log(response);
        console.log(json);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>