const { ObjectId } = require("mongoose/lib/types");

db = db.getSiblingDB("greenlight");
db.createCollection("usuario");
db.createCollection("evento");
db.createCollection("evento_participante");
db.createCollection("categoria");

db.usuario.insert([
  {
    _id: new ObjectId("6466032822b9a867fd065db4"),
    nome: "Elio Goncalves de Lima",
    email: "elio.designer@hotmail.com",
    senha: "Ab@102030",
    data: "2023-05-18T10:51:20.809Z",
  },
  {
    _id: new ObjectId("6466032822b9a867fd065db5"),
    nome: "Andrei Vedovado",
    email: "andreivedovato@gmail.com",
    senha: "Ab@102030",
    data: "2023-05-18T10:51:20.809Z",
  },
  {
    _id: new ObjectId("6466032822b9a867fd065db6"),
    nome: "Rafaela Rosso",
    email: "rafarosso@gmail.com",
    senha: "Ab@102030",
    data: "2023-05-18T10:51:20.809Z",
  },
]);

db.categoria.insert([
  {
    _id: new ObjectId("6466032922b9a867fd065db7"),
    titulo: "Corrida",
    data: "2023-05-18T10:51:21.957Z",
  },
  {
    _id: new ObjectId("6466032922b9a867fd065db8"),
    titulo: "Yoga",
    data: "2023-05-18T10:51:21.957Z",
  },
  {
    _id: new ObjectId("6466032922b9a867fd065db9"),
    titulo: "Futebol",
    data: "2023-05-18T10:51:21.957Z",
  },
  {
    _id: new ObjectId("6466032922b9a867fd065dba"),
    titulo: "Volei",
    data: "2023-05-18T10:51:21.957Z",
  },
]);

db.evento.insert([
  {
    usuarioId: new ObjectId("6466032822b9a867fd065db4"),
    categoriaId: "6466032922b9a867fd065db7",
    data: "2023-05-17T23:33:20.662Z",
    local: "Rua Abadiania 832b",
    tempo: "19h:15",
    titulo: "Novo Evento 2",
  },
]);
