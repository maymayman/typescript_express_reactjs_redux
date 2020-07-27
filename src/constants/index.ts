const MORGAN_LOG_FORMATS = [
  '[:date[iso]]',
  ':http-version',
  ':method',
  ':url',
  ':status',
  ':res[content-length] -',
  ':response-time ms'
];

export const MORGAN_LOG_FORMAT = MORGAN_LOG_FORMATS.join(' ');

export { ERROR_CODES, HTTP_ERRORS } from './errors';
export { QUERY_CONSTANT } from './query';
export { formatDate } from './util';
export { MOMENT_CONSTANT } from './moment';
