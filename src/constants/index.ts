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
