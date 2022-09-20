const express = require("express");
const PORT = 4000;

const app = express();

//isso aqui torna possivel a leitura em de arquivos json
app.use(express.json());

//rotas
const array = [
  "fabio",
  "andrea",
  "rodrigo",
  "bruno",
  "anna",
  "doug",
  "vitor",
  "pedro",
  "tami",
  "leo",
  "jonathan",
];

//app + verbo http (get post put patch delete)
app.get("/names", (req, res, next) => {
  //req = requisiscao = pedido - o que foi solicitado
  //res = response - o que o servidor VAI devolver para o client
  //next = é usado para middlewares

  console.log("estou dentro da rota /students");
  return res.status(200).json(array);
});

app.get("/randomNumber", (req, res, next) => {
  const result = Math.round(Math.random() * 100);

  return res.status(200).json(result);
});

//criar uma rota que vai receber um parametro e vamos receber um parametro
//e vamos usar esse parametro para achar um numero aleatorio

app.get("/randomNumber/:max", (req, res, next) => {
  console.log(req.params);
  //mesma coisa
  console.log(req.params.max);
  const { max } = req.params;

  const result = Math.round(Math.random() * max);
  return res.status(200).json(result);
});

app.post("/names/:name", (req, res, next) => {
  const { name } = req.params;
  array.push(name);
  return res.status(200).json(array);
});

let students = [
  { name: "fabio", age: 45 },
  { name: "jino", age: 29 },
  { name: "karen", age: 29 },
  { name: "andrea", age: 29 },
];

app.get("/students", (req, res, next) => {
  return res.status(200).json(students);
});

app.post("/students/add", (req, res) => {
  students.push(req.body);

  return res.status(200).json(students);
});

app.put("/students/edit/:name", (req, res) => {
  const { name } = req.params;

  students.forEach((student, index) => {
    if (student.name === name) {
      students[index] = { ...student, ...req.body };
    }
  });

  return res.status(200).json(students);
});

app.delete("/students/delete/:name", (req, res) => {
  const { name } = req.params;
  console.log(name)

  let newArray = students.filter((student) => {
    return student.name !== name;
  });

  students = newArray;
  return res.status(200).json(students);
});

app.listen(PORT, () => {
  console.log(`server up and running at port ${PORT}`);
});
