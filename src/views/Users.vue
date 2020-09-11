<template>
  <div>
    <h1 class="title">Create user</h1>
    <b-message v-if="errors.length != 0" type="is-warning" aria-close-label="Close message">
      <p v-for="error in errors" :key="error">{{error}}</p>
    </b-message>
    <b-field label="First name" label-position="">
      <b-input v-model="form.firstName" placeholder="Enter first name"></b-input>
    </b-field>
    <b-field label="Last name" label-position="">
      <b-input v-model="form.lastName" placeholder="Enter last name"></b-input>
    </b-field>
    <b-field label="Email" label-position="">
      <b-input v-model="form.email" placeholder="Enter email"></b-input>
    </b-field>
    <b-field label="Password" label-position="">
      <b-input v-model="form.password" placeholder="Enter password"></b-input>
    </b-field>
    <b-field label="Password confirmation" label-position="">
      <b-input v-model="form.password2" placeholder="Re-enter password"></b-input>
    </b-field>
    <b-button @click="add" type="is-primary" expanded>Add</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      form: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        password2: null,
      }
    }
  },
  methods: {
    add() {
      // Validate fields
      this.errors = [];
      this.validateFields();
    },
    validateFields() {
      for (const key in this.form) {
        let element = this.form[key];
        if (!element) return this.errors.push('All fields are required.')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>