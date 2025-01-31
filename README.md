
# Vinimini | Chatroom

![image](https://github.com/iBadr49/connecting-people-realtime-web-app/assets/112857932/0a36c173-4330-41cb-bf93-35d8e65444f8)


## 📚 Inhoudsopgave

* [Beschrijving](#beschrijving)
* [Kenmerken](#kenmerken)
* [Bronnen](#bronnen)
* [Gebruik](#gebruik)
* [Licentie](#licentie)

## Beschrijving
<strong>Vinimini:</strong>

<li>Een chatroom gemaakt waar de verzorgers of ouders tussen elkaar kunnen chatten, waar ik deze [userstory#6](https://github.com/orgs/fdnd-agency/projects/6?pane=issue&itemId=10774985) heb geimplementeerd.</li>
</ul>

## Gebruik

Ik heb deze website op mobile-versie gebouwd voor opdrachtgever vinimini, dus na het inloggen op je vinimini accouct kan je je gegevens zien, proces, agenda, vinimini producten, en de chatroom waar ouders tussen elkaar kunnen communiceren. 

- Je kan ook mijn [Figma](https://www.figma.com/file/2TLM9ivN6gl8fGoKuWwDtI/Mijn-Website-%7C-Realtime-web-app?type=design&node-id=0%3A1&mode=design&t=3VN5odMlgWETj3kU-1) bestand gebruiken en mijn website bekijken, als je via de link de website niet kan openen.

## Kenmerken
Wat is Node:
Node.js is een software platform waarmee ontwikkelaars JavaScript kunnen gebruiken om applicaties te bouwen die op de computer kunnen draaien, net zoals in een webbrowser. Het biedt veel handige functies en is populair vanwege de snelle en efficiënte manier waarop het met data kan omgaan.

Wat is Express:
Express is een framework voor Node.js waarmee ontwikkelaars gemakkelijk web-applicaties en API's kunnen bouwen. Het biedt veel handige tools en functies om het proces te versnellen en te vereenvoudigen, en kan worden aangepast aan de behoeften van elk project. Express is erg populair en wordt veel gebruikt in de ontwikkeling van webtoepassingen en server-side applicaties.

Wat is EJS:
EJS is een sjabloontaal waarmee ontwikkelaars dynamische HTML-pagina's kunnen maken in Node.js-applicaties. Het wordt gebruikt om variabelen, conditionele logica en herbruikbare componenten in HTML-pagina's in te voegen, waardoor het bouwen van webpagina's eenvoudiger en efficiënter wordt.

- Ik heb een realtime web-app gebouwd voor mijn opdrachtgever, om dit te kunnen bereiken heb ik sockets.io, Ejs, Nodejs gebruik van gemaakt, hieronder een stukje server-side code:

```js
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

http.listen(8001, () => {
  console.log("listening on http://localhost:8001");
});
```
 
### Tools:
-  VsCode
-  Pen&Papier
-  Laptop

### Gebruikte Technieken:
- Html
- Css
- Node.js
- Js
- Socket.io

### Communicatie Middelen:
- Teams
- WhatsApp


## Bronnen

- [Express](https://expressjs.com/en/4x/api.html)
- [socket.io](https://socket.io/)
- [live coded example](https://github.com/ju5tu5/barebonechat)
- [chat demo from socket.io](https://socket.io/get-started/chat/)

## Licentie

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).
