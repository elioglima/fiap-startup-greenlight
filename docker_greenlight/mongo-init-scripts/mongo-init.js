db = db.getSiblingDB("greenlight");
db.createCollection("usuario");
db.createCollection("evento");
db.createCollection("evento_participante");
db.createCollection("categoria");

db.usuario.insert([
  {
    nome: "Elio Goncalves de Lima",
    email: "elio.designer@hotmail.com",
    senha: "Ab@102030",
    data: new Date(),
  },
  {
    nome: "Andrei Vedovado",
    email: "andreivedovato@gmail.com",
    senha: "Ab@102030",
    data: new Date(),
  },
  {
    nome: "Rafaela Rosso",
    email: "rafarosso@gmail.com",
    senha: "Ab@102030",
    data: new Date(),
  },
]);

db.categoria.insert([
  {
    titulo: "Corrida",
    data: new Date(),
  },
  {
    titulo: "Yoga",
    data: new Date(),
  },
  {
    titulo: "Futebol",
    data: new Date(),
  },
  {
    titulo: "Volei",
    data: new Date(),
  },
]);
