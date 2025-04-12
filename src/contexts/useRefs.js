/* @refresh reset */
import { useContext } from 'react';
import { RefsContext } from './RefsContext';

export function useRefs() {
  return useContext(RefsContext);
}
