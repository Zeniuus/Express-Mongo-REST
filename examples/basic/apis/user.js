import { createApi } from '../../..';
import user from '../models/user';

export default createApi('/api', user, ['list', 'create', 'retrieve', 'update', 'delete']);
