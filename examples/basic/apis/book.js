import { createApi } from '../../..';
import book from '../models/book';

export default createApi('/api', book, ['list', 'create', 'retrieve', 'update', 'delete']);
