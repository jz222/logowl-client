import expirationHandler from './expirationHandler';
import { getDate, getDateWithTime, getDateWithWeekday, getTime } from './date';
import computeEvolution from './evolution';
import request from './request';
import sleep from './sleep';

export default {
    expirationHandler,
    computeEvolution,
    request,
    getDate,
    getDateWithWeekday,
    getDateWithTime,
    getTime,
    sleep
};