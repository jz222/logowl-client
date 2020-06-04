import { getDate, getDateWithTime, getDateWithWeekday, getTime } from './date';
import expirationHandler from './expirationHandler';
import shortNumber from './shortNumber';
import computeEvolution from './evolution';
import request from './request';
import sleep from './sleep';

export default {
    expirationHandler,
    computeEvolution,
    shortNumber,
    request,
    getDate,
    getDateWithWeekday,
    getDateWithTime,
    getTime,
    sleep
};