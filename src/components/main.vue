<template>
  <div class="main">
    <h1>{{ username }}:{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Welcome to the main vue ',
        username: ''
      }
    },
    created(){
        this.username= this.$route.params.username;
    }
  }
</script>

<style>
  .main {
    font-size: 30px;
    color: #000000;
  }
</style>