import React, { useState, useEffect } from 'react';

import { loadExternalScript } from '../../utils/functions';

import { GoogleProps } from './types';

const GoogleLogin = (props: GoogleProps) => {
  const { callback, clientId, buttonTheme, promptEnable } = props;

  const [state, setState] = useState({ loaded: false, error: false });

  useEffect(() => {
    if (state.loaded) return undefined;
    const onLoad = () => {
      if (!window.google || state.loaded) return;
      setState({ loaded: true, error: false });

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleLoginBtn'),
        { ...buttonTheme }, // customization attributes
      );
      if (promptEnable) window.google.accounts.id.prompt(); // also display the One Tap dialog
    };

    loadExternalScript('google-client-script', 'https://accounts.google.com/gsi/client', onLoad);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById('google-client-script')?.remove();
    };
  }, [state]);

  return <div id='googleLoginBtn' />;
};

export default GoogleLogin;
