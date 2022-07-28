/* eslint-disable prefer-promise-reject-errors */
/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  // if (typeof isPositiveAnswer !== 'boolean') {
  //   return Promise.reject(new Error('Wrong parameter is passed! Ask her again.'));
  // }
  // if (isPositiveAnswer) {
  //   return Promise.resolve('Hooray!!! She said "Yes"!');
  // }
  // return Promise.resolve('Oh no, she said "No".');
  return new Promise((resolve, reject) => {
    if (typeof isPositiveAnswer !== 'boolean') {
      return reject(new Error('Wrong parameter is passed! Ask her again.'));
    }
    if (isPositiveAnswer) {
      return resolve('Hooray!!! She said "Yes"!');
    }
    return resolve('Oh no, she said "No".');
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return Promise.all(array);
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return Promise.race(array);
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
function chainPromises(array, action) {
  // eslint-disable-next-line func-names
  const promiseAll = function (promises) {
    let count = promises.length;
    const result = new Array(count).fill(false);
    return new Promise((resolve) => {
      const checkIfDone = () => {
        // eslint-disable-next-line no-plusplus
        if (--count === 0) resolve(result);
      };
      promises.forEach((promise, index) => {
        promise.then((x) => {
          result[index] = x;
        // eslint-disable-next-line no-console
        }).then(checkIfDone).catch(checkIfDone);
      });
    });
  };
  // eslint-disable-next-line arrow-body-style
  return promiseAll(array).then((values) => {
    return values.reduce((acc, nextVal) => {
      if (acc === null) { return nextVal; }
      // eslint-disable-next-line no-param-reassign
      acc = action(acc, nextVal);
      return acc;
    }, null);
  });
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
