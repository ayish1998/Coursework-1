// example.test.js
const isEven = require('../index.js');

describe('isEven', () => {
  test('returns true if number is even', () => {
    expect(isEven(2)).toBe(true);
  });

  test('returns false if number is odd', () => {
    expect(isEven(3)).toBe(false);
  });

  test('throws an error if number is negative', () => {
    expect(() => isEven(-1)).toThrow();
  });

  test('throws an error if number is not a number', () => {
    expect(() => isEven('1')).toThrow();
  });
});

// example.test.js
const { someAsyncFunction } = require('../yourAsyncModule');

describe('Async Test', () => {
  test('async test', async () => {
    const result = await someAsyncFunction();
    expect(result).toEqual(/* expected value */);
  });
});
