const httpHelper = require("../utils/httpHelper");
const db = require("../database");

const find = async ({ queryStringParameters }) => {
  try {
    const params = queryStringParameters || {};
    const query = {
      ...(params.id ? { id: params?.id } : {}),
      ...(params.usuarioId ? { usuarioId: params?.usuarioId } : {}),
    };
    const response = await db.category.find(query);
    const list = response.data || [];
    return httpHelper.ok(list);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

const update = async ({ queryStringParameters, body }) => {
  try {
    const params = queryStringParameters;
    const value = JSON.parse(body);
    const filter = { id: params?.id };
    const response = await db.categories.update(filter, value);
    return httpHelper.ok(response);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

const insert = async ({ body }) => {
  try {
    const value = JSON.parse(body);
    const response = await db.categories.insert(value);
    return httpHelper.ok(response);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

const remove = async ({ queryStringParameters }) => {
  try {
    const params = queryStringParameters;
    if (!params?.id) {
      return httpHelper.notFound();
    }
    const response = await db.categories.remove(params?.id);
    return httpHelper.ok(response);
  } catch (error) {
    return httpHelper.badRequest(error);
  }
};

module.exports = {
  find,
  insert,
  update,
  remove,
};
