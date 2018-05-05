import mongoose from 'mongoose';

const createMongoSchema = function convertToMongoSchema(schema) {
  return Object.keys(schema).reduce((mongoSchema, field) => {
    return {
      ...mongoSchema,
      [field]: schema[field].constructor,
    };
  }, {});
};

/* eslint-disable-next-line import/prefer-default-export */
export const createModel = function createMongoModel(name, schema) {
  const mongoSchema = new mongoose.Schema(createMongoSchema(schema));
  const mongoModel = mongoose.model(name, mongoSchema);
  const model = {
    name,
    schema,
    mongoModel,
  };

  return model;
};
