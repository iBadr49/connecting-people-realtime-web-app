
# Vinimini | Chatroom

![Schermafbeelding 2023-06-02 104326](https://github.com/iBadr49/connecting-people-realtime-web-app/assets/112856683/b41b55ed-02c8-45d6-ac24-31479b003d0f)



## 📚 Inhoudsopgave

* [Beschrijving](#beschrijving)
* [Kenmerken](#kenmerken)
* [Bronnen](#bronnen)
* [Licentie](#licentie)

## 🗒️ Beschrijving
<strong>Vinimini 🖌️:</strong>

<li>Een chatroom gemaakt waar de verzorgers of ouders tussen elkaar kunnen chatten!</li>
</ul>

## 👩🏼‍💻👩🏾‍💻👨🏻‍💻👨🏼‍💻 Kenmerken

Lijst met gebruikte tools, technieken en communicatie middelen.
Dit project is gemaakt met Node, Express, EJS.

Wat is Node:
Node.js is een software platform waarmee ontwikkelaars JavaScript kunnen gebruiken om applicaties te bouwen die op de computer kunnen draaien, net zoals in een webbrowser. Het biedt veel handige functies en is populair vanwege de snelle en efficiënte manier waarop het met data kan omgaan.

Wat is Express:
Express is een framework voor Node.js waarmee ontwikkelaars gemakkelijk web-applicaties en API's kunnen bouwen. Het biedt veel handige tools en functies om het proces te versnellen en te vereenvoudigen, en kan worden aangepast aan de behoeften van elk project. Express is erg populair en wordt veel gebruikt in de ontwikkeling van webtoepassingen en server-side applicaties.

Wat is EJS:
EJS is een sjabloontaal waarmee ontwikkelaars dynamische HTML-pagina's kunnen maken in Node.js-applicaties. Het wordt gebruikt om variabelen, conditionele logica en herbruikbare componenten in HTML-pagina's in te voegen, waardoor het bouwen van webpagina's eenvoudiger en efficiënter wordt.

Zie stukje socket.io code hieronder:

```js
// ================================================

app.get("/chatroom", (request, response) => {
  response.render("chatroom");
});

const historySize = 50;

let history = [];
let membersLoaded = false;
let htmlMemberList = null;

// Serveer client-side bestanden
io.on("connection", (socket) => {
  // Log de connectie naar console
  console.log("a user connected");
  // Stuur de historie door, let op: luister op socket, emit op io!
  io.emit("history", history);

  // Luister naar een message van een gebruiker
  socket.on("message", (message) => {
    // Check de maximum lengte van de historie
    while (history.length > historySize) {
      history.shift();
    }
    // Voeg het toe aan de historie
    history.push(message);
    // Verstuur het bericht naar alle clients
    io.emit("message", message);
  });

  // Luister naar een disconnect van een gebruiker
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

function renderMembers(memberList) {
  return memberList
    .filter((member) => member.role.includes("student"))
    .map((member) => renderMember(member))
    .reduce((output, member) => output + member);
}

function renderMember(member) {
  return `
    <article>
      <h2>${member.name}</h2>
      <p>${member.bio ? member.bio.html : ""}</p>
    </article>
  `;
}

function longPollExample(io) {
  io.emit("whatever", "somebody set up us the bomb!");
}

// =================================================

http.listen(8001, () => {
  console.log("listening on http://localhost:8001");
});
```

 
### Tools 🧰:
-  VsCode
-  Pen&Papier
-  Laptop

### Gebruikte Technieken 🛠️:
- Html
- Css
- Node.js
- Js
- Socket.io

### Communicatie Middelen 🗣️:
- Teams
- WhatsApp


## 🌐 Bronnen

<ul>
<li>https://github.com//</li>
<li>https://www.google.nl/</li>
</ul>



## 🔒 Licentie

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).
