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

  const header = $("head");

  // console.log("Title: ", websiteTitle.html());

  // const webSiteHeading = $("h1");
  // console.log("Heading: ", webSiteHeading.html());
  //  const webSiteHeading = $("h1");
  //  console.log("Heading: ", webSiteHeading.text());
  const webSiteHeading = $("body");
  let xx = webSiteHeading.text().trim();
  // console.log("Heading: ", webSiteHeading.text().trim()); //el trim elimina espacios en blanco
  let milCaracteres = xx
    .split(" ")
    .join("")
    .replace(/(\r\n|\n|\r)/gm, "")
    .slice(0, 20);

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
