import { useRef, useState } from 'react';
import { evaluate, number, string } from 'mathjs';
import CalculatorUI from './CalculatorUI';

const Calculator = () => {
  const [calculating, setCalculating] = useState('');
  const [result, setResult] = useState('0');
  const backspaceRegex = useRef(
    /(sin\(|cos\(|tan\(|log\(|sqrt\(|0[(!.%^+\-*/)])$/
  );
  const prefixSymbolsRegex = useRef(/[!.%^+\-*/]/g);

  const closeParentheses = (value) => {
    const openedParentheses = (value.match(/\(/g) || []).length;
    let closedParentheses = (value.match(/\)/g) || []).length;

    while (openedParentheses > closedParentheses) {
      value += ')';
      closedParentheses++;
    }
    return String(value);
  };

  const handleClick = (e) => {
    const value =
      e.currentTarget.getAttribute('value') ||
      e.currentTarget.textContent.trim();

    switch (value) {
      case 'clear':
        setCalculating('');
        setResult('0');
        break;
      case 'backspace':
        if (result !== '0') {
          setResult('0');
          setCalculating('');
          break;
        }
        setCalculating((prev) => {
          const str = String(prev);
          if (
            prev === 'Infinity' ||
            backspaceRegex.current.test(String(prev))
          ) {
            const backspace = String(prev.replace(backspaceRegex.current, ''));
            return backspace.length === 0 ? '' : backspace;
          } else {
            return str.length > 1 ? str.slice(0, -1) : '';
          }
        });
        break;
      case '=':
        if (!calculating) {
          setResult('0');
          return;
        }
        try {
          const evaluated = evaluate(closeParentheses(calculating));
          setCalculating(String(evaluated));
          setResult(String(evaluated));
        } catch (error) {
          setResult('0');
        }
        break;
      default:
        if (result !== '0') {
          if (isNaN(Number(value))) {
            setCalculating(result + String(value));
            setResult('0');
          } else {
            setCalculating(String(value));
            setResult('0');
          }
          break;
        }
        setCalculating((prev) => {
          if (value === '0' && (prev === '' || /^0+$/.test(prev))) {
            return '';
          } else if (prev === '' && prefixSymbolsRegex.current.test(value)) {
            console.log(prefixSymbolsRegex.current.test(value));
            return '0' + '' + value;
          } else {
            return String(prev) + String(value);
          }
        });
        break;
    }
  };
  return (
    <CalculatorUI
      handleClick={(e) => handleClick(e)}
      calculating={calculating}
      result={result}
    />
  );
};

export default Calculator;
