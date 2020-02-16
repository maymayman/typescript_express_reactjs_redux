const LOG_FORMATS = [
  '[:date[iso]]',
  ':http-version',
  ':method',
  ':url',
  ':status',
  ':res[content-length] -',
  ':response-time ms'
];

export const LOG_FORMAT = LOG_FORMATS.join(' ');
