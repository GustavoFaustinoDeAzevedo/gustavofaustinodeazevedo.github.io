import { useMemo } from 'react';

const useTaskbarProps = ({ language }) => {
  return useMemo(() => ({
    className: 'enable-context',
    language,
  }), [language]);
};

export default useTaskbarProps;
