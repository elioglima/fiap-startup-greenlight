const utils = require("../utils");
const ObjectId = require("mongodb").ObjectId;

const collectionName = "usuario";
const parseValues = (values) => {
  return {
    ...(values.nome ? { nome: values.nome } : {}),
    ...(values.email ? { nome: values.email } : {}),
    ...(values.senha ? { senha: values.senha } : {}),
    ...(values.data ? { data: values.data } : {}),
    ...(values.token ? { token: values.token } : {}),
    ...(values.fotoBase64 ? { fotoBase64: values.fotoBase64 } : {}),
  };
};

const queryMount = (params) => ({
  ...(params.id ? { _id: new ObjectId(params?.id) } : {}),
  ...(params.nome ? { nome: params?.nome } : {}),
  ...(params.email ? { email: params?.email } : {}),
  ...(params.token ? { token: params?.token } : {}),
});

const find = async (filter, limit) => {
  try {
    const params = filter || {};
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return utils.db.find(collection, queryMount(params), { id: 1 }, limit);
      }
    );

    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

const findOne = async (filter) => {
  try {
    const params = filter || {};
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return utils.db.findOne(collection, queryMount(params), { id: 1 });
      }
    );

    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

const update = async (filter, value) => {
  try {
    const params = filter;
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.updateOne(
          { _id: new ObjectId(params?._id || params?.id) },
          { $set: parseValues(value) }
        );
      }
    );

    return utils.returnDb.success(response);
  } catch (error) {
    console.log(error);
    return utils.returnDb.error(error.message || error.stack);
  }
};

const insert = async (value) => {
  try {
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.insertOne(
          Array.isArray(value)
            ? value.map((m) => parseValues(m))
            : parseValues(value)
        );
      }
    );

    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

const remove = async (id) => {
  try {
    if (!id) {
      return httpHelper.notFound();
    }
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.deleteOne({ _id: new ObjectId(id) });
      }
    );
    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

const login = async (email, senha) => {
  try {
    if (!email || !senha) {
      return utils.returnDb.notAuthorized(response);
    }

    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        const query = { email, senha };
        return await collection.findOne(query);
      }
    );

    if (!response) {
      return utils.returnDb.notAuthorized(response);
    }

    delete response.senha;
    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

module.exports = {
  find,
  findOne,
  insert,
  update,
  remove,
  login,
};
