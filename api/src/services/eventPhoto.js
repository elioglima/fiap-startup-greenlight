const httpHelper = require("../utils/httpHelper");
const db = require("../database");


const findOne = async ({ queryStringParameters }) => {
  try {
    const params = queryStringParameters || {};
    const query = {
      ...(params.eventoId ? { eventoId: params?.eventoId } : {}),
    };

    const eventFind =  await db.event.findOne({ id: params.eventoId})
    if (!eventFind || eventFind.length === 0) {
      return httpHelper.notFound();
    }

    console.log(123, query)
    const response = await db.eventPhoto.findOne(query);
    return httpHelper.ok(response);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

const update = async ({ queryStringParameters, body }) => {
  try {
    const params = queryStringParameters;
    const value = JSON.parse(body);
    
    const eventFind =  await db.event.findOne({ id: params.eventoId})
    if (!eventFind || eventFind.length === 0) {
      return httpHelper.notFound();
    }
    const filter = { eventoId: params?.eventoId };
    const response = await db.eventPhoto.update(filter, value);
    return httpHelper.ok(response);
  } catch (error) {
    console.error(error)
    return httpHelper.badRequest(error);
  }
};

const insert = async ({ body }) => {
  try {
    const value = JSON.parse(body);

    const eventFind =  await db.event.findOne({ id: value.eventoId})
    if (!eventFind || eventFind.length === 0) {
      return httpHelper.badRequest('Evento não localizado.');
    }

    const response = await db.eventPhoto.insert(value);
    return httpHelper.ok(response);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

const remove = async ({ queryStringParameters }) => {
  try {
    const params = queryStringParameters;
    if (!params?.codigo) {
      return httpHelper.notFound();
    }
    const response = await db.eventPhoto.remove(params?.codigo);
    return httpHelper.ok(response);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

module.exports = {
  findOne,
  insert,
  update,
  remove,
};
