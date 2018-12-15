export const to = (promise, explicitError) => {
  return promise
    .then(value => [null, value])
    .catch(err => [{ ...err, ...explicitError }, null]);
} 