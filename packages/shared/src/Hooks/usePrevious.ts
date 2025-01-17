
import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current as T;
  }
export default usePrevious