import React, {useEffect} from 'react';
import {createContext, useContext, useState} from 'react';
import {getLocalToken, removeLocalToken, saveLocalToken} from 'lib/storage'
import {api} from 'api/backend-api'

let AuthContext = createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [user, setUser] = useState()
  const [isSuperuser, setIsSuperuser] = useState(false)

  useEffect(() => {
    const loadUser = async () => {await getMe()};
    getLocalToken() && loadUser();
    }, []);

  let login = async (data) => {
    await loginGetToken(data.username, data.password);
    await getMe();
  }

  let logout = async () => {
    removeLocalToken();
    setUser(null);
    setIsSuperuser(false);
  }

  let loginGetToken = async (username, password) => {
    await api.loginGetToken(username, password)
      .then((res) => {
        saveLocalToken(res.data.access_token);
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          throw Error('username or password is invalid');
        }
      })
  }

  let getMe = async () => {
    await api.getMe()
      .then((res) => {
        setUser(res.data);
        setIsSuperuser(res.data.is_superuser)
      })
  }

  let updateMe = async (data) => {
    await api.updateMe(data)
      .then((res) => {
        setUser(res.data);
        setIsSuperuser(res.data.is_superuser)
      })
  }

  let value = {user, isSuperuser, login, logout, updateMe}

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}