import express from 'express';

const resourceUrl = function getResourceUrl(model) {
  return `/${model.name}s`;
};

const singleResourceUrl = function getSingleResourceUrl(model) {
  return `/${model.name}s/:modelId`;
};

export const Actions = {
  LIST: {
    method: 'get',
    url: resourceUrl,
    handleRouter(model) {
      return async (req, res) => {
        const Model = model.mongoModel;

        let objects;
        try {
          objects = await Model.find({});
        } catch (err) {
          return res.status(500).end(err);
        }

        res.json(objects);
      };
    },
  },
  CREATE: {
    method: 'post',
    url: resourceUrl,
    handleRouter(model) {
      const defaultObj = function createDefaultObject(schema) {
        return Object.keys(schema).reduce((_defaultObj, field) => {
          if (schema[field].defaultValue) {
            return {
              ..._defaultObj,
              [field]: schema[field].defaultValue,
            };
          }
          return _defaultObj;
        }, {});
      };

      return async (req, res) => {
        const { schema, mongoModel: Model } = model;

        const newModel = new Model(defaultObj(schema));
        Object.assign(newModel, req.body);
        try {
          await newModel.save();
        } catch (err) {
          return res.status(500).end(err);
        }

        res.status(201).json(newModel);
      };
    },
  },
  RETRIEVE: {
    method: 'get',
    url: singleResourceUrl,
    handleRouter(model) {
      return async (req, res) => {
        const Model = model.mongoModel;

        let object;
        try {
          object = await Model.findOne({ _id: req.params.modelId });
        } catch (err) {
          return res.status(500).end(err);
        }

        res.json(object);
      };
    },
  },
  UPDATE: {
    method: 'put',
    url: singleResourceUrl,
    handleRouter(model) {
      return async (req, res) => {
        const Model = model.mongoModel;

        let object;
        try {
          object = await Model.findOne({ _id: req.params.modelId });
          Object.assign(object, req.body);
          await object.save();
        } catch (err) {
          return res.status(500).end(err);
        }

        res.json(object);
      };
    },
  },
  DELETE: {
    method: 'delete',
    url: singleResourceUrl,
    handleRouter(model) {
      return async (req, res) => {
        const Model = model.mongoModel;

        try {
          await Model.remove({ _id: req.params.modelId });
        } catch (err) {
          return res.status(500).end(err);
        }

        res.status(204).end();
      };
    },
  },
};

const DEFAULT_ACTIONS = [
  Actions.LIST,
  Actions.CREATE,
  Actions.RETRIEVE,
  Actions.UPDATE,
  Actions.DELETE,
];

/* eslint-disable-next-line import/prefer-default-export */
export const createApi = function createExpressRouter({
  mountPath = '/',
  model,
  actions = DEFAULT_ACTIONS,
}) {
  if (!model) throw new Error('Argument \'model\' should be given.');

  const router = express.Router();
  router.mountPath = mountPath;
  actions.forEach((action) => {
    router[action.method](`${action.url(model)}`, action.handleRouter(model));
  });

  return router;
};
