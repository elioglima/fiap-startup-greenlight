const connect = require("../database/connect");

const callBack = async (collectionName, callback) => {
  try {
    const connected = await connect.connectDb();
    const db = await connected.db();
    const collection = await db.collection(collectionName);
    const response = await callback(collection);
    await connected.close();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const find = async (collection, query, sort = {}, limit = 100) => {
  try {
    const response = await collection
      .find(query || {})
      .sort(sort)
      .limit(limit)
      .toArray();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const count = async (collection, query, sort = {}, limit = 100) => {
  try {
    const response = await collection.find(query || {}).count();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findOne = async (collection, query, sort = {}) => {
  try {
    const response = await find(collection, query, sort, 1);
    if (!response || response.length == 0) {
      return undefined;
    }

    return response[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  callBack,
  find,
  count,
  findOne,
};
