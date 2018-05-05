/* eslint-disable-next-line import/prefer-default-export */
export const createModel = function createMongoModel(name, schema) {
  const newModel = {
    name,
    schema,
  };

  return newModel;
};
