import { useRef } from 'react';

type ConditionalType<T> = T extends undefined ? T | undefined : T;

const useCustomRef = <T>(initialValue?: T): [ConditionalType<T>, (newValue: T) => void] => {
  const value = useRef(initialValue);

  return [
    value.current as ConditionalType<T>,
    (newValue: T) => {
      value.current = newValue;
    },
  ];
};

export default useCustomRef;
