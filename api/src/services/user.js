const utils = require("../utils");
const db = require("../database");
const moment = require("moment");

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

const update = async ({ queryParams, body }) => {
  try {
    const params = queryParams;
    const value = body;
    const filter = { id: params?._id };

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

const createAuth = async ({ usuarioId }) => {
  try {
    const secretKey = await utils.dataController.encryptObject({
      usuarioId,
    });

    const token = await utils.dataController.encryptObject(
      {
        usuarioId,
        date: moment().add(10, "minute"),
      },
      secretKey
    );

    await update({
      queryParams: { _id: usuarioId },
      body: { token: token },
    });

    return {
      usuarioId,
      token,
      refreshKey: secretKey,
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const login = async ({ body }) => {
  try {
    const { email, senha } = JSON.parse(body) || {};
    if (!email || !senha) {
      return utils.httpHelper.notAuthorized();
    }

    const response = await db.user.login(email, senha);

    if (!response || !response.length) {
      return utils.httpHelper.notAuthorized();
    }

    const usuarioId = response.data?._id;
    const authentication = await createAuth({
      usuarioId,
    });

    if (!authentication) {
      return utils.httpHelper.notAuthorized();
    }

    return utils.httpHelper.ok({
      ...response,
      data: {
        ...response.data,
        token: authentication?.token,
        refreshKey: authentication?.refreshKey,
      },
    });
  } catch (error) {
    console.log(error);
    return utils.httpHelper.badRequest(error);
  }
};

const refresh = async ({ body }) => {
  try {
    if (!body) {
      return utils.httpHelper.notAuthorized();
    }

    const { refreshKey, token } = JSON.parse(body);

    if (!refreshKey || !token) {
      return utils.httpHelper.notAuthorized();
    }

    const decodeToken = await utils.dataController.decryptObject(
      token,
      refreshKey
    );

    const now = moment();

    if (now.isAfter(decodeToken.date)) {
      return utils.httpHelper.notAuthorized();
    }

    const response = await db.user.findOne({
      _id: decodeToken.usuarioId,
    });

    if (!response || !response.length) {
      return utils.httpHelper.notAuthorized();
    }

    const responseLogin = await db.user.login(
      response.data?.email,
      response.data?.senha
    );

    if (!responseLogin || !responseLogin.length || !responseLogin.data?.token) {
      await update({
        queryParams: { _id: decodeToken.usuarioId },
        body: { token: undefined },
      });
      return utils.httpHelper.notAuthorized();
    }

    const authentication = await createAuth({
      usuarioId: responseLogin.data?.usuarioId,
    });

    if (!authentication) {
      await update({
        queryParams: { _id: responseLogin.data?.usuarioId },
        body: { token: undefined },
      });
      return utils.httpHelper.notAuthorized();
    }

    return utils.httpHelper.ok({
      ...responseLogin,
      data: {
        ...responseLogin.data,
        token: authentication?.token,
        refreshKey: authentication?.refreshKey,
      },
    });
  } catch (error) {
    console.log(error);
    return utils.httpHelper.badRequest(error);
  }
};
module.exports = {
  find,
  insert,
  update,
  remove,
  login,
  refresh,
};
