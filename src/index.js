const express = require("express"); //Traz a biblioteca instalada
const routes = require("./routes");
const logger = require("./middlewares/logger");

const app = express();
const PORTA = 3000;

app.use(express.json()); //Permite que o express entenda requisições no formato JSON
app.use(logger);
app.use(routes);

app.get("/", (req, res) => {
  //res é requisição e res é resposta
  res.send("API da Livraria no ar!");
});

app.listen(PORTA, () => {
  console.log("Servidor rodando em http://localhost:" + PORTA);
});
