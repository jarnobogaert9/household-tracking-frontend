<template>
  <nav-template>
    <router-view/>
  </nav-template>

</template>
<script>
import NavTemplate from './templates/NavTemplate.vue'
export default {
  components: {
    NavTemplate    
  }  
}
</script>

<style>
.container {
  width: 55%!important;
}
</style>
