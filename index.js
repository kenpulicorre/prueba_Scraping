const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { reject } = require("bluebird");
let texto_txt = "holaaaaa";
let escrito = new Promise((res, rej) => {
  fs.writeFile("dato.txt", `${texto_txt}`, (e) => {
    if (e) {
      rej(e);
    } else {
      res();
    }
  });
});
escrito
  .then(() => console.log("la escritura ha sido okey"))
  .catch((e) => console.log(e));
async function init() {
  const $ = await request({
    uri: "http://quotes.toscrape.com/",
    transform: (body) => cheerio.load(body),
  });
  //lectura header:---------------------
  const header = $("head").html();
  // console.log(header);
  //lectura mil caracteres:--------------
  const webSiteHeading = $("body");
  let xx = webSiteHeading.text().trim();
  let milCaracteres = xx
    .split(" ")
    .join("")
    .replace(/(\r\n|\n|\r)/gm, "")
    .slice(0, 20);

  //crendo archivo plano
  let escrito = new Promise((res, rej) => {
    fs.writeFile("dato.txt", `${milCaracteres}`, (e) => {
      if (e) {
        rej(e);
      } else {
        res();
      }
    });
  });
}

init();
