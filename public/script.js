// Menu & Close button
const menu = document.getElementById("menu");
const toggle = document.getElementById("toggle");
const overlay = document.getElementById("overlay");
const close = document.getElementById("close");

// Toggle the menu when the toggle button is clicked
toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
});

// Hide the menu and overlay when the close button is clicked
close.addEventListener("click", () => {
  menu.classList.remove("show");
  overlay.classList.remove("show");
});

// Add a class to the nav element when JavaScript is enabled "NoScript"
document.addEventListener("DOMContentLoaded", function (event) {
  const nav = document.querySelector("nav");
  nav.classList.add("js-nav");
});




let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("input");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});
socket.on("message", (message) => {
  addMessage(message);
});
socket.on("whatever", (message) => {
  addMessage(message);
});
socket.on("history", (history) => {
  history.forEach((message) => {
    addMessage(message);
  });
});

function addMessage(message) {
  messages.appendChild(
    Object.assign(document.createElement("li"), { textContent: message })
  );
  messages.scrollTop = messages.scrollHeight;
}


