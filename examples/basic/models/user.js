import { createModel, field } from '../../..';

export default createModel('user', {
  name: field.string({ length: 20, optional: false }),
  age: field.number({ optional: false, min: 1, max: 150 }),
});
