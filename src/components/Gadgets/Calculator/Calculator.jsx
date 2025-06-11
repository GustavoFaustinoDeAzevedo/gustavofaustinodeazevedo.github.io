import { useState } from 'react';

const Calculator = () => {
  const [result, setResult] = useState(0);

  const operations = {
    sum: (value) => {
      setResult((prevResult) => prevResult + value);
    },
    sub: (value) => {
      setResult((prevResult) => prevResult - value);
    },
    div: (value) => {
      if (value === 0) return 'ZeroDivision';
      setResult((prevResult) => prevResult / value);
    },
    mult: (value) => {
      setResult((prevResult) => prevResult * value);
    },
    pow: (valueA, valueB) => {
      setResult((prevResult) => (prevResult + valueA) ** valueB);
    },
    sqrt: (value) => {
      setResult((prevResult) => (prevResult + value) ** 0.5);
    },
  };
  return (
    <div className='calculator'>
      <input disabled />
    </ div>
  );
};

export default Calculator;
