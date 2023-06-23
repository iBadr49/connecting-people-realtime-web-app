let socket = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

// State messages
const loadingState = document.querySelector('span.loading')
const emptyState = document.querySelector('span.empty')
const errorState = document.querySelector('span.offline')

// Voeg alleen event listeners toe als JavaScript beschikbaar is
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("toggle");
  const close = document.getElementById("close");

// --------------------------- Menuhamburger  
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

// ---------------------------- socket.io 
// Luister naar het submit event
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

// Agenda
window.addEventListener('DOMContentLoaded', function () {
  const toggleCalendar = document.getElementById('toggleCalendar');
  const calendar = document.getElementById('calendar');

  toggleCalendar.addEventListener('click', function () {
    calendar.classList.toggle('active');
    toggleCalendar.classList.toggle('active');
  });
});


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


