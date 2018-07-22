<template>
  <GmapMap
    :center="{lat:10, lng:10}"
    :zoom="7"
  />
</template>

<style scoped>
.vue-map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
