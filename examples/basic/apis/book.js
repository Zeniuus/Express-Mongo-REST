import { createApi } from '../../..';
import book from '../models/book';

export default createApi({
  mountPath: '/api',
  model: book,
});
