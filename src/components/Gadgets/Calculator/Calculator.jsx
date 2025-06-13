import { useState } from 'react';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [result, setResult] = useState('0');

  const calculatorRegex = /(\d+(\.\d+)?|sin|cos|tan|log|sqrt|[-+()])/g;

  const closeParentheses = (value) => {
    const openedParentheses = (value.match(/\(/g) || []).length;
    let closedParentheses = (value.match(/\)/g) || []).length;

    while (openedParentheses > closedParentheses) {
      value += ')';
      closedParentheses++;
    }
    return value;
  };

  const handleClick = (e) => {
    const value =
      e.currentTarget.getAttribute('value') ||
      e.currentTarget.textContent.trim();
    switch (value) {
      case 'clear':
        setResult('0');
        break;
      case 'backspace':
        setResult((prevResult) => {
          const str = prevResult.toString();
          if (
            prevResult === 'Infinity' ||
            /(sin\(|cos\(|tan\(|log\(|sqrt\()$/.test(prevResult)
          ) {
            return (
              prevResult.replace(/(sin\(|cos\(|tan\(|log\(|sqrt\()$/, '') || '0'
            );
          } else {
            return str.length > 1 ? str.slice(0, -1) : '0';
          }
        });
        break;
      case '=':
        setResult((prevResult) => {
          try {
            const closeResultParentheses = closeParentheses(prevResult);
            const evalResult = evaluate(closeResultParentheses);
            return evalResult.toString();
          } catch (error) {
            return prevResult;
          }
        });
        break;
      default:
        setResult((prevResult) => {
          if (prevResult === 'Infinity') {
            return value;
          } else {
            return prevResult === '0' && calculatorRegex.test(value)
              ? value
              : prevResult + value;
          }
        });

        break;
    }
  };
  return (
    <div className="calculator">
      <input className="calculator-visor" disabled value={result} />
      <math className="calculator-keys-container">
        <ul className="calculator-keys-list">
          <li className="calculator-key operation" onClick={handleClick}>
            <mo>(</mo>
          </li>
          <li className="calculator-key operation" onClick={handleClick}>
            <mo>)</mo>
          </li>
          <li
            className="calculator-key operation"
            value={'clear'}
            onClick={handleClick}
          >
            C
          </li>
          <li
            className="calculator-key operation"
            value={'backspace'}
            onClick={handleClick}
          >
            ⌫
          </li>
          <li
            className="calculator-key operation"
            value={'sin('}
            onClick={handleClick}
          >
            <mi>sin</mi>
            <mo>(</mo>
            <mi>x</mi>
            <mo>)</mo>
          </li>
          <li
            className="calculator-key operation"
            value={'cos('}
            onClick={handleClick}
          >
            <mi>cos</mi>
            <mo>(</mo>
            <mi>x</mi>
            <mo>)</mo>
          </li>
          <li
            className="calculator-key operation"
            value={'tan('}
            onClick={handleClick}
          >
            <mi>tan</mi>
            <mo>(</mo>
            <mi>x</mi>
            <mo>)</mo>
          </li>
          <li
            className="calculator-key operation"
            value={'log('}
            onClick={handleClick}
          >
            <mi>log</mi>
            <mo>(</mo>
            <mi>x</mi>
            <mo>)</mo>
          </li>
          <li
            className="calculator-key operation"
            value={'^'}
            onClick={handleClick}
          >
            <msup>
              <mi>x</mi>
              <mi>y</mi>
            </msup>
          </li>
          <li
            className="calculator-key operation"
            value={'sqrt('}
            onClick={handleClick}
          >
            <msqrt>
              <mi>x</mi>
            </msqrt>
          </li>
          <li
            className="calculator-key operation"
            value={'!'}
            onClick={handleClick}
          >
            <mi>x</mi>
            <mo>!</mo>
          </li>
          <li className="calculator-key operation" onClick={handleClick}>
            <mo>%</mo>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>7</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>8</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>9</mn>
          </li>
          <li
            className="calculator-key operation"
            value={'/'}
            onClick={handleClick}
          >
            <mo>÷</mo>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>4</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>5</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>6</mn>
          </li>
          <li
            className="calculator-key operation"
            value={'*'}
            onClick={handleClick}
          >
            <mo>×</mo>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>1</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>2</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>3</mn>
          </li>
          <li
            className="calculator-key operation"
            value={'-'}
            onClick={handleClick}
          >
            <mo>−</mo>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mn>0</mn>
          </li>
          <li className="calculator-key main-key" onClick={handleClick}>
            <mo>.</mo>
          </li>
          <li className="calculator-key result" onClick={handleClick}>
            <mo>=</mo>
          </li>
          <li className="calculator-key operation" onClick={handleClick}>
            <mo>+</mo>
          </li>
        </ul>
      </math>
    </div>
  );
};

export default Calculator;
