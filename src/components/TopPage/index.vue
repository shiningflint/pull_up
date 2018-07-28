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
import { fetchBars, createMarker, updateBar } from '../../api'

export default {
  data () {
    return {
      map: null,
      geocoder: null,
      markers: [],
      bars: []
    }
  },
  methods: {
    addMarker (map, lat, lng) {
      const oneMark = createMarker(map, lat, lng)
      this.markers.push(oneMark)
    },
    addBarsToMarker (bars) {
      bars.map(bar => {
        if (bar.lat && bar.lng) {
          this.addMarker(this.map, bar.lat, bar.lng)
        } else {
          this.geocoder.geocode({ 'address': bar.address }, (results, status) => {
            if (status === 'OK') {
              const barLat = results[0].geometry.location.lat()
              const barLng = results[0].geometry.location.lng()
              bar.lat = barLat
              bar.lng = barLng
              updateBar(bar.id, bar)
              this.addMarker(this.map, barLat, barLng)
            }
          })
        }
      })
    }
  },
  mounted () {
    // fetch bars first then load map
    fetchBars().then(rawBars => {
      this.bars = rawBars
      return this.$refs.gmap.$mapPromise
    }).then(map => {
      this.map = map, // eslint-disable-next-line
      this.geocoder = new google.maps.Geocoder()
      this.addBarsToMarker(this.bars) // eslint-disable-next-line
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
