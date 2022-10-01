// のfastapi-sample/frontend/src/api.jsと共通にしたい

import Axios from 'axios';
import {getLocalToken} from 'localStorage'

const apiUrl = 'http://localhost:8000';

// todo post時に withCredentials: true にする必要があるか？
export const axios = Axios.create({
  baseURL: apiUrl,
})

// todo interceptorsを使う方法もあるらしい https://www.miracleave.co.jp/contents/1654/react-jwt-axios-interceptors/
function authHeaders(token) {
  if(token){
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
  }
  const localToken = getLocalToken();
  if (localToken) {
    return {
      headers: {
        Authorization: `Bearer ${localToken}`
      }
    }
  } else {
      return {headers: {}};
  }
}

export const api = {
  async loginGetToken(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`/api/login/access-token`, params);
  },
  async getMe(token) {
    return axios.get(`/api/users/me`, authHeaders(token));
  },
  async updateMe(token, data) {
    return axios.put(`/api/users/me`, data, authHeaders(token));
  },
  async getUsers(token) {
    return axios.get(`/api/users/`, authHeaders(token));
  },
  async updateUser(token, userId, data) {
    return axios.put(`/api/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token, data) {
    return axios.post(`/api/users/`, data, authHeaders(token));
  },
  async deleteUser(token, userId) {
    return axios.delete(`/api/users/${userId}`, authHeaders(token));
  },
  async recoverPassword(email) {
    return axios.post(`/api/recover-password/${email}`);
  },
  async resetPassword(new_password, token) {
    return axios.post(`/api/reset-password/`, {
      new_password,
      token,
    });
  },
};
