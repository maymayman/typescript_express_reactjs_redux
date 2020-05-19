import * as _ from 'lodash';
import { QUERY_CONSTANT } from '../../constants';
const { WHRERE, LIMIT, OFFSET, SORT, SORT_BY, HEXADECIMAL } = QUERY_CONSTANT;

export const dataQuery = query => {
  const where =
    query.where && _.isString(query.where) ? JSON.parse(query.where) : WHRERE;
  const limit = query.limit ? parseInt(query.limit, HEXADECIMAL) : LIMIT;
  const offset = query.offset ? parseInt(query.offset, HEXADECIMAL) : OFFSET;
  const sortBy = query.sortBy || SORT_BY;
  const sort = query.sort || SORT;

  return { where, limit, offset, sortBy, sort };
};
