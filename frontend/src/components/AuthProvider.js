import React, {useEffect} from 'react';
import {createContext, useContext, useState} from 'react';
import {getLocalToken, removeLocalToken, saveLocalToken} from 'localStorage'
import {api} from 'api/backend-api'

let AuthContext = createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [user, setUser] = useState()
  const [isSuperuser, setIsSuperuser] = useState(false)

  useEffect(() => {
    const initUser = async (token) => {await getMe(token)};
    const token = getLocalToken();
    if (token) {
      initUser(token);
    }
    }, []);

  let login = async (data) => {
    const token = await loginGetToken(data.username, data.password);
    await getMe(token);
  }

  let logout = async () => {
    removeLocalToken();
    setUser(null);
    setIsSuperuser(false);
  }

  let loginGetToken = async (username, password) => {
    let token = '';
    await api.loginGetToken(username, password)
      .then((res) => {
        token = res.data.access_token;
        saveLocalToken(token);
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          throw Error('username or password is invalid');
        }
      })
    return token;
  }

  let getMe = async (token) => {
    let data = {token: token};
    await api.getMe(token)
      .then((res) => {
        Object.assign(data, res.data);
        setUser(data);
        setIsSuperuser(data.is_superuser)
      })
  }

  let updateMe = async (token, data) => {
    // todo tokenも更新する必要があるか？
    await api.updateMe(token, data)
      .then((res) => {
        setUser(res.data);
        setIsSuperuser(res.data.is_superuser)
      })
  }

  let value = {user, isSuperuser, login, logout, updateMe}

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}