import { useContext } from 'react';
import { RefsContext, RefsContextValue } from './RefsContext';

/**
 * Hook to access the refs context.
 * Returns createRef(id) and getRef(id) methods.
 */
export default function useRefs(): RefsContextValue {
  return useContext(RefsContext);
}
