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
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
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
import { getTypes } from "../services/TypeService";
import { getUsers } from "../services/UserService";
import { createTask, getTasks } from "../services/TaskService";

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
        let data = {
          typeId: this.form.type,
          userId: this.form.user,
        }

        try {
          const [json, response] = await createTask({data});

          if (response.status == 201) {
            this.fetchTasks();
            this.clearFields();
          } else {
            console.log(response);
            console.log(json);
            // alert("Something went wrong while creating task.");
          }
        } catch (err) {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Something went wrong while calling <u>task service</u>. <b>Please reload page.</b>`,
            type: "is-danger",
          });
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
      try {
        const [results] = await getTypes();
        this.types = results;
      } catch (err) {
        console.log(err);
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong while calling <u>type service</u>. <b>Please reload page.</b>`,
          type: "is-danger",
        });
      }
    },
    async fetchUsers() {
      try {
        const [results] = await getUsers();
        this.users = results;
      } catch (err) {
        console.log(err);
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong while calling <u>user service</u>. <b>Please reload page.</b>`,
          type: "is-danger",
        });
      }
    },
    async fetchTasks() {
      try {
        const [results] = await getTasks();
        this.tasks = results;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong while calling <u>task service</u>. <b>Please reload page.</b>`,
          type: "is-danger",
        });
      }
    },
  },
};
</script>
<style scoped>
</style>