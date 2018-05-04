import { createModel, field } from '../../..';
import user from './user';

export default createModel({
  name: field.stringField({ length: 50, optional: false }),
  author: field.stringField({ length: 20, optional: false }),
  description: field.stringField(),
  isBorrowed: field.foreignKeyField({ to: user, optional: false }),
});
