const GoogleSpreadsheet = require('google-spreadsheet')
const googleSpreadsheetKey = require('../../keys.js').googleSpreadsheetKey

const doc = new GoogleSpreadsheet(googleSpreadsheetKey)

console.log(doc)

doc.getInfo(function(err, info) {
  console.log('got err', err)
  console.log('got some info', info)
})

console.log('download bananas from drive and insert to potatoes')
