<template>
  <GmapMap
    ref="gmap"
    :center="{lat:35.658725, lng:139.702118}"
    :zoom="13"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script>
/* eslint-disable */
import { fetchBars, createMarker } from '../../api'

export default {
  data () {
    return {
      map: null,
      geocoder: null,
      markers: []
    }
  },
  mounted () {
    // load map & geocoder first, then fetch bars
    this.$refs.gmap.$mapPromise.then(map => {
      this.map = map,
      this.geocoder = new google.maps.Geocoder()
      return fetchBars()
    }).then(rawBars => {
      rawBars.map(bar => {
        if (bar.lat && bar.lng) {
          const oneMark = createMarker(this.map, bar.lat, bar.lng)
          this.markers.push(oneMark)
        }
      })

      // geocoder.geocode({ 'address': '中野区本町2-51-9' }, (results, status) => {
      //   console.log(results)
      //   console.log(status)
      //   console.log(results[0].geometry.location.lat())
      // })
    }).catch(error => console.error('Maps or fetching bars failing, maybe it\'s the frikkin internet', error))
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
