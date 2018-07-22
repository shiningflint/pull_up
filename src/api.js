import { db } from './constants'

export function fetchBars () {
  return db.collection('bars').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`id ${doc.id} => ${doc.data()}`)
      })
    })
}
