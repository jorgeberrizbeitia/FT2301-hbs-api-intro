require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

// configuracion del server
app.set("view engine", "hbs");
app.set("views", __dirname + "/views/") // esto dice que todas las vistas estan en la carpeta views

app.get("/", (req, res) => {
  // res.send(`Hello World! Tu clave secreta es ${process.env.SECRET_MESSAGE}`)

  // enviarle la plantilla de home.hbs

  res.render("home.hbs", {
    name: "bob",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
