const express = require("express");
const opera = require("./pruebas/primer");
let expresion2 = "0 * * * * *";
let url2;

// express--------------
const app = express();
app.set("port", 3003);
app.use(express.json());

app.post("/", (req, res) => {
  console.log("leyo archivo");
  url2 = req.body.url2;
  expresion2 = req.body.expresion;

  res.send("url dijitada: " + req.body.url2 + "\nexpresion: " + expresion2);
});

app.get("/", (req, res) => {
  console.log("leyo url2------", url2);

  console.log("leyo expresion2------", expresion2);

  opera.sumar(12, 9);
  res.send("url dijitada get: " + url2 + "\nexpresion get: " + expresion2);
});

app.listen(app.get("port"), () =>
  console.log("app running on port", app.get("port"))
);
