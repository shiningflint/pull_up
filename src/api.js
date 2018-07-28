import { db } from './constants'

export function fetchBars () {
  return db.collection('bars').get()
    .then(querySnapshot => {
      let resultArray = []
      querySnapshot.forEach(doc => {
        resultArray.push(doc.data())
      })
      return resultArray
    })
}

/**
* Call this function after gmaps are loaded
* @param {GoogleMapObject}
* @param {Number}
* @param {Number}
* @return {GoogleMapMarkerObject}
*/
export function createMarker (map, lat, lng) {
  return new google.maps.Marker({
    map,
    position: { lat, lng }
  })
}
