import { useEffect } from 'react';

export default callback => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
