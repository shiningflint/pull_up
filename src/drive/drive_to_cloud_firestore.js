const GoogleSpreadsheet = require('google-spreadsheet')
const GoogleSpreadsheetKey = require('../../keys.js').googleSpreadsheetKey

// firebase stuff
const firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyAIzFKrSOR5SRneMbSmNz4gSdRiOk8KNYI",
  authDomain: "pull-up-dd6a6.firebaseapp.com",
  databaseURL: "https://pull-up-dd6a6.firebaseio.com",
  projectId: "pull-up-dd6a6",
  storageBucket: "pull-up-dd6a6.appspot.com",
  messagingSenderId: "447491243109"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true}
db.settings(settings)

const doc = new GoogleSpreadsheet(GoogleSpreadsheetKey)

const WorkSheets = {
  chuoku: {
    worksheetTitle: 'Chuo-ku 中央区',
    name: '中央区'
  }
}

const selectedSheet = WorkSheets.chuoku

function getSheetInfo (doc, worksheetTitle) {
  return new Promise(resolve => {
    doc.getInfo((err, info) => {
      info.worksheets.map(worksheet => {
        if (worksheet.title === worksheetTitle) resolve(worksheet)
      })
    })
  })
}

function init () {
  getSheetInfo(doc, selectedSheet.worksheetTitle).then(worksheet => {
    console.log('bananas', worksheet)
  })
  // db.collection('bars').add({
  //   bananas: 'pisang',
  //   potatoes: 'kentang'
  // })
  return
}

init()
