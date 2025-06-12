import { useRef, useState } from 'react';
import { evaluate } from "mathjs";

const Calculator = () => {
  const [result, setResult] = useState(0);
  const resultPressed = useRef(true)

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

  const handleClick = (e) => {
    //console.log(e.target.innerHTML);
    const value = e.target.innerHTML;
    if (value !== '=' ) {
      setResult((prevResult) => prevResult === 0 ? value : prevResult + "" + value);
      resultPressed.current = false;
    }else {
      setResult((prevResult) => evaluate(prevResult));
      resultPressed.current = true;
    }
  };
  return (
    <div className="calculator">
      <input className="calculator-visor" disabled value={result} />
      <ul className="calculator-keys-container">
        <li className="calculator-key operation" onClick={handleClick}>
          a
        </li>
        <li className="calculator-key operation" onClick={handleClick}>
          b
        </li>
        <li className="calculator-key operation" onClick={handleClick}>
          c
        </li>
        <li className="calculator-key operation" onClick={handleClick}>
          /
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          7
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          8
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          9
        </li>
        <li className="calculator-key operation" onClick={handleClick}>
          *
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          4
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          5
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          6
        </li>
        <li className="calculator-key operation" onClick={handleClick}>
          -
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          1
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          2
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          3
        </li>
        <li className="calculator-key operation" onClick={handleClick}>
          +
        </li>
        <li
          className="calculator-key main-key double-cell"
          onClick={handleClick}
        >
          0
        </li>
        <li className="calculator-key main-key" onClick={handleClick}>
          .
        </li>
        <li className="calculator-key result" onClick={handleClick}>
          =
        </li>
      </ul>
    </div>
  );
};

export default Calculator;
