<template>
  <div id="app">
    <ErrorBoundary>
      <router-view></router-view>
    </ErrorBoundary>
  </div>
</template>

<script>
import ErrorBoundary from './components/ErrorBoundary.vue'

export default {
  name: 'App',
  components: {
    ErrorBoundary
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: white;
  color: black;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

main {
  padding: 20px;
}
</style>
