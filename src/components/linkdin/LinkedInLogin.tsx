import React from 'react';

import linkedin from '../../../assets/linkedin.png';

import { LinkedInProps } from './types';
import { useLinkedIn } from './useLinkedIn';

const LinkedInLogin = (props: LinkedInProps) => {
  const { render, redirectUri, clientId, onSuccess, onError, state, scope, closePopupMessage } = props;

  const { linkedInLogin } = useLinkedIn({
    redirectUri,
    clientId,
    onSuccess,
    onError,
    state,
    scope,
    closePopupMessage,
  });
  if (typeof render === 'function') {
    return render({ onClick: linkedInLogin });
  }

  return (
    <img
      onClick={linkedInLogin}
      src={linkedin}
      alt='Sign in with Linked In'
      style={{ maxWidth: '180px', cursor: 'pointer' }}
    />
  );
};

export default LinkedInLogin;
