import { useRef } from 'react';

export const useCustomRef = initialValue => {
  const value = useRef(initialValue);

  return [
    value.current,
    newValue => {
      value.current = newValue;
    },
  ];
};
