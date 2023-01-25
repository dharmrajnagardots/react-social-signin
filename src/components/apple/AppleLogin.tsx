import React, { useEffect } from 'react';

import { generateQueryString, parse } from '../../utils/functions';

import { AppleLoginProps, ParamsType } from './types';
import { useApple } from './useApple';

const AppleLogin = (props: AppleLoginProps) => {
  const {
    clientId,
    redirectURI,
    state = '',
    render,
    designProp = {
      locale: 'en_US',
    },
    responseMode = 'query',
    responseType = 'code',
    nonce,
    callback,
    scope,
    autoLoad = false,
    usePopup = false,
  } = props;

  const [loaded] = useApple(
    `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/${
      (props && props.designProp && props.designProp.locale) || 'en_US'
    }/appleid.auth.js`,
  );

  const onClick = async (e: any = null) => {
    if (e) {
      e.preventDefault();
    }
    if (!usePopup) {
      window.location.href = `https://appleid.apple.com/auth/authorize?${generateQueryString({
        response_type: responseType,
        response_mode: responseMode,
        client_id: clientId,
        redirect_uri: encodeURIComponent(redirectURI),
        state,
        nonce,
        scope: responseMode === 'query' ? '' : scope,
      })}`;
    } else {
      try {
        const data = await AppleID.auth.signIn();
        if (data) {
          callback(data);
        }
      } catch (err) {
        callback({ error: err });
      }
    }
  };

  useEffect(() => {
    if (!usePopup) {
      if (autoLoad) {
        onClick();
      }

      if (
        typeof callback === 'function' &&
        responseMode === 'query' &&
        responseType === 'code' &&
        window &&
        window.location
      ) {
        const params = parse(window.location.search) as ParamsType;

        if (params['code']) {
          callback({
            code: params['code'],
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (usePopup && loaded) {
      AppleID.auth.init({
        clientId,
        scope,
        redirectURI: redirectURI || `${location.protocol}//${location.host}${location.pathname}`,
        state,
        nonce,
        usePopup,
      });

      // Call on auto load.
      if (autoLoad) {
        onClick();
      }
    }
  }, [loaded, usePopup]);

  if (typeof render === 'function') {
    return render({ onClick });
  }

  return (
    <div id='appleid-signin' onClick={onClick}>
      <img src={`https://appleid.cdn-apple.com/appleid/button?${generateQueryString(designProp)}`} />
    </div>
  );
};

export default AppleLogin;
