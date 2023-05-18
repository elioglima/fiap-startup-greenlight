const utils = require("../utils");
const ObjectId = require("mongodb").ObjectId;
const user = require("./user");
const category = require("./category");

const collectionName = "evento";

const parseValues = (values) => {
  return {
    ...(values.usuarioId ? { usuarioId: new ObjectId(values.usuarioId) } : {}),
    ...(values.categoriaId
      ? { categoriaId: new ObjectId(values.categoriaId) }
      : {}),
    ...(values.titulo ? { titulo: values.titulo } : {}),
    ...(values.local ? { local: values.local } : {}),
    ...(values.data ? { data: new Date(values.data) } : {}),
    ...(values.tempo ? { tempo: values.tempo } : {}),
  };
};

const queryMount = (params) => ({
  ...(params.id ? { _id: new ObjectId(params?.id) } : {}),
  ...(params.categoriaId
    ? { categoriaId: new ObjectId(params.categoriaId) }
    : {}),
  ...(params.usuarioId ? { usuarioId: new ObjectId(params.usuarioId) } : {}),
  ...(params.titulo ? { titulo: params.titulo } : {}),
  ...(params.local ? { local: params.local } : {}),
});

const find = async (filter, limit) => {
  try {
    const params = filter || {};
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await utils.db.find(
          collection,
          queryMount(params),
          { id: 1 },
          limit
        );
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

const insert = async (value) => {
  try {
    const dataValue = parseValues(value);

    if (
      !dataValue.usuarioId ||
      !dataValue.categoriaId ||
      !dataValue.titulo ||
      !dataValue.local ||
      !dataValue.tempo ||
      !dataValue.data
    ) {
      return utils.returnDb.error("Paramêtros inválidos");
    }

    const validUser = await user.findOne({ _id: dataValue.usuarioId });
    if (!validUser || validUser.length == 0)
      return utils.returnDb.error("Paramêtros inválidos");

    const validCategory = await category.findOne({
      _id: dataValue.categoriaId,
    });
    if (!validCategory || validCategory.length == 0)
      return utils.returnDb.error("Paramêtros inválidos");

    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.insertOne(dataValue);
      }
    );

    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

const update = async (filter, value) => {
  try {
    const params = filter || {};
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.updateOne(
          {
            _id: new ObjectId(params?.id),
          },
          { $set: parseValues(value) }
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
      return utils.httpHelper.notFound();
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

module.exports = {
  find,
  findOne,
  insert,
  update,
  remove,
};
