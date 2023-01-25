import { useEffect, useState } from 'react';

import { loadExternalScript } from '../../utils/functions';

// Hook
export const useApple = (src: string) => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({ loaded: false, error: false });

  useEffect(() => {
    if (state.loaded) return undefined;
    // Script event listener callbacks for load and error
    const onLoad = () => {
      setState({ loaded: true, error: false });
    };

    loadExternalScript('apple-client-script', src, onLoad);

    return () => {
      document.getElementById('apple-client-script')?.remove();
    };
  }, [state]);

  return [state.loaded, state.error];
};
