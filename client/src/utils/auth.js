import decode from 'jwt-decode';

class AuthService {
  getUser() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return!!token &&!this.isTokenExpired(token);
}

isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
    } catch (err) {
      return false;
  }
}
//retrieve token from local storage
getToken() {
  return localStorage.getItem('token');
}
// saves token to local storage
login(idToken) {

  //clear user token and user session from local storage
  localStorage.setItem('token', idToken);
//reload page and reset state
  window.location.assign('/');
  }
}

export default new AuthService();