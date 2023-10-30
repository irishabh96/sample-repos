import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Store from './index';
import { URLS } from '../constants';
import { getAuthTokenFromLocalStorage, setAuthTokenLocalStorage } from '../chrome/utils';

export const initialState = {
  authenticated: '',
  authToken: '',
  currentUser: {},
};

// Function - To return the store Data
export function useAppState() {
  const [{ auth }, SetStore] = Store.useStore();
  getAuthTokenFromLocalStorage((token) => {
    if (token) {
      // alert(token);
      if (process.env.NODE_ENV === 'development') {
        SetStore((state: any) => {
          state.auth.authToken = token;
        });
      } else {
        token = JSON.parse(token);
        SetStore((state: any) => {
          state.auth.authToken = token?.authToken;
        });
      }
    }
  });
  return auth;
}

export function useState() {
  const [app] = Store.useStore();

  return app;
}

export function useLocalStorageAuthToken(token: string): object {
  const [auth, SetStore] = Store.useStore();
  SetStore((state: any) => {
    state.auth.authToken = token;
  });
  return auth;
}

export function useAuthenticate() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [app, setStore] = Store.useStore();

  React.useEffect(() => {
    if (typeof app?.auth?.authToken === 'string' && app?.auth?.authToken.length > 0) {
      history.push('/home');
    }
  }, [app?.auth?.authToken, history]);

  const login = async (e: React.FormEvent, payload: Object) => {
    e.preventDefault();
    setLoading(true);

    const apiResponse = await fetch(URLS.register, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const { user, token } = await apiResponse.json();

    if (apiResponse.ok) {
      setStore((state: any) => {
        state.auth.currentUser = user;
        state.auth.authToken = token;

        setAuthTokenLocalStorage(token);
      });
    } else {
      setError(true);
    }

    setLoading(false);
  };
  return {
    login,
    loading,
    error,
  };
}

export function useProfile() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [app, setStore] = Store.useStore();

  const profile = async () => {
    setLoading(true);

    const apiResponse = await fetch(URLS.profile, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${app.auth.authToken}`,
      },
    });

    const data = await apiResponse.json();

    if (apiResponse.ok) {
      setStore((state: any) => {
        state.auth.currentUser = { email: data.email, name: data.name };
      });
    } else {
      setError(true);
    }

    setLoading(false);
  };
  return {
    state: app.auth,
    profile,
    loading,
    error,
  };
}
