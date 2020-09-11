<template>
<div>
    <b-navbar class="mb-5" type="is-white">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{name: 'Home'}">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{name: 'Types'}">
                Types
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{name: 'Users'}">
                Users
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <!-- Slot to load other views -->
    <div class="container">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>