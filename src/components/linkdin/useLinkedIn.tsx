import { useCallback, useEffect, useRef } from 'react';

import { generateQueryString, getPopupPositionProperties, generateRandomString } from '../../utils/functions';

import { useLinkedInType } from './types';

export function useLinkedIn({
  redirectUri,
  clientId,
  onSuccess,
  onError,
  scope = 'r_emailaddress',
  state = '',
  closePopupMessage = 'User closed the popup',
}: useLinkedInType) {
  const popupRef = useRef<Window | null>(null);
  const popUpIntervalRef = useRef<number | null>(null);

  const receiveMessage = useCallback(
    (event: MessageEvent) => {
      const savedState = localStorage.getItem('linkedin_oauth2_state');
      if (event.origin === window.location.origin) {
        if (event.data.errorMessage && event.data.from === 'Linked In') {
          // Prevent CSRF attack by testing state
          if (event.data.state !== savedState) {
            popupRef.current && popupRef.current.close();
            return;
          }
          onError && onError(event.data);
          popupRef.current && popupRef.current.close();
        } else if (event.data.code && event.data.from === 'Linked In') {
          // Prevent CSRF attack by testing state
          if (event.data.state !== savedState) {
            console.error('State does not match');
            popupRef.current && popupRef.current.close();
            return;
          }
          onSuccess && onSuccess(event.data.code);
          popupRef.current && popupRef.current.close();
        }
      }
    },
    [onError, onSuccess],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('message', receiveMessage, false);

      if (popupRef.current) {
        popupRef.current.close();
        popupRef.current = null;
      }
      if (popUpIntervalRef.current) {
        window.clearInterval(popUpIntervalRef.current);
        popUpIntervalRef.current = null;
      }
    };
  }, [receiveMessage]);

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, [receiveMessage]);

  const getUrl = () => {
    const generatedState = state || generateRandomString();
    localStorage.setItem('linkedin_oauth2_state', generatedState);
    const linkedInAuthLink = `https://www.linkedin.com/oauth/v2/authorization?${generateQueryString({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: encodeURI(scope),
      state: generatedState,
    })}`;
    return linkedInAuthLink;
  };

  const linkedInLogin = () => {
    popupRef.current?.close();
    popupRef.current = window.open(getUrl(), '_blank', getPopupPositionProperties({ width: 600, height: 600 }));

    if (popUpIntervalRef.current) {
      window.clearInterval(popUpIntervalRef.current);
      popUpIntervalRef.current = null;
    }
    popUpIntervalRef.current = window.setInterval(() => {
      try {
        if (popupRef.current && popupRef.current.closed) {
          if (popUpIntervalRef.current) {
            window.clearInterval(popUpIntervalRef.current);
            popUpIntervalRef.current = null;
          }
          if (onError) {
            onError({
              error: 'user_closed_popup',
              errorMessage: closePopupMessage,
            });
          }
        }
      } catch (error) {
        console.error(error);
        if (popUpIntervalRef.current) {
          window.clearInterval(popUpIntervalRef.current);
          popUpIntervalRef.current = null;
        }
        popUpIntervalRef.current = null;
      }
    }, 1000);
  };

  return {
    linkedInLogin,
  };
}
