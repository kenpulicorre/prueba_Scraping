const request = require("request-promise");
const cheerio = require("cheerio");
const cron = require("node-cron");
const fs = require("fs");
const express = require("express");
// "0 * * * * *";
let x = cron.schedule("* * * * * *", async () => {
  let minuto = time();
  let funcion = await init();

  console.log("hola mundo", minuto, funcion, url2);
});
let url2;
let expresion2;

//---------- servidor express--------------
const app = express();
app.set("port", 3003);
app.use(express.json());

app.post("/", (req, res) => {
  x.stop();
  console.log("leyo archivo");
  url2 = req.body.url2;
  console.log("leyo url2------", url2);
  expresion2 = req.body.expresion;
  res.send("url dijitada: " + req.body.url2 + "\nexpresion: " + expresion2);
});

//----------
app.get("/", (req, res) => {
  if (expresion2 === "" || expresion2 == null) {
    expresion2 = "* * * * * *";
  }
  console.log("leyo url2------", url2);

  console.log("leyo expresion2------", expresion2);

  // opera.sumar(12, 9);
  res.send("url dijitada get: " + url2 + "\nexpresion get: " + expresion2);
  x = cron.schedule(expresion2, async () => {
    let minuto = time();
    let funcion = await init();

    console.log("hola mundo", minuto, funcion, url2);
  });
});

//-----------

// let url = "http://quotes.toscrape.com/";
//-------------scraping inicial
async function init() {
  console.log("--------------uuurl2 dentro del init-----", url2);

  const $ = await request({
    uri: url2,
    transform: (body) => cheerio.load(body),
  });
  //lectura header:-----------------------------------
  const header = $("head").html();
  // console.log(header);
  //lectura mil caracteres:----------------------------
  const webSiteHeading = $("body");
  let xx = webSiteHeading.text().trim();
  let milCaracteres = xx
    .split(" ")
    .join("")
    .replace(/(\r\n|\n|\r)/gm, "")
    .slice(0, 20);
  //fin de lectura mil caracteres:---------------------

  let objeto = { head: header, milCaracteres: milCaracteres };
  return objeto;

  //creando archivo plano
  // let escrito = new Promise((res, rej) => {
  //   fs.writeFile("dato.txt", `${milCaracteres}`, (e) => {
  //     if (e) {
  //       rej(e);
  //     } else {
  //       res();
  //     }
  //   });
  // });
}

async function time(params) {
  // let date = new Date().toDateString().split(" ").join("_");
  let date = new Date();
  let min = date.getMinutes();

  ////---crear archivo-----------
  // let escrito = new Promise((res, rej) => {
  //   fs.writeFile(`${min}dato.txt`, `${min}texto`, (e) => {
  //     if (e) {
  //       rej(e);
  //     } else {
  //       res();
  //     }
  //   });
  // });
  return min;
}

//----------jobs nodejs
// let expresion = "0 * * * * *";
let expresion = "0 * * * * *";
// const x = cron.schedule(expresion2, async () => {
//   let minuto = time();
//   let funcion = await init();

//   console.log("hola mundo", minuto, funcion, url2);
// });

app.listen(app.get("port"), () =>
  console.log("app running on port", app.get("port"))
);
