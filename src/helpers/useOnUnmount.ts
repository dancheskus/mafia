import { useEffect } from 'react';

export default function useOnUnmount(callback: () => void) {
  useEffect(() => callback, []); // eslint-disable-line react-hooks/exhaustive-deps
}
