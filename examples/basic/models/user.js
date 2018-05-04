import { createModel, field } from '../../..';

export default createModel({
  name: field.stringField({ length: 20, optional: false }),
  age: field.numberField({ optional: false, min: 1, max: 150 }),

});
