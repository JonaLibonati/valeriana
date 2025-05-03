import { useRef, useEffect } from 'react';

export const useEffectAfterMonting = (triggers, callback) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
            callback()
      } else {
        didMount.current = true;
      }

    }, triggers);
};