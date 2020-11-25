import { useEffect } from 'react';

export default function useOnMount(callback: () => void) {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
