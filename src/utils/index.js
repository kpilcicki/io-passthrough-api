import STATUSES from './statusCode';

export const STATUS_CODES = STATUSES;

export const to = (promise) => {
  return promise
    .then(value => [null, value])
    .catch(err => [err, null]);
} 