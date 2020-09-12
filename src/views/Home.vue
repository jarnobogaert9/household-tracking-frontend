<template>
  <div>
    <b-message
      v-for="error in errors"
      :key="error"
      type="is-warning"
      aria-close-label="Close message"
    >
      <p>{{error}}</p>
    </b-message>
    <!-- <b-message auto-close :duration="500" v-if="successMsg" type="is-success">
      <p>{{successMsg}}</p>
    </b-message>-->
    <b-field label="Type">
      <b-select expanded placeholder="Select a type" v-model="form.type">
        <option v-for="option in types" :value="option._id" :key="option._id">{{ option.title }}</option>
      </b-select>
    </b-field>
    <b-field label="User">
      <b-select expanded placeholder="Select a user" v-model="form.user">
        <option v-for="option in users" :value="option._id" :key="option._id">{{ option.firstName }}</option>
      </b-select>
    </b-field>
    <b-button @click="add" type="is-primary" expanded>Add</b-button>

    <h2 class="mt-6 title is-5">Tasks</h2>
    <div class="containe">
      <b-loading :is-full-page="fals" v-model="isLoading"></b-loading>
      <div v-if="!isLoading">
        <div v-for="task in tasks" :key="task._id" class="card mb-2">
          <div class="card-content">
            <div class="content">
              <div class="containe">
                <div class="columns">
                  <div class="column">
                    <p>{{task.type.title}}</p>
                    <p>
                      {{task.createdAt | moment("d/MM/YYYY")}}
                      <br />
                      {{task.createdAt | moment("dddd MMMM YYYY")}}
                    </p>
                  </div>
                  <div class="column has-text-right">{{task.user.firstName}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import moment from 'vue-moment'

export default {
  name: "Home",
  created() {
    this.fetchTypes();
    this.fetchUsers();
    this.fetchTasks();
  },
  data() {
    return {
      form: {
        type: null,
        user: null,
      },
      types: [],
      users: [],
      tasks: [],
      errors: [],
      isLoading: true,
    };
  },
  methods: {
    async add() {
      this.errors = [];
      const valid = this.validateFields();
      if (valid) {
        console.log("Valid");
        const response = await fetch("http://localhost:3333/api/v1/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            typeId: this.form.type,
            userId: this.form.user,
          }),
        });
        const json = await response.json();
        if (response.status == 201) {
          this.fetchTasks();
          this.clearFields();
        } else {
          console.log(response);
          console.log(json);
          alert("Something went wrong.");
        }
      }
    },
    validateFields() {
      if (!this.form.type) this.errors.push("Type is required.");
      if (!this.form.user) this.errors.push("User is required.");
      return this.errors.length != 0 ? false : true;
    },
    clearFields() {
      for (const key in this.form) {
        this.form[key] = null;
      }
    },
    async fetchTypes() {
      const response = await fetch("http://localhost:3333/api/v1/types", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      this.types = json;
    },
    async fetchUsers() {
      const response = await fetch("http://localhost:3333/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      this.users = json;
    },
    async fetchTasks() {
      const response = await fetch("http://localhost:3333/api/v1/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      this.tasks = json;
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
</style>