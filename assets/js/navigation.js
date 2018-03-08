(function (){
  var burger = document.querySelector('.burger-container'),
      header = document.querySelector('.navigation-header')

  burger.onclick = function(event) {
    event.preventDefault()
    header.classList.toggle('menu-opened')
  }
}())
