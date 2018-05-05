import expressMongoRest from '../..';

const PORT = process.env.PORT || 8000;

expressMongoRest.runserver({
  appName: 'basic-example',
  port: PORT
});
