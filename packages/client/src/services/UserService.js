import Axios from '../utils/http.config';

export class UserService {
  static login(credentials) {
    return Axios.post(`/users/login`, credentials)
      .then((response) => response.data);
  }

  static signup(payload) {
    return Axios.post(`/users/signup`, payload)
      .then((response) => response.data);
  }
}
