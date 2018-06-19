/******************************************************************************
* A simple contact & sign-up form handler written for Google App Script (GAS)*
*                                                                            *
* This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
* But has been simplified and cleaned up to make it more beginner friendly   *
* All credit still goes to Martin and any issues/complaints/questions to me. *
*                                                                            *
* Work is based on dwyl's repository: https://git.io/vANsB                   *
* Adjusted for i&i's needs by Laar IT: https://laarit.nl                     *
******************************************************************************/

var RECAPTCHA_SECRET = ''
var TO_ADDRESS = 'bestuur@ieni.org'

var TYPES = ['contact', 'aanmeldingen']
var SUBJECTS = {
  'contact': 'Contactformulier ieni.org',
  'aanmeldingen': 'Nieuwe Aanmelding ieni.org'
}

/**
 * Format input to a nice HTML e-mail.
 * @param  {Object} p
 * @return {String}
 */
function formatMailBody (p) {

  if (p.type === 'contact') {

    return result = '\
    <strong>Naam</strong> ' + p['name'] + '<br>\
    <strong>E-mail</strong> ' + p['email'] + '<br>\
    <strong>Bericht</strong> ' + p['message'] + '<br>\
    '

  } else if (p.type === 'aanmeldingen') {

    return result = '\
    <strong>Naam</strong> ' + p['name'] + '<br>\
    <strong>E-mail</strong> ' + p['email'] + '<br>\
    <strong>Werkgever</strong> ' + p['work'] + '<br>\
    <strong>Adres</strong><br>' + p['street'] + ' ' + p['number'] + '<br>' + p['postcode'] + ' ' + p['city'] + '<br>\
    <strong>IBAN</strong> ' + p['iban'] + '<br>\
    '

  }

}

/**
 * Sanitize input content.
 * https://goo.gl/4yeEYd
 * @param  {String} rawInput
 * @return {String}
 */
function sanitizeInput (rawInput) {
  const placeholder = HtmlService.createHtmlOutput(' ')
  placeholder.appendUntrusted(rawInput)
  return placeholder.getContent().trim()
}

/**
 * Insert the given data in to the spreadsheet.
 * @param  {Object<RequestResource>} e
 * @return {void}
 */
function recordRequest (e) {

  console.log('e.parameters.type', "'"+e.parameters.type+"'")

  console.log('e.parameter:', e.parameter)

  const doc = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = doc.getSheetByName(e.parameters.type)
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  const nextRow = sheet.getLastRow() + 1 // get next row
  var row = [ new Date() ] // first element in the row should always be a timestamp

  // loop through the header columns
  for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
    if (headers[i].length > 0) {
      console.log('headers[i]', headers[i])
      row.push(e.parameter[headers[i]]) // add data to row
    }
  }

  console.log('headers:', headers)
  console.log('row:', row)

  // more efficient to set values as [][] array than individually
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row])

  return

}

/**
 * Send an email to the recepient with a formatted body.
 * @param  {Object<RequestResource>} e
 * @return {void}
 */
function sendEmail (e) {

  MailApp.sendEmail({
    to: String(TO_ADDRESS),
    subject: SUBJECTS[e.parameters.type],
    replyTo: String(e.parameters.email),
    htmlBody: formatMailBody(e.parameters)
  })

  return
}

/**
 * Verify the response of the user's attempt to complete the
 * recaptcha check.
 * @param  {string} recaptchaResponse
 * @return {boolean}
 */
function verifyCaptcha(recaptchaResponse) {
  var payload = {
    'secret' : RECAPTCHA_SECRET,
    'response': recaptchaResponse
  }
  var url = 'https://www.google.com/recaptcha/api/siteverify'
  var resp = UrlFetchApp.fetch(url, {
    payload : payload,
    method : 'POST'
  }).getContentText()
  return JSON.parse(resp).success
}

/**
 * doPost is the incoming event handler for a POST request in our
 * Google Apps Script.
 * @param  {Object<RequestResource>} e
 * @return {Function<ContentService>}
 */
function doPost (e) {
  try {

    console.log('doPost was called with parameter e:', e)

    // Sanitize all given parameters.
    for (var i in e.parameters) {
      e.parameters[i] = sanitizeInput(e.parameters[i])
    }

    // Verify the recaptcha.
    if (!verifyCaptcha(e.parameters['g-recaptcha-response'])) {
      return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'code': 401,
        'error': 'invalid recaptcha response'
      }))
      .setMimeType(ContentService.MimeType.JSON)
    }

    // Make sure the given type is allowed.
    console.log('Type test:', TYPES, e.parameters.type, typeof e.parameters.type, TYPES.indexOf(e.parameters.type))

    if (TYPES.indexOf(e.parameters.type) < 0) {
      console.log('Request does not contain vaild type:', e.parameters.type)
      return ContentService
      .createTextOutput(JSON.stringify({'result': 'error', 'code': 400, 'error': 'invalid type'}))
      .setMimeType(ContentService.MimeType.JSON)
    }

    // Make sure we have enough fields that are not empty (after sanitizing)
    // for the given type.
    // TODO

    // Add the record to the correct sheet.
    recordRequest(e)

    // Send an email to the recipient.
    sendEmail(e)

    // Return 200 to the client.
    return ContentService
    .createTextOutput(
      JSON.stringify({'result': 'success', 'code': 200
    }))
    .setMimeType(ContentService.MimeType.JSON)

    } catch (error) {
      console.log("error encountered in request", error)
      return ContentService
      .createTextOutput(JSON.stringify({'result': 'error', 'code': 500, 'error': error}))
      .setMimeType(ContentService.MimeType.JSON)
    }
  }
