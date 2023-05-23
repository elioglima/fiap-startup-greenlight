const success = async (data, length) => {
  return {
    error: false,
    ...(!data
      ? {}
      : Array.isArray(data)
      ? { length: data.length, data: data }
      : { length: length || 1, data }),
  };
};

const notFound = async (message) => {
  return {
    error: false,
    length: 0,
    record: undefined,
    ...(message ? { message } : {}),
    message,
  };
};

const notAuthorized = async () => {
  return {
    error: false,
    length: 0,
    record: undefined,
    message: "Not authorized",
  };
};

const error = async (message) => {
  return {
    error: true,
    message: message,
  };
};

module.exports = {
  success,
  notFound,
  error,
  notAuthorized,
};
