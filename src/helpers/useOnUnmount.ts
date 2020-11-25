import { useEffect } from 'react';

export default (callback: () => void) => useEffect(() => callback, []); // eslint-disable-line react-hooks/exhaustive-deps
