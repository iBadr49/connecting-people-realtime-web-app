let socket = io()

// Voeg alleen event listeners toe als JavaScript beschikbaar is
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("toggle");
  const close = document.getElementById("close");

  if (menu && toggle && close) {
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      menu.classList.add("show");
    });

    close.addEventListener("click", function (event) {
      event.preventDefault();
      menu.classList.remove("show");
    });
  }
});

let messages = document.querySelector('section ul')
let input = document.querySelector('input')

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', input.value)
    input.value = ''
  }
})

socket.on('message', (message) => {
  addMessage(message)
})

socket.on('whatever', (message) => {
  addMessage(message)
})

socket.on('history', (history) => {
  history.forEach((message) => {
    addMessage(message)
  })
})

// function addMessage(message) {
//   messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
//   messages.scrollTop = messages.scrollHeight
// }


function addMessage(message) {
  const currentTime = new Date().toLocaleTimeString('nl-NL', { hour: 'numeric', minute: 'numeric' });
 
  const messageElement = document.createElement('li');
  const timeElement = document.createElement('span');

  messageElement.classList.add('own-message')
  timeElement.classList.add('own-time')

  messages.appendChild(Object.assign(messageElement, { textContent: message }))
  messages.appendChild(Object.assign(timeElement, { textContent: currentTime }));
  messages.scrollTop = messages.scrollHeight

 
}


// NO-JS BLABLA

// Add a class to the nav element when JavaScript is enabled "NoScript"
// document.addEventListener("DOMContentLoaded", function (event) {
//   const nav = document.querySelector("nav");
//   nav.classList.add("js-nav");
// });


