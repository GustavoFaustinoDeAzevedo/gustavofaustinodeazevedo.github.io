import { useState, useCallback } from 'react';

export const useMathInput = (initial = '') => {
  const [finalResult, setFinalResult] = useState(initial);

  const isValidNextInput = useCallback((current, next) => {
    const testString = current + next;

    const validCharsRegex = /^([a-zA-Z]+|\d+(\.\d+)?|\.\d+|[-+*/^() ])*$/;
    if (!validCharsRegex.test(testString)) return false;

    //Evita operadores duplicados consecutivos
    if (/[-+*/^]{2,}/.test(testString)) return false;

    //Evita duas casas decimais consecutivas no mesmo número
    const numbers = testString.split(/[^0-9.]+/);
    if (numbers.some(num => (num.match(/\./g) || []).length > 1)) return false;

    //Verifica parênteses
    const open = (testString.match(/\(/g) || []).length;
    const close = (testString.match(/\)/g) || []).length;
    if (close > open) return false;

    return true;
  }, []);

  const handleChange = useCallback((e) => {
    const nextChar = e.nativeEvent?.data || '';
    const nextValue = e.target.value;
    const prevValue = nextValue.slice(0, -nextChar.length);

    if (isValidNextInput(prevValue, nextChar)) {
      setFinalResult(nextValue);
    }
  }, [isValidNextInput]);

  return {
    finalResult,
    setFinalResult,
    onChange: handleChange,
  };
}

export default useMathInput;