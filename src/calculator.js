#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting the four basic operations:
 * addition (+), subtraction (-), multiplication (*), and division (/).
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node src/calculator.js 7 + 8
 *   node src/calculator.js 9 / 3
 */

const USAGE = 'Usage: node src/calculator.js <number> <operator> <number>';

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
    default:
      throw new Error(`Unsupported operator "${operator}". Use +, -, *, or /.`);
  }
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(USAGE);
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

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

module.exports = { calculate, main };
