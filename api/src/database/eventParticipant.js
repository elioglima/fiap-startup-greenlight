const moment = require("moment");
const utils = require("../utils");
const event = require("./event");
const user = require("./user");

const ObjectId = require("mongodb").ObjectId;

const collectionName = "evento_participante";
const parseValues = (values) => {
  return {
    ...(values.eventoId ? { eventoId: new ObjectId(values.eventoId) } : {}),
    ...(values.usuarioId ? { usuarioId: new ObjectId(values.usuarioId) } : {}),
    ...(values.descricao ? { descricao: values.descricao } : {}),
  };
};

const queryMount = (params) => ({
  ...(params.id ? { _id: new ObjectId(params?.id) } : {}),
  ...(params.eventoId ? { eventoId: new ObjectId(params.eventoId) } : {}),
  ...(params.usuarioId ? { usuarioId: new ObjectId(params.usuarioId) } : {}),
  ...(params.descricao ? { descricao: params.descricao } : {}),
});

const find = async (filter) => {
  try {
    const params = filter || {};

    if (params.eventoId) {
      const eventList = await event.findOne({ id: params.eventoId });
      if (eventList.error) {
        return utils.returnDb.error("Paramêtros inválidos");
      }
    }

    if (params.usuarioId) {
      const eventList = await user.find({ id: usuarioId });
      if (eventList.error) {
        return utils.returnDb.error("Paramêtros inválidos");
      }
    }

    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        const query = {
          ...(params.id ? { _id: new ObjectId(params.id) } : {}),
          ...(params.eventoId
            ? { eventoId: new ObjectId(params.eventoId) }
            : {}),
          ...(params.usuarioId
            ? { usuarioId: new ObjectId(params.usuarioId) }
            : {}),
        };

        return await collection.find(query || {}).toArray();
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

const update = async (filter, values) => {
  try {
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.updateOne(
          {
            ...(filter?.id ? { _id: new ObjectId(filter?.id) } : {}),
          },
          {
            $set: {
              ...(values.descricao ? { descricao: values.descricao } : {}),
              data: moment().toISOString(),
            },
          }
        );
      }
    );
    return utils.returnDb.success(response);
  } catch (error) {
    return utils.returnDb.error(error.message || error.stack);
  }
};

const insert = async (value) => {
  try {
    const dataValue = { ...parseValues(value), data: moment().toISOString() };
    if (!dataValue.eventoId || !dataValue.usuarioId) {
      return utils.returnDb.error("Paramêtros inválidos");
    }

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

module.exports = {
  find,
  findOne,
  insert,
  update,
  remove,
};
