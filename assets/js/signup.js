---
# signup.js
---

/**
 * Adres autocomplete via
 * https://postcodeapi.nu
 */
window.postcodeapi = {
  token: '{{ site.credentials.postcode }}',
  onError: function (message) {
    $('#postcode, #number').removeClass('is-valid').addClass('is-invalid')
    $('#street, #city').removeClass('is-valid')
    $('#postcodeapi-error').fadeIn()
    $('.address-success').fadeOut()
  },
  onSuccess: function () {
    $('#postcode, #number, #street, #city').removeClass('is-invalid').addClass('is-valid')
    $('.address-success').fadeIn()
  }
}

/**
 * Remove error message if the user is changing his/her input.
 */
$('#postcode, #number').keyup(function (event) {
  if ($('#postcode').val() == '' || $('#postcode').val() == '' && $('#postcodeapi-error').is(':visible')) {
    $(this).removeClass('is-invalid')
    $('#postcodeapi-error').fadeOut()
  }
})

/**
 * IBAN formattering via Mask plugin
 * https://igorescobar.github.io/jQuery-Mask-Plugin/
 */
$('#iban').mask('SS00 SSSS 0000 0000 00')

/**
 * Postcode formattering via Mask plugin
 * https://igorescobar.github.io/jQuery-Mask-Plugin/
 */
$('#postcode').mask('0000SS', { placeholder: 'Postcode' })

/**
 * Handle a submit request.
 */
$('#submit').on('click', function (event) {

  event.preventDefault()

  var url = 'https://script.google.com/macros/s/{{ site.credentials.gs }}/exec'
  var data = { 'g-recaptcha-response': grecaptcha.getResponse() }

  $('input').each(function (i, obj) {
    var name = $(obj).attr('name')
    var value = $(obj).val()
    data[name] = value
  })

  $.post(url, data, function (data) {
    console.log(data)
    if (data.result === 'success') {
      alert('Aanmelding verstuurd.')
    } else {
      alert(data.error)
      grecaptcha.reset()
    }
  })
})
