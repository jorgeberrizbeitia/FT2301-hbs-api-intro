require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

// requerir data
const allLessons = require("./data/lessons.js")
const DogApi = require('doggo-api-wrapper');
const { response } = require("express");
const myDog = new DogApi();

// configuracion del server
app.set("view engine", "hbs");
app.set("views", __dirname + "/views/") // esto dice que todas las vistas estan en la carpeta views
// vamos a habilitar partials en este hbs
const hbs = require("hbs")
hbs.registerPartials(__dirname + "/views/partials")




app.get("/", (req, res) => {
  // res.send(`Hello World! Tu clave secreta es ${process.env.SECRET_MESSAGE}`)

  // ... aqui eventualmente accederemos a las BD

  // enviarle la plantilla de home.hbs

  res.render("home.hbs", {
    name: "bob",
  });
});

app.get("/about", (req, res) => {

  res.render("about.hbs", {
    schoolName: "Ironhack",
    staff: ["Caro", "Adriá", "Ruth", "Jorge", "Leidy"]
  });
});

// hacemos una ruta que muestre al usuario todas las lecciones y su info
app.get("/lessons", (req, res) => {

  // buscar la data
  console.log(allLessons)

  // renderizar una vista con la data
  res.render("all-lessons.hbs", {
    allLessons: allLessons
  })

})


// ruta que muestre al usuario un listado con solo las rutas aprobadas
app.get("/approved-lessons", (req, res) => {

  // filtramos solo las lecciones aprobadas
  const filteredLessons = allLessons.filter((eachLesson) => {
    return eachLesson.approved === true
  })

  console.log(filteredLessons)

  // luego las enviamos a el hbs
  res.render("approved-lessons.hbs", {
    filteredLessons: filteredLessons
  })

})

// app.get("/lessons/:bootcamp", (req, res) => {
//   console.log(req.params)
//   if (req.params.bootcamp !== "web") {
//     // más adelante aprenderemos formas de enviar a paginas de error
//   }
// })


app.get("/dog/random", (req, res) => {

  // let algunaVariable;

  myDog.getARandomDog()
  .then((response) => {
    console.log(response)
    // algunaVariable = response
    res.render("random-dog.hbs", {
      dogImg: response.message
    })


  })
  .catch((error) => {
    console.log(error)
  })
})


// vamos a crear una ruta que liste todas las razas de los perritos
app.get("/dog/all-breeds", (req, res) => {

  myDog.getListOfAllBreeds()
  .then(data => {
    // console.log(data)
    const allBreeds = Object.keys(data.message)
    console.log(allBreeds)

    res.render("dog-breeds.hbs", {
      allBreeds: allBreeds
    })

  })
  .catch(err => console.error(err))

})

app.get("/dog/by-breed/:breed", async (req, res) => {

  console.log(req.params.breed)

  const response = await myDog.getAllDogsByBreed(req.params.breed)
  console.log(response)


  res.render("dogs-by-breed.hbs", {
    dogsByBreed: response.message
  })

})




// 1. creo la ruta
// 2. creo el hbs con texto de prueba
// 3. renderizo el hbs en la ruta y lo pruebo
// 4. busco la data y la paso al render
// 5. uso la data en el hbs para mostrarla


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
