import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAIzFKrSOR5SRneMbSmNz4gSdRiOk8KNYI",
  authDomain: "pull-up-dd6a6.firebaseapp.com",
  databaseURL: "https://pull-up-dd6a6.firebaseio.com",
  projectId: "pull-up-dd6a6",
  storageBucket: "pull-up-dd6a6.appspot.com",
  messagingSenderId: "447491243109"
}
firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true}
firestore.settings(settings)

export const db = firestore
