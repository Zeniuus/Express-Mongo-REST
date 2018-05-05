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
    handleRouter(req, res) {
      res.end('list');
    },
  },
  CREATE: {
    method: 'post',
    url: resourceUrl,
    handleRouter(req, res) {
      res.end('create');
    },
  },
  RETRIEVE: {
    method: 'get',
    url: singleResourceUrl,
    handleRouter(req, res) {
      res.end('retrieve');
    },
  },
  UPDATE: {
    method: 'put',
    url: singleResourceUrl,
    handleRouter(req, res) {
      res.end('update');
    },
  },
  DELETE: {
    method: 'delete',
    url: singleResourceUrl,
    handleRouter(req, res) {
      res.end('delete');
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
    router[action.method](`${action.url(model)}`, action.handleRouter);
  });

  return router;
};
