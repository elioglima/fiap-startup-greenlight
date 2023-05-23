const moment = require("moment");
const utils = require("../utils");
const event = require("./event");
const user = require("./user");

const ObjectId = require("mongodb").ObjectId;

const collectionName = "evento_foto";
const parseValues = (values) => {
  return {
    ...(values.eventoId ? { eventoId: new ObjectId(values.eventoId) } : {}),
    ...(values.base64 ? { base64: values.base64 } : {}),
  };
};

const queryMount = (params) => ({
  ...(params.id ? { _id: new ObjectId(params?.id) } : {}),
  ...(params.eventoId ? { eventoId: new ObjectId(params.eventoId) } : {}),
});

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
    const response = await utils.db.callBack(
      collectionName,
      async (collection) => {
        return await collection.updateOne(
          {
            ...(filter?.eventoId ? { eventoId: new ObjectId(filter?.eventoId) } : {}),
          },
          {
            $set: {
              ...(value.base64 ? { base64: value.base64 } : {}),
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
    if (!dataValue.eventoId) {
      return utils.returnDb.error("Parameters invalid");
    }

    const eventresponse = await findOne({ eventoId: dataValue.eventoId });
    if (eventresponse && eventresponse?.data?.length > 0) {
      return update({ eventoId: dataValue.eventoId }, { base64: value.base64 });
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
      return utils.returnDb.error("Registers not found");
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
  findOne,
  insert,
  update,
  remove,
};
