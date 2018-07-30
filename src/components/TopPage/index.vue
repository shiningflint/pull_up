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
import {
  fetchBars,
  createMarker,
  updateBar,
  getBarArea,
  geocodeAddress
} from '../../api'

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
          getBarArea(bar.area_id).then(area => {
            const address = `${area} ${bar.address}`
            geocodeAddress(this.geocoder, address).then(({ lat, lng }) => {
              bar.lat = lat
              bar.lng = lng
              updateBar(bar.id, bar)
              this.addMarker(this.map, lat, lng)
            })
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
