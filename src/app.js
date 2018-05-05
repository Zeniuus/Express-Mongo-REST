import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const callingScriptDirectory = function callingScriptDirectory() {
  let _module = module;
  while (_module.parent) {
    _module = _module.parent;
  }

  const callingScriptfilename = _module.filename;
  const pathTokens = callingScriptfilename.split('/');
  return pathTokens.splice(0, pathTokens.length - 1).join('/');
};

const expressMongoRest = {
  runserver({ appName = 'express-mongo-rest', port = 8000 }) {
    const app = express();

    /* Middleware settings. */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /* Create a Mongod connection. */
    const db = mongoose.connection;
    db.once('open', () => {
      console.log('Connected to mongod server');
    });
    db.on('error', console.error);
    mongoose.connect(`mongodb://localhost/${appName.replace(' ', '-')}`);

    /* Register API routers from user's source code. */
    const currDir = callingScriptDirectory();
    const models = fs.readdirSync(path.join(currDir, 'models'));
    models.forEach((model) => {
      /* eslint-disable */
      const router = require(path.join(currDir, 'apis', model)).default;
      app.use(router.mountPath, router);
      /* eslint-enable */
    });

    /* Start listening to the given port. */
    app.listen(port, () => {
      console.log(`Server running at http://127.0.0.1:${port}/`);
    });
  },
};

export default expressMongoRest;
