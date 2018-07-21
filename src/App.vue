<template>
  <top-page/>
</template>

<script>
import TopPage from './components/TopPage/index.vue'

export default {
  name: 'app',
  components: {
    TopPage
  }
}
</script>

<style>
html {
  height: 100%;
  width: 100%;
}
body {
  background-color: #2b323a;
  color: white;
  height: 100%;
  width: 100%;
}
</style>
