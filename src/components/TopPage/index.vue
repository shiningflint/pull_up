<template>
  <GmapMap
    :center="{lat:35.658725, lng:139.702118}"
    :zoom="13"
  />
</template>

<script>
import { fetchBars } from '../../api'

export default {
  created () {
    fetchBars()
  }
}
</script>

<style scoped>
.vue-map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
