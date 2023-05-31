// Express uit de nodemodules map
import { log } from "console";
import express from "express";
import { ppid } from "process";

// socket io
import * as path from "path";
import { Server } from "socket.io";
import { createServer } from "http";

// Maak een nieuwe express app aan
const app = express();

const http = createServer(app);
const io = new Server(http);

const url = "https://api.vinimini.fdnd.nl/api/v1/producten"; // URL naar Json data
const url2 = "https://api.vinimini.fdnd.nl/api/v1";

//  Stel in hoe we express gebruiken
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik maken van de "public" map
app.use(express.static("public"));

// afhandeling van formulieren
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Maak een route voor de pagina's
app.get("/", (request, response) => {
  response.render("index");
});

app.get("/proces", (request, response) => {
  let id = request.query.productId || "clerg7e1y032z0auq7ex5rid9";
  let detailUrl = url2 + "/product?id=" + id;

  fetchJson(detailUrl).then((data) => {
    response.render("proces", data);
  });
});

app.get("/producten", (request, response) => {
  let productenUrl = url;
  fetchJson(productenUrl).then((data) => {
    response.render("producten", data);
  });
});

app.get("/detail", (request, response) => {
  let id = request.query.detailId || "clerps05z09jm0aw3vccjq5un";
  let detailUrl2 = url2 + "/product?id=" + id;
  console.log(detailUrl2);
  fetchJson(detailUrl2).then((data) => {
    // console.log(data)
    response.render("detail", data);
  });
});

app.get("/agenda", (request, response) => {
  const urlid = "notities?id=clemozv3c3eod0bunahh71sx7";
  const notitieUrl = url2 + urlid;

  fetchJson(notitieUrl).then((data) => {
    response.render("agenda", data);
  });
});

// App.post agenda | (notitie) to API
app.post("/agenda", function (req, res, next) {
  req.body.afgerond = false;
  // req.body.persoonId = "clemozv3c3eod0bunahh71sx7";
  req.body.datum = req.body.datum + ":00Z";
  req.body.herinnering = [req.body.herinnering + ":00Z"];
  // console.log(req.body);

  postJson(url2 + "/notities", req.body).then((data) => {
    // console.log(JSON.stringify(data))

    let newNotitie = { ...req.body };

    if (data.success) {
      res.redirect("/agenda");
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina
    } else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`;
      const newdata = { error: errormessage, values: newNotitie };

      res.render("agenda", newdata);
    }
  });
});

// ================================================

app.get("/chatroom", (request, response) => {
  response.render("chatroom");
});

const historySize = 50;

let history = [];
// let membersLoaded = false;
// let htmlMemberList = null;

// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))

// Start de socket.io server op
ioServer.on('connection', (client) => {
  // Log de connectie naar console
  console.log(`user ${client.id} connected`)

  // Stuur de history
  client.emit('history', history)

  // Luister naar een message van een gebruiker
  client.on('message', (message) => {
    // Check de maximum lengte van de historie
    while (history.length > historySize) {
      history.shift()
    }
    // Voeg het toe aan de historie
    history.push(`user ${client.id}: ` + message)

    // Verstuur het bericht naar alle clients
    ioServer.emit("message", `user ${client.id}: ` + message);
  })

  // Luister naar een disconnect van een gebruiker
  client.on('disconnect', () => {
    // Log de disconnect
    console.log(`user ${client.id} disconnected`)
  })
})

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})

// =================================================

http.listen(8001, () => {
  console.log("listening on http://localhost:8001");
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}
/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
