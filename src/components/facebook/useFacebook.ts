import { useState, useEffect } from 'react';

import { loadExternalScript } from '../../utils/functions';

import { useFacebookType, FBResponse } from './types';

export const useFacebook = ({ callback, fbAppId, onFailure }: useFacebookType) => {
  const [state, setState] = useState({ loaded: false, error: false });

  const onLoad = () => {
    setState({ loaded: true, error: false });
  };

  function loadFbLoginApi() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: fbAppId,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5', // use version 2.1
      });
    };
  }

  useEffect(() => {
    if (state.loaded) return undefined;
    loadFbLoginApi();
    loadExternalScript('facebook-client-script', `https://connect.facebook.net/en_US/sdk.js`, onLoad);
    return () => {
      document.getElementById('facebook-client-script')?.remove();
    };
  }, [state]);

  function responseApi(authResponse: any) {
    window.FB.api('/me', (me: FBResponse) => {
      Object.assign(me, authResponse);
      callback(me);
    });
  }

  function checkLoginState(response: { authResponse: any; status: string }) {
    if (response.authResponse) {
      responseApi(response.authResponse);
    } else {
      if (onFailure) {
        onFailure({ status: response.status });
      } else {
        callback({ status: response.status });
      }
    }
  }

  const fbLogin = () => {
    window.FB.getLoginStatus((response: { authResponse: any; status: string }) => {
      if (response.status === 'connected') {
        checkLoginState(response);
      } else {
        window.FB.login(checkLoginState, { scope: 'public_profile,email' });
      }
    });
  };

  return { fbLogin };
};
