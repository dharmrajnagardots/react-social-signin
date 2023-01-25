import React from 'react';

import { FBProps } from './types';
import styles from './style.module.css';
import { useFacebook } from './useFacebook';

const FacebookLogin = (props: FBProps) => {
  const { callback, fbAppId, onFailure, render } = props;

  const { fbLogin } = useFacebook({
    callback,
    fbAppId,
    onFailure,
  });

  if (typeof render === 'function') {
    return render({ onClick: fbLogin });
  }

  return (
    <>
      <button id='facebook-login-button' className={`${styles.loginBtn} ${styles.loginBtnFacebook}`} onClick={fbLogin}>
        <span>Sign in With Facebook</span>
      </button>
    </>
  );
};

export default FacebookLogin;
