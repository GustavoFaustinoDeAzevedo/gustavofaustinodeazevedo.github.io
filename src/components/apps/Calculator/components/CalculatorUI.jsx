const CalculatorUI = ({result, calculating, handleClick}) => {
  return (
    <div className="calculator">
      <input
        className="calculator-visor"
        disabled
        value={calculating}
        placeholder={result}
      />
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

export default CalculatorUI;
