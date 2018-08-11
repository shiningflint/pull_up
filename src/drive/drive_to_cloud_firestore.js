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

const workSheetTitle = process.argv[2]
const areaID = process.argv[3]

function getSheetInfo (doc, worksheetTitle) {
  return new Promise(resolve => {
    doc.getInfo((err, info) => {
      info.worksheets.map(worksheet => {
        if (worksheet.title === worksheetTitle) resolve(worksheet)
      })
    })
  })
}

function getSheetRows (worksheet) {
  return new Promise(resolve => {
    worksheet.getRows((err, rows) => {
      resolve(rows)
    })
  })
}

function barFormatRows (rows) {
  return rows.map(row => {
    return {
      address: row.address === '' ? null : row.address,
      lat: row.lat === '' ? null : parseFloat(row.lat),
      lng: row.lng === '' ? null : parseFloat(row.lng),
      image: row.image === '' ? null : row.image
    }
  })
}

function init () {
  getSheetInfo(doc, workSheetTitle)
    .then(worksheet => getSheetRows(worksheet))
    .then(rows => {
      const bars = barFormatRows(rows)
      const areaBars = bars.map(bar => {
        bar['area_id'] = areaID
        return bar
      })

      areaBars.map(areaBar => db.collection('bars').add(areaBar))
    })
}

init()
