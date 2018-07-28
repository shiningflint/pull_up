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
