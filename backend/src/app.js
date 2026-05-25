const express = require("express"); //carga la libreria express
const cors = require("cors"); //carga la libreria cors
const { body, validationResult } = require("express-validator");//express-validator devuelve un objeto que por medio de la desestructuracion obtenemos body y validationResults
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/autores", (req, res) => {
  res.send("API funcionando");
});

app.listen(8080, () => {
  console.log("Servidor iniciado en http://localhost:8080");
});
