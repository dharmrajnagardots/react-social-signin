# React Social Signin

> A Google oAUth Sign-in / Log-in Component for React

## Install

```
npm install react-social-signin
```

## How to use GoogleLogin

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-social-signin';

function App() {
  const callback = (response) => {
    console.log(response);
  };

  return <GoogleLogin clientId={'CLIENT_ID'} callback={callback} />;
}

export default App;
```

## GoogleLogin Props

|    params    |  value   |                                         default value                                         |                                                                   description                                                                   |
| :----------: | :------: | :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |
|   clientId   |  string  |                                           REQUIRED                                            | You can create a clientID by creating a [new project on Google developers website.](https://developers.google.com/identity/sign-in/web/sign-in) |
|   callback   | function |                                           REQUIRED                                            |                                                 Return Google User Details in JWT decoded form                                                  |
| buttonTheme  |  object  | { theme: 'outline'; text: 'signin_with'; shape: 'rectangular'; size: 'large'; width: '40px' } |                                                               handle Button theme                                                               |
| promptEnable | boolean  |                                             false                                             |                                                           Google One tap popup enable                                                           |

## callback

callback returns a GoogleUser object which provides access
to all of the GoogleUser methods listed here: https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse .

You can also access the returned values via the following properties on the returned object.

| property name  |  value  |                   definition                   |
| :------------: | :-----: | :--------------------------------------------: |
|      sub       | number  |   The unique ID of the user's Google Account   |
|     email      | string  |            The user's email address            |
| email_verified | boolean | true, if Google has verified the email address |
|      name      | string  |                   User Name                    |
|    picture     | string  |                 Profile image                  |
|   given_name   | string  |                User First Name                 |
|  family_name   | string  |                 User Last Name                 |

## How to use FacebookLogin

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { FacebookLogin } from 'react-social-signin';

function App() {
  const callback = (res) => {
    console.log(res);
  };
  const onFailure = (res) => {
    console.log(res);
  };

  return <FacebookLogin fbAppId={'APP_ID'} onFailure={onFailure} callback={callback} />;
}

export default App;
```

## FacebookLogin button without styling

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { FacebookLogin } from 'react-social-sign';

function App() {
  const callback = (res) => {
    console.log(res);
  };
  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <FacebookLogin
      fbAppId={'APP_ID'}
      onFailure={onFailure}
      callback={callback}
      render={(renderProps) => <button onClick={renderProps.onClick}>This is my custom FB button</button>}
    />
  );
}

export default App;
```

## How to use LinkdinLogin

First, we create a button and provide required props:

```js
import React, { useState } from 'react';

import { LinkedIn } from 'react-social-signin';

function App() {
  const callback = (res) => {
    console.log(res);
  };
  const onFailure = (res) => {
    console.log(res);
  };
  return (
    <LinkedIn
      clientId={CLIENT_ID}
      redirectUri={`${window.location.origin}/linkedin`}
      onSuccess={(code) => {
        console.log(code);
      }}
      onError={(error) => {
        console.log(error);
      }}
    />
  );
}
export default App;
```

Then we point `redirect_url` to `LinkedInCallback`. You can use [react-router-dom](https://reactrouter.com/web) or [Next.js's file system routing](https://nextjs.org/docs/routing/introduction)

- `react-router-dom`:

```js
import React from 'react';
import { LinkedInCallback } from 'react-social-signin';

import { BrowserRouter, Route } from 'react-router-dom';

function Demo() {
  return (
    <BrowserRouter>
      <Route exact path='/linkedin' component={LinkedInCallback} />
    </BrowserRouter>
  );
}
```

- Next.js's file system routing:

```js
// pages/linkedin.js
import { LinkedInCallback } from 'react-social-signin';
export default function LinkedInPage() {
  return <LinkedInCallback />;
}
```

## How to use AppleLogin

```js
import React, { useState } from 'react';

import { AppleLogin } from 'react-social-signin';

function App() {
  return <AppleLogin clientId='com.react.apple.login' redirectURI='https://redirectUrl.com' />;
}
export default App;
```

## Login Props

|          params          |  value   | default value |                                                                                                     description                                                                                                     |
| :----------------------: | :------: | :-----------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|         clientId         |  string  |   REQUIRED    |                                                                               The developer’s client identifier, as provided by WWDR.                                                                               |
|          scope           |  string  |       -       |                                    The amount of user information requested from Apple. Valid values are name and email. You can request one, both(separated by space), or none.                                    |
|       redirectURI        |  string  |   REQUIRED    |                                                                                    The URI to which the authorization redirects.                                                                                    |
|       responseType       |  string  |     code      | The type of response requested. Valid values are code and id_token. You can request one or both(separated by space). When requesting an id_token response type, response_mode must be either fragment or form_post. |
|       responseMode       |  string  |     query     |                                   The type of response mode expected. Valid values are query, fragment, and form_post. If you requested any scopes, the value must be form_post.                                    |
|          state           |  string  |       -       |                                                                                          The current state of the request.                                                                                          |
|         autoLoad         | boolean  |     false     |                                                                                                          -                                                                                                          |
|          nonce           |  string  |       -       |                                               A String value used to associate a client session with an ID token. This value is also used to mitigate replay attacks.                                               |
|         usePopup         | boolean  |     false     |                                                                                 A Boolean that enables showing the flow in a popup.                                                                                 |
|    designProp.height     |  number  |      30       |                                                             The height of the button image. The minimum and maximum values are 30 and 64, respectively                                                              |
|     designProp.width     |  number  |      140      |                                                            The width of the button image. The minimum and maximum values are 130 and 375, respectively.                                                             |
|     designProp.color     |  string  |     black     |                                                          The background color for the button image. The possible values are white and black (the default).                                                          |
|    designProp.border     | boolean  |     false     |                                                                       A Boolean value that determines whether the button image has a border.                                                                        |
|     designProp.type      |  string  |    sign-in    |                                                           The type of button image returned. The possible values are sign-in (the default) and continue.                                                            |
| designProp.border_radius |  number  |      15       |                                                         The corner radius for the button image. The minimum and maximum values are 0 and 50, respectively.                                                          |
|     designProp.scale     |  number  |       1       |                                                              The scale of the button image. The minimum and maximum values are 1 and 6, respectively.                                                               |
|    designProp.locale     |  string  |     en_US     |                                                                                      The language used for text on the button.                                                                                      |
|          render          | function |       -       |                                                                            Render prop to use a custom element, use renderProps.onClick                                                                             |
|         callback         | function |       -       |                                                                                    callback only work with Response Mode query.                                                                                     |

## Apple response

### Upon authorization success, the server returns the following data object:

```
{
     "authorization": {
       "state": "[STATE]",
       "code": "[CODE]",
       "id_token": "[ID_TOKEN]"
     },
     "user": {
       "email": "[EMAIL]",
       "name": {
         "firstName": "[FIRST_NAME]",
         "lastName": "[LAST_NAME]"
       }
     }
}
```

### Note

- The user object will only be presented the first time the user authorizes the application.
- With usePopup: true, `designProp` won't work except `designProp.locale`.

### Upon failure, the server returns the following data object:

```
{
    "error": "[ERROR_CODE]"
}
```
