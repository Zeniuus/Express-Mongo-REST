import expressMongoRest from '../..';

const PORT = process.env.PORT || 8000;

expressMongoRest.runserver(PORT);
