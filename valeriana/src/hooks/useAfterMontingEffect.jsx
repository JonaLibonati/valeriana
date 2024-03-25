import { useRef, useEffect } from 'react';

export const useAfterMontingEffect = (fn, inputs) => {
    const isMountingRef = useRef(false);

    useEffect(() => {
      isMountingRef.current = true;
    }, []);

    useEffect(() => {
      if (!isMountingRef.current) {
        return fn();
      } else {
        isMountingRef.current = false;
      }
    }, inputs);
};