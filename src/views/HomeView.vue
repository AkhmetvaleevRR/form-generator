<template>
  <div class="home-page">
    <h1>Генератор форм Vue.js</h1>
    <router-link to="/demo" class="demo-link">demo</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.home-page {
  text-align: center;
  padding: 50px 20px;
  
  h1 {
    color: #42b983;
    margin-bottom: 20px;
  }
  
  .demo-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
    
    &:hover {
      background-color: #369870;
    }
  }
}
</style>