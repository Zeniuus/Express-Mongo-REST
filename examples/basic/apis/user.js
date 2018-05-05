import { createApi, Actions } from '../../..';
import user from '../models/user';

export default createApi({
  mountPath: '/api',
  model: user,
  actions: [
    Actions.LIST,
    Actions.CREATE,
    Actions.RETRIEVE,
    Actions.UPDATE,
    Actions.DELETE,
  ],
});
