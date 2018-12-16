export const to = (promise) => {
  return promise
    .then(value => [null, value])
    .catch(err => [err, null]);
} 