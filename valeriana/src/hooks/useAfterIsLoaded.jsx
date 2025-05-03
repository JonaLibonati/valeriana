
import { useEffect, useRef } from 'react';


export const useAfterIsLoaded = (isLoadingState, callback) => {
    const wasLoading = useRef(false);
  
    useEffect(() => {
      // Run only when loading transitions from true -> false
      if (wasLoading.current && !isLoadingState) {
        callback();
      }
  
      // Update ref
      wasLoading.current = isLoadingState;
    }, [isLoadingState, callback]);
  };
