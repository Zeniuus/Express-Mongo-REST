const mongoSchema = function convertToMongoSchema(schema) {
  return Object.keys(schema).reduce((_mongoSchema, field) => {
    return {
      ..._mongoSchema,
      [field]: schema[field].constructor,
    };
  }, {});
};

/* eslint-disable-next-line import/prefer-default-export */
export const createModel = function createMongoModel(name, schema) {
  const newModel = {
    name,
    schema,
    mongoSchema: mongoSchema(schema),
  };

  return newModel;
};
