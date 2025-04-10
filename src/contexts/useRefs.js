/* @refresh reset */
import { useContext } from 'react';
import { RefsContext } from './RefsProvider';

export function useRefs() {
  return useContext(RefsContext);
}
