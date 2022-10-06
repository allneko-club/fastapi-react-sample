import {axios} from 'lib/axios'

export const api = {
  async loginGetToken(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`/api/login/access-token`, params);
  },
  async getMe() {
    return axios.get(`/api/users/me`);
  },
  async updateMe(data) {
    return axios.put(`/api/users/me`, data);
  },
  async getUsers() {
    return axios.get(`/api/users/`);
  },
  async getUser(userId) {
    return axios.get(`/api/users/${userId}`);
  },
  async updateUser(userId, data) {
    return axios.put(`/api/users/${userId}`, data);
  },
  async createUser(data) {
    return axios.post(`/api/users/`, data);
  },
  async deleteUser(userId) {
    return axios.delete(`/api/users/${userId}`);
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
