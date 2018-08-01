const GoogleSpreadsheet = require('google-spreadsheet')
const GoogleSpreadsheetKey = require('../../keys.js').googleSpreadsheetKey

const doc = new GoogleSpreadsheet(GoogleSpreadsheetKey)

const WorkSheets = {
  chuoku: {
    worksheetTitle: 'Chuo-ku 中央区',
    name: '中央区'
  }
}

const selectedSheet = WorkSheets.chuoku

function gotSheets (err, info) {
  // console.log('got err', err)
  // console.log('got some info', info)
  info.worksheets.map(worksheet => {
    if (worksheet.title === selectedSheet.worksheetTitle) {
      console.log('save to firebase', worksheet)
    }
  })
}

function getSheetInfo (doc) {
  doc.getInfo(gotSheets)
}

function init () {
  getSheetInfo(doc)
}

init()
