const utils = require("../utils");
const db = require("../database");

const find = async ({ queryStringParameters }) => {
  try {
    const params = queryStringParameters || {};
    const query = {
      ...(params.id ? { id: params?.id } : {}),
    };
    const response = await db.user.find(query);
    if (response.length == 0) {
      return utils.httpHelper.ok(response.data);
    }

    const removePassword = await Promise.all(
      response.data.map(async (user) => {
        delete user.senha;
        return user;
      })
    );

    const searchDependences = await Promise.all(
      removePassword.map(async (user) => {
        const eventData = await db.event.find({ usuarioId: user._id });

        const eventDependences = await Promise.all(
          eventData.data.map(async (event) => {
            const participantData = await db.eventParticipant.find({
              eventoId: event._id,
            });
            delete event.usuarioId;

            return {
              ...event,
              participantes: participantData.data.map((part) => {
                delete part.eventoId;
                delete part.usuarioId;
                return part;
              }),
            };
          })
        );

        return {
          ...user,
          eventos: eventDependences,
        };
      })
    );

    return utils.httpHelper.ok(searchDependences);
  } catch (error) {
    return utils.httpHelper.badRequest(error);
  }
};

const update = async ({ queryStringParameters, body }) => {
  try {
    const params = queryStringParameters;
    const value = JSON.parse(body);
    const filter = { id: params?.codigo };
    const response = await db.user.update(filter, value);
    return utils.httpHelper.ok(response);
  } catch (error) {
    return utils.httpHelper.badRequest(error);
  }
};

const insert = async ({ body }) => {
  try {
    const value = JSON.parse(body);
    const response = await db.user.insert(value);
    return utils.httpHelper.ok(response);
  } catch (error) {
    return utils.httpHelper.badRequest(error);
  }
};

const remove = async ({ queryStringParameters }) => {
  try {
    const params = queryStringParameters;
    if (!params?.id) {
      return utils.httpHelper.notFound();
    }
    const response = await db.user.remove(params?.id);
    return utils.httpHelper.ok(response);
  } catch (error) {
    return utils.httpHelper.badRequest(error);
  }
};

const login = async ({ body }) => {
  try {
    const { email, senha } = JSON.parse(body) || {};
    if (!email || !senha) {
      return utils.httpHelper.notAuthorized();
    }

    const response = await db.user.login(email, senha);

    if (!response) {
      return utils.httpHelper.notAuthorized();
    }

    return utils.httpHelper.ok(response);
  } catch (error) {
    return utils.httpHelper.badRequest(error);
  }
};

module.exports = {
  find,
  insert,
  update,
  remove,
  login,
};
