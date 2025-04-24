/* @refresh reset */
import { useContext } from 'react';
import { RefsContext } from './RefsContext';

export default function useRefs() {
  return useContext(RefsContext);
}
