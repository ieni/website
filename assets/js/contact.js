---
# contact.js
---

/**
 * Handle a submit request.
 */
$('#submit').on('click', function (event) {

  event.preventDefault()

  var url = 'https://script.google.com/macros/s/{{ site.credentials.gs }}/exec'
  var data = {
    'g-recaptcha-response': grecaptcha.getResponse()
  }

  $('input').each(function (i, obj) {
    var name = $(obj).attr('name')
    var value = $(obj).val()
    data[name] = value
  })

  data.message = $('textarea[name=message]').val()

  $.post(url, data, function (data) {
    console.log(data)
    if (data.result === 'success') {
      showSuccess()
    } else {
      alert(data.error)
      grecaptcha.reset()
    }
  })
})

/**
 * Show the user that the request was successful.
 * @return {void}
 */
function showSuccess() {
  alert('Uw Contactformulier is verzonden.')
}
