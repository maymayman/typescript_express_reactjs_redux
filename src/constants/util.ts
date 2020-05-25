import * as _ from 'lodash';
import * as moment from 'moment';
import { ParsedQs } from 'qs';
import { MOMENT_CONSTANT } from './moment';

const { FORMAT } = MOMENT_CONSTANT;

interface IformatDate {
  date?: string | string[] | ParsedQs | ParsedQs[];
  format?: string | string[] | ParsedQs | ParsedQs[];
}

export const formatDate = ({ date, format }: IformatDate): string => {
  const formatForm = format && _.isString(format) ? format : FORMAT;
  const momentDate = date && _.isString(date) ? moment(date) : moment();

  return momentDate.format(formatForm);
};
