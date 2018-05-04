import express from 'express';

/* eslint-disable-next-line import/prefer-default-export */
export const createApi = function createExpressRouter() {
  const router = express.Router();
  router.get('/', (req, res) => res.end('Hello, world!'));
  return router;
};
