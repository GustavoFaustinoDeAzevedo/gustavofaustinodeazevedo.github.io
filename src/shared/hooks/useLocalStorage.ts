import React from 'react';

type StorageKeys = 'users' | string;

const useLocalStorage = <K extends StorageKeys, T>(key: K, initialValue: T) => {
  const [value, setValue] = React.useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
