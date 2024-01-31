import { handleAdd } from './add.js';
import { handleSubtract } from './subtract.js';
import { handleMultiply } from './multiply.js';
import { handleDivide } from './divide.js';

function handleCalculate(): number {
  const operator = process.argv[3];
  const param1 = Number(process.argv[2]);
  const param2 = Number(process.argv[4]);
  let result: number = 0;
  if (operator === 'plus') {
    result = handleAdd(param1, param2);
  }
  if (operator === 'minus') {
    result = handleSubtract(param1, param2);
  }
  if (operator === 'times') {
    result = handleMultiply(param1, param2);
  }
  if (operator === 'over') {
    result = handleDivide(param1, param2);
  }
  return result;
}

console.log(handleCalculate());
