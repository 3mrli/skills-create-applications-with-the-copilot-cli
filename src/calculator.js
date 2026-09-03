#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting:
 * addition (+), subtraction (-), multiplication (*), division (/),
 * modulo (%), exponentiation (^), and square root (sqrt).
 *
 * Usage:
 *   node src/calculator.js <number> <operator> [number]
 *
 * Examples:
 *   node src/calculator.js 7 + 8
 *   node src/calculator.js 9 / 3
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ^ 8
 *   node src/calculator.js sqrt 25
 */

const USAGE = 'Usage: node src/calculator.js <number> <operator> [number]';

// Returns the remainder of a divided by b.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot take modulo by zero.');
  }
  return a % b;
}

// Returns base raised to the exponent.
function power(base, exponent) {
  return base ** exponent;
}

// Returns the square root of n, rejecting negative numbers.
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot take the square root of a negative number.');
  }
  return Math.sqrt(n);
}

function calculate(left, operator, right) {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return left / right;
    case '%':
      return modulo(left, right);
    case '^':
      return power(left, right);
    default:
      throw new Error(
        `Unsupported operator "${operator}". Use +, -, *, /, %, or ^.`,
      );
  }
}

function main(args) {
  if (args.length < 2 || args.length > 3) {
    throw new Error(USAGE);
  }

  const [firstInput, operator, secondInput] = args;

  if (firstInput === 'sqrt' || operator === 'sqrt') {
    if (args.length !== 2) {
      throw new Error('Square root requires one numeric operand.');
    }
    const value = Number(firstInput === 'sqrt' ? operator : firstInput);
    if (!Number.isFinite(value)) {
      throw new Error('The operand must be a valid number.');
    }
    console.log(squareRoot(value));
    return;
  }

  if (args.length !== 3) {
    throw new Error(USAGE);
  }

  const left = Number(firstInput);
  const right = Number(secondInput);
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  console.log(calculate(left, operator, right));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(USAGE);
    process.exitCode = 1;
  }
}

module.exports = { calculate, main, modulo, power, squareRoot };
