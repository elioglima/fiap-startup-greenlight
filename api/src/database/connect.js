const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    const config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 2000,
      serverSelectionTimeoutMS: 2000,
    };

    const client = new MongoClient(MONGODB_URI, config);
    const eventName = "<event name>";
    client.on(eventName, (event) => {
      // console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`);
    });

    if (!client) {
      throw new Error("Banco de dados offline");
    }

    await client.connect();
    return client;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { connectDb, MONGODB_URI };
