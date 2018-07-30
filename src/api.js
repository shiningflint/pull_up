import { db } from './constants'

export function fetchBars () {
  return db.collection('bars').get()
    .then(querySnapshot => {
      let resultArray = []
      querySnapshot.forEach(doc => {
        const docData = doc.data()
        docData.id = doc.id
        resultArray.push(docData)
      })
      return resultArray
    })
}

export function updateBar (barID, barObject) {
  return db.collection('bars').doc(barID).set(barObject)
}

export function getBarArea (areaID) {
  return db.collection('areas').doc(areaID).get().then(area => area.data().name)
}

export function geocodeAddress (geocoder, address) {
  return new Promise(resolve => {
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        const latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        resolve(latLng)
      }
    })
  })
}

/**
* Call this function after gmaps are loaded
* @param {GoogleMapObject}
* @param {Number}
* @param {Number}
* @return {GoogleMapMarkerObject}
*/
export function createMarker (map, lat, lng) { // eslint-disable-next-line
  return new google.maps.Marker({
    map,
    position: { lat, lng }
  })
}
