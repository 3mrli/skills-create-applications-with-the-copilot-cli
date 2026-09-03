const assert = require('node:assert/strict');
const test = require('node:test');

const {
  calculate,
  modulo,
  power,
  squareRoot,
} = require('../calculator.js');

test('adds two numbers', () => {
  assert.equal(calculate(2, '+', 3), 5);
});

test('subtracts two numbers', () => {
  assert.equal(calculate(10, '-', 4), 6);
});

test('multiplies two numbers', () => {
  assert.equal(calculate(45, '*', 2), 90);
});

test('divides two numbers', () => {
  assert.equal(calculate(20, '/', 5), 4);
});

test('calculates modulo', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(calculate(5, '%', 2), 1);
});

test('rejects modulo by zero', () => {
  assert.throws(() => modulo(5, 0), /Cannot take modulo by zero/);
});

test('calculates a power', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(calculate(2, '^', 3), 8);
});

test('calculates a square root', () => {
  assert.equal(squareRoot(16), 4);
});

test('calculates the square root of zero', () => {
  assert.equal(squareRoot(0), 0);
});

test('rejects the square root of a negative number', () => {
  assert.throws(
    () => squareRoot(-1),
    /Cannot take the square root of a negative number/,
  );
});

test('rejects division by zero', () => {
  assert.throws(() => calculate(20, '/', 0), /Cannot divide by zero/);
});

test('rejects unsupported operators', () => {
  assert.throws(
    () => calculate(2, '&', 3),
    /Unsupported operator "&"/,
  );
});
