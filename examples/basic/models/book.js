import { createModel, field } from '../../..';
import user from './user';

export default createModel('book', {
  name: field.string({ length: 50, optional: false }),
  author: field.string({ length: 20, optional: false }),
  description: field.string(),
  isBorrowed: field.foreignKey({ to: user, optional: false }),
});
